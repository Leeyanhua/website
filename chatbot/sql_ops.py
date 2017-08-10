# encoding: utf-8

from pymongo import MongoClient


def connect_mongo():
    client = MongoClient()
    db = client.xiaochuang

    c_fhq = db.incubator
    c_zc = db.policies
    c_chat = db.chat_records

    return c_fhq, c_zc, c_chat


def reply(txt_inputs):
    return txt_inputs


def query(**dict_arg):
    c_fhq, c_zc, c_chat = connect_mongo()
    print ">> dict_arg: %s" % str(dict_arg)

    documents = []
    try:
        if dict_arg["target"] == "space":
            dict_arg.pop("target")
            try:
                price = int(dict_arg["price"])
                for p in range(price - 50, price + 50):
                    dict_arg["price"] = str(p)

                    cursor = c_fhq.find(dict_arg)

                    for document in cursor:
                        document["_id"] = str(document["_id"])
                        documents.append(document)
            except:
                try:
                    area = int(dict_arg["area_str"])
                    for a in range(area - 100, area + 100):
                        dict_arg["area_str"] = str(a)

                        cursor = c_fhq.find(dict_arg)

                        for document in cursor:
                            document["_id"] = str(document["_id"])
                            documents.append(document)
                except:
                    cursor = c_fhq.find(dict_arg)

                    for document in cursor:
                        document["_id"] = str(document["_id"])
                        documents.append(document)

        elif dict_arg["target"] == "policy":
            dict_arg.pop("target")
            cursor = c_zc.find(dict_arg)

            for document in cursor:
                document["_id"] = str(document["_id"])
                documents.append(document)

    except:
        print "\n!! no target.\n"

        # dcit_last_arg = dict(eval(last_arg))
        # if dcit_last_arg["target"]:
        #     if dcit_last_arg["target"] == "space":
        #         new_dict = dict(dcit_last_arg, **dict_arg)
        #         cursor = c_fhq.find(new_dict)
        #
        #         for document in cursor:
        #             document["_id"] = str(document["_id"])
        #             documents.append(document)
        #
        #     elif last_arg["target"] == "policy":
        #         new_dict = dict(last_arg, **dict_arg)
        #         cursor = c_zc.find(new_dict)
        #
        #         for document in cursor:
        #             document["_id"] = str(document["_id"])
        #             documents.append(document)
        # else:
        #     print "\n!! the first inpurt no target. \n"

    return documents
