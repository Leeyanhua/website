const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Apply_policy = mongoose.model('Apply_policy');
const User = mongoose.model('User');

//查询
router.get('/', function(req, res, next) {
  var wherestr = {};

  Apply_policy.count(wherestr, function (err, count) {
    Apply_policy.find(wherestr, function (err, data) {
      if (err) {
          console.log("Error:" + err);
      }
      else {
          // console.log("Res:" + data);
        res.json({
          code: 0,
          count,
          data,
        })
      }
    })
  })
})

//新增
router.post('/', function(req, res, next) {
  var apply_policy = new Apply_policy({
      phone : req.body.phone,
      email : req.body.email,
      company : req.body.company,
      name : req.body.name,
      company_link : req.body.company_link,
      industry : req.body.industry,
      financing_situation : req.body.financing_situation,
      accessory : req.body.accessory,
      project_brief : req.body.project_brief,
      policy : req.body.policy,
      apply_user_id: req.user && req.user._id,
      apply_time: new Date(),
  });
  apply_policy.save(function (err, data) {
    if (err) {
      return next(err);
    } else if (req.user) {
      const updatestr = { server: req.user.server + 1 };
      console.log('server', req.user.server);
      User.findByIdAndUpdate({ _id: req.user._id }, updatestr, function(err, result) {
        if (err) return next(err);
        res.json({
          code: 0,
          msg: '申请更新成功',
        });
      });
    } else {
      res.json({
        code: 0,
        data,
      })
    }
  })
})

module.exports = router;
