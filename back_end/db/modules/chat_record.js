const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ChatRecordSchema = new Schema({
    user_id: { type: String },                      // 用户ID
    ip_address: { type: String },                   // 登陆IP
    receive: { type: String },                      // 收到的消息
    reply: { type: String },                        // 回复信息
    create_time: { type: Date }                     // 创建时间
});

module.exports = ChatRecordSchema;
