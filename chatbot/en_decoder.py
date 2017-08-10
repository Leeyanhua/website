import math
import tensorflow as tf
from hyperparams import Hyperparams as hp

import tensorflow.contrib.seq2seq as seq2seq

from tensorflow.python.ops import array_ops
from tensorflow.python.ops import control_flow_ops
from tensorflow.python.framework import constant_op
from tensorflow.python.layers.core import Dense
from tensorflow.python.util import nest

from tensorflow.contrib.seq2seq.python.ops import attention_wrapper
from tensorflow.contrib.seq2seq.python.ops import beam_search_decoder

def get_lstm_cell():
    enc_cell = tf.nn.rnn_cell.BasicLSTMCell(hp.hidden_units)
    enc_cell = tf.nn.rnn_cell.DropoutWrapper(enc_cell, output_keep_prob=hp.keep_prob)
    return enc_cell


def encoder(enc_input, i_seq_len):
    print("building encoder..")

    with tf.variable_scope('encoder'):
        sqrt3 = math.sqrt(3)  # Uniform(-sqrt(3), sqrt(3)) has variance=1.
        initializer = tf.random_uniform_initializer(-sqrt3, sqrt3, dtype=tf.float32)

        encoder_embeddings = tf.get_variable(name='embedding',shape=[hp.en_vocab_nums, hp.embedding_size],
                                            initializer=initializer, dtype=tf.float32)

        # Embedded_inputs: [batch_size, time_step, embedding_size]
        encoder_inputs_embedded = tf.nn.embedding_lookup(params=encoder_embeddings, ids=enc_input)

        # Input projection layer to feed embedded inputs to the cell
        # ** Essential when use_residual=True to match input/output dims
        input_layer = Dense(hp.hidden_units, dtype=tf.float32, name='input_projection')

        # Embedded inputs having gone through input projection layer
        encoder_inputs_embedded = input_layer(encoder_inputs_embedded)


        with tf.variable_scope('lstm_encode'):
            enc_cell = tf.nn.rnn_cell.MultiRNNCell([get_lstm_cell() for i in range(hp.multi_layer_nums)])
            enc_outputs, enc_states = tf.nn.dynamic_rnn(cell=enc_cell, inputs=encoder_inputs_embedded, sequence_length=i_seq_len,\
                                                        dtype=tf.float32, time_major=False)

        return enc_outputs, enc_states


def decoder(enc_outputs, enc_states, i_seq_len, layer, atn_type, is_beamsearch):
    layer_num = int(layer)

    # To use BeamSearchDecoder, encoder_outputs, encoder_last_state, encoder_inputs_length
    # needs to be tiled so that: [batch_size, .., ..] -> [batch_size x beam_width, .., ..]
    if is_beamsearch:
        print ("use beamsearch decoding..")
        enc_outputs = seq2seq.tile_batch(enc_outputs, multiplier=hp.beam_width)
        enc_states = nest.map_structure(lambda s: seq2seq.tile_batch(s, hp.beam_width), enc_states)
        i_seq_len = seq2seq.tile_batch(i_seq_len, multiplier=hp.beam_width)

    if atn_type == "Bahdanau":
        atn_mechanism = attention_wrapper.BahdanauAttention(num_units=hp.hidden_units, \
        memory=enc_outputs, memory_sequence_length=i_seq_len)
    elif atn_type == "Luong":
        print "!! atn type is luong !!"
        atn_mechanism = attention_wrapper.LuongAttention(num_units=hp.hidden_units, \
        memory=enc_outputs, memory_sequence_length=i_seq_len)

    dec_cell_list = [get_lstm_cell() for i in range(hp.multi_layer_nums)]
    dec_init_state = enc_states


    def attn_decoder_input_fn(inputs, attention):
        return inputs

    if not is_beamsearch:
        batch_size = hp.batch_size
    else:
        batch_size = hp.batch_size * hp.beam_width

    init_state = [state for state in enc_states]

    if not layer_num/3:
        dec_cell_list[layer_num] = attention_wrapper.AttentionWrapper(
                            cell=dec_cell_list[layer_num],
                            attention_mechanism=atn_mechanism,
                            attention_layer_size=hp.hidden_units,
                            cell_input_fn=attn_decoder_input_fn,
                            initial_cell_state=enc_states[layer_num],
                            alignment_history=False,
                            name='Attention_Wrapper')

        init_state[layer_num] = dec_cell_list[layer_num].zero_state(batch_size=batch_size, dtype=tf.float32)
    else:
        print ">> all layer is attention."
        for i in range(layer_num):
            dec_cell_list[i] = attention_wrapper.AttentionWrapper(
                                cell=dec_cell_list[i],
                                attention_mechanism=atn_mechanism,
                                attention_layer_size=hp.hidden_units,
                                cell_input_fn=attn_decoder_input_fn,
                                initial_cell_state=enc_states[i],
                                alignment_history=False,
                                name='Attention_Wrapper')

            init_state[i] = dec_cell_list[i].zero_state(batch_size=batch_size, dtype=tf.float32)

    dec_init_state = tuple(init_state)

    dec_cell = tf.nn.rnn_cell.MultiRNNCell(dec_cell_list)

    print("building decoder and attention..")
    with tf.variable_scope('decoder'):
        # Initialize decoder embeddings to have variance=1.
        sqrt3 = math.sqrt(3)  # Uniform(-sqrt(3), sqrt(3)) has variance=1.
        initializer = tf.random_uniform_initializer(-sqrt3, sqrt3, dtype=tf.float32)

        decoder_embeddings = tf.get_variable(name='embedding',shape=[hp.de_vocab_nums, hp.embedding_size], \
                                            initializer=initializer, dtype=tf.float32)

        # Input projection layer to feed embedded inputs to the cell
        # ** Essential when use_residual=True to match input/output dims
        input_layer = Dense(hp.hidden_units, dtype=tf.float32, name='input_projection')

        # Output projection layer to convert cell_outputs to logits
        output_layer = Dense(hp.de_vocab_nums, name='output_projection')

        return input_layer, output_layer, decoder_embeddings, dec_cell, dec_init_state


def nets(enc_input, i_seq_len, layer_num, is_beamsearch, atn_type):
    ## encoder
    enc_outputs, enc_states = encoder(enc_input, i_seq_len)

    ## decoder
    input_layer, output_layer, decoder_embeddings, dec_cell, dec_state = \
    decoder(enc_outputs, enc_states, i_seq_len, layer_num, atn_type, is_beamsearch)


    ## decoder build inference
    start_tokens = tf.constant([1,] * hp.batch_size)
    end_token = tf.constant(3)
    def embed_and_input_proj(inputs):
        return input_layer(tf.nn.embedding_lookup(decoder_embeddings, inputs))

    if not is_beamsearch:
        # Helper to feed inputs for greedy decoding: uses the argmax of the output
        decoding_helper = seq2seq.GreedyEmbeddingHelper(start_tokens=start_tokens,
                                                        end_token=end_token,
                                                        embedding=embed_and_input_proj)

        # Basic decoder performs greedy decoding at each time step
        print("building greedy decoder..")
        inference_decoder = seq2seq.BasicDecoder(cell=dec_cell,
                                                 helper=decoding_helper,
                                                 initial_state=dec_state,
                                                 output_layer=output_layer)
    else:
        # Beamsearch is used to approximately find the most likely translation
        print("building beamsearch decoder..")
        inference_decoder = beam_search_decoder.BeamSearchDecoder(cell=dec_cell,
                                                   embedding=embed_and_input_proj,
                                                   start_tokens=start_tokens,
                                                   end_token=end_token,
                                                   initial_state=dec_state,
                                                   beam_width=hp.beam_width,
                                                   output_layer=output_layer)

    # For GreedyDecoder, return
    # decoder_outputs_decode: BasicDecoderOutput instance
    #                         namedtuple(rnn_outputs, sample_id)
    # decoder_outputs_decode.rnn_output: [batch_size, max_time_step, num_decoder_symbols] 	if output_time_major=False
    #                                    [max_time_step, batch_size, num_decoder_symbols] 	if output_time_major=True
    # decoder_outputs_decode.sample_id: [batch_size, max_time_step], tf.int32		if output_time_major=False
    #                                   [max_time_step, batch_size], tf.int32               if output_time_major=True
    (decoder_outputs_decode, decoder_last_state_decode,
     decoder_outputs_length_decode) = (seq2seq.dynamic_decode(
        decoder=inference_decoder,
        output_time_major=False,
        # impute_finished=True,	# error occurs
        maximum_iterations=500))

    if not is_beamsearch:
        # decoder_outputs_decode.sample_id: [batch_size, max_time_step]
        # Or use argmax to find decoder symbols to emit:
        # decoder_pred_decode = tf.argmax(decoder_outputs_decode.rnn_output,
        #                                      axis=-1, name='decoder_pred_decode')

        # Here, we use expand_dims to be compatible with the result of the beamsearch decoder
        # decoder_pred_decode: [batch_size, max_time_step, 1] (output_major=False)
        decoder_pred_decode = tf.expand_dims(decoder_outputs_decode.sample_id, -1)
    else:
        decoder_pred_decode = decoder_outputs_decode.predicted_ids

    return decoder_pred_decode
