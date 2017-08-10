const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ContractSchema = new Schema({
    content : { type: String },                     //合同内容
    name: {type: String}                            //合同名称
});

module.exports = ContractSchema;
