const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PolicySchema = new Schema({
    end_date: {type: String},                         //截止日期
    document_symbol : { type: String},                //发文文号
    policy_source : { type: String},                  //政策来源
    release_date: {type: String},                     //发布日期
    issue_organization: {type: String},               //发布机构
    policy_name : { type: String},                    //政策名称
    content: {type: String},                          //政策内容
    policy_class: {type: Array},                      //政策类型
    keywords : { type: Array},                        //关键词
    subsidize_project : { type: String},              //资助项目
    application_classes : { type: String},            //申请类型
    sort_index: {type: Number},                        // 排序因子
    images : { type: Array }                            //内容图片
});

module.exports = PolicySchema;
