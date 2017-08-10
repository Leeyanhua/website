const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var RegistrySchema = new Schema({
    content : { type: String },                 //公司注册内容
    name: {type: String}                        //各种注册名称
});

module.exports = RegistrySchema;
