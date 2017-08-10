const express = require('express');
const router = express.Router();
// var User = require("./../db/modules/Users.js");
const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const Policy = mongoose.model('Policy');
const Incubator = mongoose.model('Incubator');
const Apply_policy = mongoose.model('Apply_policy');
const Apply_space = mongoose.model('Apply_space');
const sendSms = require('../scripts/msm');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   var wherestr = {};
//   console.log(wherestr);
//   User.find(wherestr, function(err, data){
//     if (err) {
//       console.log("Error:" + err);
//     } else {
//       res.send(data);
//     }
//   });
// });

/* 登陆后的 个人信息. */
router.get('/self', function(req, res, next) {
  if (!req.user) return res.json({ code: 1, msg: '未登录' });
  res.json({
    code: 0,
    user: req.user
  });
});

/* 登陆后 退出登录. */
router.get('/logout', function(req, res, next) {
  if (!req.user) return res.json({ code: 1, msg: '未登录' })
  req.logout();
  res.json({
    code: 0,
    msg: '退出登录成功'
  });
});


//删除
router.delete('/', function(req, res, next) {
  var wherestr = {'name' : req.query.name};
  User.remove(wherestr, function(err, data){
    if (err) {
      console.log("Error:" + err);
    } else {
      res.send(data);
    }
  });
});

//新增注册
router.post('/signup-phone', function(req, res, next) {
  passport.authenticate('local-phone-signup', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.json(info);
    req.logIn(user, null, (err2) => {
      if (err2) { return next(err); }
      return res.json({
        code: 0,
      });
    });
  })(req, res, next);
});

// 获取手机 验证码
router.post('/get-phone-code', function(req, res, next) {
  // console.log('req.body', req.body);
  const { phone } = req.body;
  User.findOne({ phone }, (err, result) => {
    // 生成随机码
    const auth_code = Math
      .random()
      .toString(10) // 10 进制
      .slice(3)     // 取第3位以后的
      .substr(1, 6) // 6位长度
      // .toUpperCase(); // 字母转为大写
      console.log('auth_code', auth_code);
    // 如果已注册用户
    if (result && result.hashed_password) {
      return res.json({ code: 1, msg: '该手机号已注册账号' });
    } else if (result) {
      // 未注册成功过， 但发送过验证码

      // TODO 发送短信 √
      sendSms(phone, auth_code)
      User.findByIdAndUpdate({ _id: result._id }, { auth_code, auth_code_create: new Date() }, function(err, result) {
        if (err) return next(err);
        res.json({
          code: 0,
          msg: '短信发送成功'
        });
      });
    } else {
      var user = new User({
        phone,
        auth_code,
        auth_code_create: new Date(),
      });

      // TODO 发送短信 √
      sendSms(phone, auth_code)
      user.save((err, data) => {
        if (err) return next(err);
        res.json({
          code: 0,
          msg: '短信发送成功'
        });
      });
    }
  });
});

// 手机登录
router.post('/login-phone', function (req,res, next) {
  passport.authenticate('local-phone-login', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.json(info);
    req.logIn(user, null, (err2) => {
      if (err2) { return next(err2); }
      return res.json({
        code: 0,
        msg: '登陆成功'
      });
    });
  })(req, res, next);
});

//我的收藏------获取收藏中的政策列表
router.get('/policy', function (req, res, next ) {
  User.findOne({ _id: req.user._id }, { policy_collect: 1}, function(err, result) {
    if (err) return next(err);
    // console.log('result.policy_collect', result.policy_collect);
    const policy_id_list = result.policy_collect.map((id) =>  mongoose.Types.ObjectId(id) );
    // console.log(policy_id_list);
    Policy.find({ _id: { "$in": policy_id_list } }, function (err2, result2) {
      if (err2) return next(err2);
      res.json({
        code: 0,
        result2: result2,
      });
    });
  });
});

//我的收藏------获取空间中的列表
router.get('/space', function (req, res, next ) {
  User.findOne({ _id: req.user._id }, { space_collect: 1 }, function(err, result) {
    if (err) return next(err);
    var space_id_list = result.space_collect.map((id) =>  mongoose.Types.ObjectId(id) );
    Incubator.find({ _id: { "$in": space_id_list } }, function (err2, result2) {
      if (err2) return next(err2);
      res.json({
        code: 0,
        result2: result2,
      });
    });
  });
});

//我的服务-----获取服务中政策申请列表
// router.get('/apply_policy', function (req, res, next ) {
//   User.findOne({ _id: req.user._id }, { policy_server: 1}, function(err, result) {
//     if (err) return next(err);
//
//     const apply_policy_id_list = result.policy_server.map((id) =>  mongoose.Types.ObjectId(id) );
//
//     Apply_policy.find({ _id: { "$in": apply_policy_id_list } }, function (err2, result2) {
//       if (err2) return next(err2);
//       res.json({
//         code: 0,
//         result2: result2,
//       });
//     });
//   });
// });

//我的服务-----获取服务中政策申请列表
router.get('/apply_policy', function (req, res, next ) {
  Apply_policy.find({ phone: req.user.phone }, function (err, result) {
    if (err) return next(err);
    res.json({
      code: 0,
      result: result,
    });
  });
});

//我的服务-----获取服务中的空间申请列表
router.get('/apply_space', function (req, res, next ) {
  Apply_space.find({ phone: req.user.phone }, function (err, result) {
    if (err) return next(err);
    res.json({
      code: 0,
      result: result,
    });
  });
});

//更新 自己的信息
router.put('/self', function(req, res, next) {
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, req.body, function(err, data){
    if (err) {
      console.log("Error:" + err);
      res.json({
        code: 1,
        err
      });
    } else {
      res.json({
        code: 0,
        data
      });
    }
  });
});
//更新 自己的密码
router.put('/password', function(req, res, next) {
  const { _id } = req.user;
  User.findById(_id, function(err, data) {
    if (err) {
      console.log("Error:" + err);
      res.json({
        code: 1,
        err
      });
    } else if (data.hashed_password === req.body.originPassword) {
      User.findByIdAndUpdate(_id, { hashed_password: req.body.password }, function(err, data){
        if(err) console.log("Error:" + err);;
        res.json({
          code: 0,
        });
      });
    } else {
      res.json({ code: 2, msg: '初始密码不正确' });
    }
  });
});

//更新密码
// router.put('/password', function(req, res, next) {
//   var id = req.user.id;
//   var updatestr = { hashed_password: req.body.password };
//   console.log(updatestr);
//   User.findByIdAndUpdate(id, updatestr, function(err, data){
//     if (err) {
//       console.log("Error:" + err);
//       res.json(err);
//     } else {
//       res.json({ code: 0 });
//     }
//   });
// });

//我的服务-----添加空间服务申请
router.put('/apply_space/:apply_space_id', function (req, res, next ) {
  const { apply_space_id } = req.params;
  const updatestr = { "$addToSet" : { "space_server": apply_space_id }}
  User.findByIdAndUpdate({ _id: req.user._id }, updatestr, function(err, result) {
    if (err) return next(err);
    res.json({
      code: 0,
    });
  });
});

//我的服务-----添加政策服务申请
router.put('/apply_policy/:apply_policy_id', function (req, res, next ) {
  const { apply_policy_id } = req.params;
  const updatestr = { "$addToSet" : { "policy_server": apply_policy_id }}
  User.findByIdAndUpdate({ _id: req.user._id }, updatestr, function(err, result) {
    if (err) return next(err);
    res.json({
      code: 0,
    });
  });
});

//我的收藏------添加空间收藏
router.put('/space/:space_id', function (req, res, next ) {
  const { space_id } = req.params;
  const updatestr = { "$addToSet" : { "space_collect": space_id }}
  User.findByIdAndUpdate({ _id: req.user._id }, updatestr, function(err, result) {
    if (err) return next(err);
    res.json({
      code: 0,
    });
  });
});

// 我的收藏------删除空间收藏
router.delete('/space/:space_id', function (req, res, next ) {
  const { space_id } = req.params;
  const updatestr = { "$pull" : { "space_collect": space_id }}
  User.findByIdAndUpdate({ _id: req.user._id }, updatestr, function(err, result) {
    if (err) return next(err);
    res.json({
      code: 0,
    });
  });
});

//我的收藏------添加政策收藏
router.put('/policy/:policy_id', function (req, res, next ) {
  const { policy_id } = req.params;
  const updatestr = { "$addToSet" : { "policy_collect": policy_id }}
  User.findByIdAndUpdate({ _id: req.user._id }, updatestr, function(err, result) {
    if (err) return next(err);
    res.json({
      code: 0,
    });
  });
});

// 我的收藏------删除政策收藏
router.delete('/policy/:policy_id', function (req, res, next ) {
  const { policy_id } = req.params;
  const updatestr = { "$pull" : { "policy_collect": policy_id }}
  User.findByIdAndUpdate({ _id: req.user._id }, updatestr, function(err, result) {
    if (err) return next(err);
    res.json({
      code: 0,
    });
  });
});
module.exports = router;
