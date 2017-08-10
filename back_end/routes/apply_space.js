const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Apply_space = mongoose.model('Apply_space');
const User = mongoose.model('User');

//查询
router.get('/', function(req, res, next) {
  var wherestr = {};

  Apply_space.count(wherestr, function (err, count) {
    Apply_space.find(wherestr, function (err, data) {
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

  var apply_space = new Apply_space({
      phone : req.body.phone,
      company : req.body.company,
      name : req.body.name,
      email : req.body.email,
      company_link : req.body.company_link,
      project_brief : req.body.project_brief,
      accessory : req.body.accessory,
      financing_situation : req.body.financing_situation,
      industry : req.body.industry,
      space : req.body.space,
      apply_user_id: req.user && req.user._id,
      apply_time: new Date()
  });

  apply_space.save(function (err, data) {
    if (err) {
      console.log("Error:" + err);
    } else if (req.user) {
      const updatestr = { server: req.user.server + 1 };
      console.log('server', req.user.server);
      User.findByIdAndUpdate({ _id: req.user._id }, updatestr, function(err, result) {
        if (err) return next(err);
        res.json({
          code: 0,
          msg: '空间申请成功',
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
// //根据信息ID获取详情
// router.get('/:id', function(req, res, next) {
//   const id = req.params.id;
//   // console.log("id:", id);
//
//   Apply_space.findById(id, function (err, data) {
//     if (err) {
//         console.log("Error:" + err);
//     }
//     else {
//         // console.log("Res:" + data);
//       res.json({
//         code: 0,
//         data,
//       })
//     }
//   })
// })

module.exports = router;
