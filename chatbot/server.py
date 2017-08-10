#encoding: utf-8
from inference import init_graph, inf_txt
from sql_ops import *
from pymongo import MongoClient
from flask import Flask, render_template, session, request
from flask_socketio import SocketIO, emit
import time

app = Flask(__name__, template_folder='./')
app.config['SECRET_KEY'] = 'secret!'

socketio = SocketIO(app)

pred, sess, encoder_inputs, encoder_inputs_length = init_graph()

client = MongoClient()
db = client.xiaochuang
c_chat = db.chat_records

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('client_event')
def client_msg(msg):
    ip_address = request.remote_addr
    print u">> ip: %s" % ip_address

    output_txt_list = inf_txt(msg['data'], pred, sess, encoder_inputs, encoder_inputs_length)
    for output_txt in output_txt_list:

        # try:
        #     target_name = output_txt.split('target="')[1].split('"')[0]
        #     print target_name
        # except:
        #     last_sql_ops = c_chat.find({"user_id": msg['user_id']},{"sql_ops":1}).sort({"create_time":-1}).limit(1)
        #     import pdb; pdb.set_trace()

        try:
            print output_txt
            reply = eval(output_txt)
            print reply
            break
        except Exception as err:
            print(err)
            reply = u"推断错误"

    if not reply:
        reply = u"对不起，没有找到相关信息"

    c_chat.insert_one({
        "receive": msg['data'],
        "reply": reply,
        "sql_ops": output_txt,
        "create_time": time.ctime(),
        "user_id": msg['user_id'],
        "ip_address": ip_address
    })

    emit('server_response', {'data': reply})

if __name__ == '__main__':
    socketio.run(app, debug=True, host="0.0.0.0", port=8888)
