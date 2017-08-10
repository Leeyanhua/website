const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ChatRecord = mongoose.model('chat_record');


//新增
router.post('/', function(req, res, next) {
  const { user_id, ip_address, receive, reply } = req.body;
  var chatRecord = new ChatRecord({
    user_id,                      // 用户ID
    ip_address,                   // 登陆IP
    receive,                      // 收到的消息
    reply,                        // 回复信息
    create_time: new Date(),      // 创建时间
  });
  chatRecord.save(function (err, data) {
    if (err) {
      console.log("Error:" + err);
    } else {
      res.json(data);
    }
  });
});

router.get('/', function(req, res, next) {
  let pageSize = 10;                                       //一页多少条
  let currentPage = 1;                                     //设置当前页默认第一页
  if (req.query.page) currentPage = Number(req.query.page)           // 第 N 页
  if (req.query.pageSize) pageSize = Number(req.query.pageSize)      // 每一页 N 条记录

  var sort = { 'create_time':-1 };                      //排序
  var skipnum = (currentPage - 1) * pageSize;           //跳过数

  ChatRecord.count({}).exec(function (err, count) {
    ChatRecord.find({}).skip(skipnum).limit(pageSize).sort(sort).exec(function (err, data) {
      if (err) return next(err);
      res.json({
        code: 0,
        data,
        count,
      });
    });
  });
});


module.exports = router;
