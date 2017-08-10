# encoding: utf-8

import glob
import pdb
import jieba
import codecs

from hyperparams import Hyperparams as hp


def padding(datas):
    vocab_f = codecs.open(hp.dataset_dir +  hp.vocab_s, "r", "utf-8")
    vocab_list = [line.strip() for line in vocab_f.readlines()]

    input_arr = []
    seq_len_arr = []
    for data in datas:
        seq = [str(vocab_list.index(tag)) if tag in vocab_list
              else str(vocab_list.index(u"<UNK>")) for tag in data]

        seq_len = len(seq)
        padding_len = hp.max_len - seq_len
        seq += [str(vocab_list.index(u"<PAD>"))]*padding_len
        input_arr.append(seq)
        seq_len_arr.append(seq_len)

    return input_arr, seq_len_arr


def load_test_data(txt):
    print txt
    datas = [txt.replace(u" ", "").replace(u"　", "")]

    input_arr, i_seq_len = padding(datas)

    vocab_f = codecs.open(hp.dataset_dir + hp.vocab_t, "r", "utf-8")
    vocab_list = [line.strip() for line in vocab_f.readlines()]

    print ">> read test data success!\n"
    return input_arr, i_seq_len, vocab_list


if __name__ == '__main__':
    load_test_data()
