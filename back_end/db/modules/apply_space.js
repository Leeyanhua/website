const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Apply_spaceSchema = new Schema({
    phone: {type: Number},                        //手机号
    email : { type: String},                          //邮箱
    company : { type: String},                        //所属企业
    name: {type: String},                             //姓名
    company_link: {type: String},                     //官网链接
    industry : { type: String},                        //企业所属行业
    financing_situation: {type: String},               //融资情况
    accessory: {type: String},                         //附件
    project_brief : { type: String},                  //项目简介
    space : {
      _id: { type: String },                          //申请空间的ID
      name : { type: String }                         //申请空间的标题
    },
    apply_user_id : { type: String },                  //申请人ID
    apply_state : { type: Number },                    //空间申请状态
    apply_time: { type: Date }                         //申请时间
});

module.exports = Apply_spaceSchema;
