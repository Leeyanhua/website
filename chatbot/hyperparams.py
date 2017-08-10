# encoding: utf-8

class Hyperparams:

    dataset_dir = "./dataset/"
    vocab_s = "sources_vocab.txt"
    vocab_t = "targets_vocab.txt"

    log_dir = "./model/"

    max_len = 50

    batch_size = 4
    num_epochs = 100
    hidden_units = 256
    keep_prob = 0.2

    multi_layer_nums = 2

    en_vocab_nums = 3614
    de_vocab_nums = 155
    embedding_size = 32

    beam_width = 5
