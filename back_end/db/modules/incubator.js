const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var IncubatorSchema = new Schema({
    facility : { type: String },            //具备设施
    lng : { type: Number},                  //纬度
    area: {type: Number},                   //面积
    lat : { type: Number},                  //经度
    subway : { type: String },                //地铁
    traffic: {type: String},                 //临近交通
    service: {type: String},                //提供服务
    city : { type: String},                 //所在城市
    zone: {type: String},                   //所在区
    requirment: {type: String},             //入驻要求
    details: {type: String},                //环境介绍
    policy : { type: String},               //优惠政策
    price : { type: String},                //服务费
    address : { type: String},              //地址
    name : { type: String},                 //空间名称
    images: {type: Array},                  //空间图片
    policy_tags : { type: Array},           //政策标签
    news_title : { type: Array},            //新闻标题
    news_content : { type: Array},          //新闻内容
    in_company : { type: Array},            //入驻企业
    in_company_url: {type: Array},          //入驻企业网址
    service_tags: {type: Array},            //服务标签
    tags : { type: Array},                   //空间标签
    area_str : { type: String }             //面积字符串类型
});

module.exports = IncubatorSchema;
