# encoding: utf-8

import tensorflow as tf
import numpy as np
import argparse
import pdb
import os

from load_datas import load_test_data
from hyperparams import Hyperparams as hp
from en_decoder import nets


parser = argparse.ArgumentParser()

parser.add_argument("--layer", default=0, choices=["0", "2", "3"])
parser.add_argument("--atn_type", default="Bahdanau", choices=["Bahdanau", "Luong"])
parser.add_argument("--beamsearch", default=1, choices=["0", "1"])

a = parser.parse_args()


os.environ['CUDA_VISIBLE_DEVICES'] = ""


def init_graph():
    ## init placeholder
    # encoder_inputs: [batch_size, max_time_steps]
    encoder_inputs = tf.placeholder(dtype=tf.int32, shape=(None, None), name="encoder_inputs")

    # encoder_inputs_length: [batch_size]
    encoder_inputs_length = tf.placeholder(dtype=tf.int32, shape=(None,), name='encoder_inputs_length')

    pred = nets(encoder_inputs, encoder_inputs_length, a.layer, a.beamsearch, a.atn_type)

    sess = tf.Session()
    sess.run(tf.global_variables_initializer())
    saver = tf.train.Saver()
    last_ckpt = tf.train.latest_checkpoint(hp.log_dir)

    ## restore
    if last_ckpt:
        saver.restore(sess, last_ckpt)
        print ">> restore model from %s successful!" % last_ckpt

    return pred, sess, encoder_inputs, encoder_inputs_length


def inf_txt(txt_inputs, pred, sess, encoder_inputs, encoder_inputs_length):
    ## read data.
    input_lists, i_seq_len, v_list = load_test_data(txt_inputs)

    input_batch = input_lists*hp.batch_size
    i_len_batch = i_seq_len*hp.batch_size

    results = sess.run(pred, feed_dict={encoder_inputs: input_batch,
                                        encoder_inputs_length: i_len_batch})

    result_list = []
    output_list = []
    if int(a.beamsearch):
        for result in results:
            r_list = []
            for rel in result:
                r_list.append(rel[0])

            seq = " ".join([v_list[_r] for _r in r_list])
            clear_seq = seq.encode("utf-8").split(" </S>")[0].replace(" ", "")
            output_seq = ">> Output: (beamsearch) {}\n".format(clear_seq)
            print output_seq
            output_list.append(clear_seq)
    else:
        for result in results:
            seq = " ".join([v_list[r[0]] for r in result])

            clear_seq = seq.encode("utf-8").split(" </S>")[0].replace(" ", "")
            output_seq = ">> Output: {}\n".format(clear_seq)
            print output_seq
            output_list.append(clear_seq)

    return output_list


if __name__ == '__main__':
    pred, sess, encoder_inputs, encoder_inputs_length = init_graph()

    print inf_txt("hi", pred, sess, encoder_inputs, encoder_inputs_length)
