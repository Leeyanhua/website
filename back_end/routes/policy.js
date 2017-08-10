const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Policy = mongoose.model('Policy');
const User = mongoose.model('User');

/* GET 分页搜索查询. */
// req.query.page 页码信息 根据页码信息返回当前页数的信息 10条每页
//  如果page 不存在 默认返回第一页
// req.query.value 搜索信息 根据搜索信息返回  （同时生效）  匹配标题 发布单位
//每条返回信息都要携带信息数量
router.get('/', function(req, res, next) {

  var pageSize = 10;                                        //一页多少条
  var currentPage = 1;                                     //设置当前页默认第一页
  if (req.query.page) {
    currentPage = req.query.page                          //修改当前页为前端所需要的页数
  }
  var sort = {'sort_index':-1};                          //排序
  var condition = {};                                    //条件
  var skipnum = (currentPage - 1) * pageSize;           //跳过数

  if (req.query.value) {
    const reg = new RegExp(req.query.value)            // 模糊匹配
    condition['$or'] = [                              //多条件，数组
      {policy_name : {$regex : reg}},
      {issue_organization : {$regex : reg}}
    ]
  }
  Policy.count(condition).exec(function (err, count) {
    // console.log('list count', count);
    Policy.find(condition).skip(skipnum).limit(pageSize).sort(sort).exec(function (err, data) {
      if (err) {
          console.log("Error:" + err);
      }
      else {
          // console.log("Res:" + data);
        res.json({
          code: 0,
          count,
          data,
        });
      }
    });
  })
});

//返回统计热门标签
router.get('/keywords', function(req, res, next) {
  Policy.aggregate().unwind('policy_class').group({ _id: '$policy_class', count: {$sum : 1} }).sort({count: -1})
  .limit(15).exec(function (err, policy_class) {
    // console.log("policy_class", policy_class)
    if (err) return next(err);

    Policy.aggregate().unwind('keywords').group({ _id: '$keywords', count: {$sum : 1} }).sort({count: -1})
    .limit(15).exec(function (err, keywords) {
      if (err) return next(err);
      res.json({
        code: 0,
        keywords,
        policy_class,
      });
    });
  });
});

/*删除
router.delete('/', function(req, res, next) {

    var wherestr = {'username' : req.query.username};

    User.remove(wherestr, function(err, data){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            res.send(data);
        }
    });
});
*/

//新增
router.post('/', function(req, res, next) {

  var policy = new Policy({
      application_classes : req.body.application_classes,
      end_date : req.body.end_date,
      document_symbol : req.body.document_symbol,
      release_date : req.body.release_date,
      issue_organization : req.body.issue_organization,
      policy_name : req.body.policy_name,
      content : req.body.content,
      policy_class : req.body.policy_class,
      keywords : req.body.keywords,
      policy_source : req.body.policy_source,
      subsidize_project : req.body.subsidize_project
  });

  policy.save(function (err, data) {

    if (err) {
        console.log("Error:" + err);
    }
    else {
        res.json(data);
    }
  });
});

//更新
router.put('/:id', function(req, res, next) {

  const id = req.params.id;
  console.log('start', id);

  const {
    application_classes,
    end_date,
    document_symbol,
    release_date,
    issue_organization,
    policy_name,
    content,
    policy_class,
    keywords,
    policy_source,
    subsidize_project,
  } = req.body;

  const updatestr = {};
  if (application_classes) updatestr.application_classes = application_classes;
  if (end_date) updatestr.end_date = end_date;
  if (document_symbol) updatestr.document_symbol = document_symbol;
  if (release_date) updatestr.release_date = release_date;
  if (issue_organization) updatestr.issue_organization = issue_organization;
  if (policy_name) updatestr.policy_name = policy_name;
  if (content) updatestr.content = content;
  if (policy_class) updatestr.policy_class = policy_class;
  if (keywords) updatestr.keywords = keywords;
  if (policy_source) updatestr.policy_source = policy_source;
  if (subsidize_project) updatestr.subsidize_project = subsidize_project;
  Policy.findByIdAndUpdate(id, { $set: updatestr }, function(err, data){
    if (err) {
        console.log("Error:" + err);
    } else {
        res.json({
          code: 0,
          data,
        });
      }
  });
});

//根据ID查询
router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  console.log(req.user);

  Policy.findById(id, function(err, data){
    if (err) return next(err);
    const resultJson = { code: 0, data };
    if(req.user && req.user._id) {
      resultJson.liked = req.user.policy_collect.indexOf(id) > -1;
    }
    res.json(resultJson);
  });
});

// //根据ID查询
// router.get('/:id', function(req, res, next) {
//   const id = req.params.id;
//
//   Policy.findById(id, function(err, data){
//     if (err) return next(err);
//     if(req.user && req.user._id) {
//       User.findById(req.user._id, { policy_collect: 1 }, (err, result) => {
//         const liked = result.policy_collect.indexOf(data._id) > -1;
//         data.liked = liked;
//         res.json({
//           code: 0,
//           data,
//         })
//       });
//     } else {
//       res.json({
//         code: 0,
//         data,
//       })
//     }
//   });
// });

module.exports = router;
