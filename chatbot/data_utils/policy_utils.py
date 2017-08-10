# -*- coding: UTF-8 -*-
import re
from snownlp import SnowNLP
from pymongo import MongoClient

def connect_mongo():
    client = MongoClient()
    db = client.xiaochuang
    c_policy = db.zbg_policy

    print ">> connect mongo success."
    return c_policy

def re_nums(datas):
    pattern = re.compile(r'\d\d\d\d|\d\d\d|\d\d|\d')
    l_nums = []
    for data in datas:
        # import pdb; pdb.set_trace()
        match = pattern.findall(data)
        l_nums.append(match)

    print ">> match the data success."
    return l_nums

def replace_nums_add_b(datas, nums):
    l_datas = []
    for i, data in enumerate(datas):
        n_nums = [int(n) for n in set(nums[i])]
        n_nums.sort()
        # n_nums.reverse()
        for num in n_nums:
            data = data.replace(str(num), "<b>{}</b>".format(str(num)))

        data = data.replace("</b><b>", "")
        l_datas.append(data)

    return l_datas


def nlp_utils(datas):
    l_keywords = []
    l_summarys = []
    for data in datas:
        s = SnowNLP(data)
        kws = s.keywords(5)
        smys = s.summary(1)
        print smys[0].decode("utf-8")
        l_keywords.append(kws)
        l_summarys.append(smys)
    return l_keywords, l_summarys

if __name__ == '__main__':
    l_content = []
    c_policy = connect_mongo()
    cursor = c_policy.find()

    for document in cursor:
        l_content.append(document["content"])

    # nums = re_nums(l_content)
    # import pdb; pdb.set_trace()
    # datas = replace_nums_add_b(l_content, nums)
    # print datas[0]
    # for i, document in enumerate(cursor):
    #     document.update({"policy_source" : "省级"},{"$set" : {"content", datas[i]}})
    # print datas[0]
    # print nums

    _, l_summarys = nlp_utils(l_content)
    for i, document in enumerate(cursor):
        document.insert_one({"summary": l_summarys[i]})
