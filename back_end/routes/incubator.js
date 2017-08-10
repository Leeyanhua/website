const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Incubator = mongoose.model('Incubator');

//统计标签查询
router.get('/tags', function(req, res, next) {
  Incubator.aggregate().unwind('policy_tags').group({ _id: '$policy_tags', count: {$sum : 1} }).sort({count: -1})
  .limit(5).exec(function (err, policy_tags) {
    if (err) return next(err);

    Incubator.aggregate().unwind('tags').group({ _id: '$tags', count: {$sum : 1} }).sort({count: -1})
    .limit(5).exec(function (err, tags) {
      if (err) return next(err);

      Incubator.aggregate().unwind('service_tags').group({ _id: '$service_tags', count: {$sum : 1} }).sort({count: -1})
      .limit(5).exec(function (err, service_tags) {
        if (err) return next(err);

        res.json({
          code: 0,
          tags,
          policy_tags,
          service_tags,
        });
      });
    });
  });
});

//模糊查询
router.get('/', function(req, res, next) {
  const {
    price_gte,  // 价格大于等于
    price_lte,  // 价格小于等于
    area_gte,   //面积大于等于
    area_lte,   //面积小于等于
    type,
    zone,
    value
  } = req.query;
  var condition = {},  // 搜索条件
      price_num = {},  // 价格条件
      area = {};       // 面积条件
  // 多字段 模糊匹配
  if (value) {
    const reg = new RegExp(value);
    condition['$or'] = [                       //多条件，数组
      {name : {$regex : reg}},
      {address : {$regex : reg}},
      {price : {$regex : reg}},
      {zone : {$regex : reg}},
      {type : {$regex : reg}}
    ]
  }

  // 区间查询 价格
  if (price_gte) price_num['$gte'] = Number(price_gte);
  if (price_lte) price_num['$lte'] = Number(price_lte);
  if (price_gte || price_lte) condition.price_num = price_num;

  // 区间查询 面积
  if (area_gte) area['$gte'] = Number(area_gte);
  if (area_lte) area['$lte'] = Number(area_lte);
  if (area_gte || area_lte) condition.area = area;

  // 区域和类型查询 区域、办公类型
  if (type) condition.type = type;
  if (zone) condition.zone = zone;

  Incubator.count(condition, function(err, count) {
    Incubator.find(condition).exec(function(err, data){
      if (err) {
        console.log("Error:" + err);
      }
      else {
        res.json({
          count,
          code: 0,
          data,
        });
      }
    });
  });
});


//返回统计区域  policy页面
router.get('/zone', function(req, res, next) {
  Incubator.aggregate().group({ _id: '$zone', count: {$sum : 1} }).sort({count: -1}).exec(function (err, zone) {
    if (err) return next(err);

    res.json({
      code: 0,
      zone,
    });
  });
});

//新增
router.post('/', function(req, res, next) {

    var incubator = new Incubator({
        lng : req.body.lng,
        area : req.body.area,
        lat : req.body.lat,
        service : req.body.service,
        city : req.body.city,
        zone : req.body.zone,
        requirment : req.body.requirment,
        details : req.body.details,
        policy : req.body.policy,
        price : req.body.price,
        address : req.body.address,
        name : req.body.name,
        subway : req.body.subway,
        images : req.body.images,
        policy_tags : req.body.policy_tags,
        news_title : req.body.news_title,
        news_content : req.body.news_content,
        in_company : req.body.in_company,
        in_company_url : req.body.in_company_url,
        service_tags : req.body.service_tags,
        tags : req.body.tags
    });

    incubator.save(function (err, data) {

        if (err) {
            console.log("Error:" + err);
        }
        else {
            res.json(data);
        }
    });
});

//更新
router.put('/', function(req, res, next) {

    var id = req.body.id;
    var updatestr = {};

    if(req.body.lng!=undefined){
    updatestr['lng'] = req.body.lng
    }

    if(req.body.area!=undefined){
    updatestr['area'] = req.body.area
    }

    if(req.body.lat!=undefined){
    updatestr['lat'] = req.body.lat
    }

    if(req.body.subway!=undefined){
    updatestr['subway'] = req.body.subway
    }

    if(req.body.service!=undefined){
    updatestr['service'] = req.body.service
    }

    if(req.body.city!=undefined){
    updatestr['city'] = req.body.city
    }

    if(req.body.zone!=undefined){
    updatestr['zone'] = req.body.zone
    }

    if(req.body.requirment!=undefined){
    updatestr['requirment'] = req.body.requirment
    }

    if(req.body.details!=undefined){
    updatestr['details'] = req.body.details
    }

    if(req.body.policy!=undefined){
    updatestr['policy'] = req.body.policy
    }

    if(req.body.price!=undefined){
    updatestr['price'] = req.body.price
    }

    if(req.body.address!=undefined){
    updatestr['address'] = req.body.address
    }

    if(req.body.name!=undefined){
    updatestr['name'] = req.body.name
    }

    if(req.body.images!=undefined){
    updatestr['images'] = req.body.images
    }

    if(req.body.policy_tags!=undefined){
    updatestr['policy_tags'] = req.body.policy_tags
    }

    if(req.body.news_title!=undefined){
    updatestr['news_title'] = req.body.news_title
    }

    if(req.body.news_content!=undefined){
    updatestr['news_content'] = req.body.news_content
    }

    if(req.body.in_company!=undefined){
    updatestr['in_company'] = req.body.in_company
    }

    if(req.body.in_company_url!=undefined){
    updatestr['in_company_url'] = req.body.in_company_url
    }

    if(req.body.service_tags!=undefined){
    updatestr['service_tags'] = req.body.service_tags
    }

    if(req.body.tags!=undefined){
    updatestr['tags'] = req.body.tags
    }

    Incubator.findByIdAndUpdate(id, updatestr, function(err, data){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            res.json(data);
        }
    });
});

//根据ID查询
router.get('/:id', function(req, res, next) {
  const id = req.params.id;

  Incubator.findById(id, function(err, data){
    if (err) return next(err);
    const resultJson = { code: 0, data };
    if(req.user && req.user._id) {
      resultJson.liked = req.user.space_collect.indexOf(id) > -1;
    }
    res.json(resultJson);
  });
});

module.exports = router;
