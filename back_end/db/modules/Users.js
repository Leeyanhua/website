'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
// const crypto = require('crypto');

const Schema = mongoose.Schema;
// const oAuthTypes = [
//   'github',
//   'twitter',
//   'facebook',
//   'google',
//   'linkedin'
// ];

/**
 * User Schema
 */

const UserSchema = new Schema({
  realname: { type: String, default: '' },            // 姓名
  email: { type: String, default: '' },               // 邮箱
  username: { type: String, default: '' },            // 用户名
  provider: { type: String, default: '' },            // 供应者
  hashed_password: { type: String, default: '' },     // 哈希密码
  salt: { type: String, default: '' },                // 密码加密
  authToken: { type: String, default: '' },           // 授权认证
  phone: { type: Number },                            // 手机号
  space_collect: [ { type: String } ],                // 我的空间收藏
  policy_collect: [ { type: String } ],               // 我的政策收藏
  server: { type: Number, default: 0 },                 // 我的空间服务
  policy_server: [ { type: String } ],                // 我的政策服务
  gender: { type: Number },                           // 性别
  company : { type: String },                         // 所属企业
  industry : { type: String },                        // 企业所属行业
  financing_situation: { type: String },              // 融资情况
  position: { type: String },                         // 职位
  auth_code: { type: String },                        // 验证码
  auth_code_create: { type: Date },                   // 插入时间
  image: { type: String }                             // 头像
});
//
// const validatePresenceOf = value => value && value.length;
//
// /**
//  * Virtuals
//  */
//
// UserSchema
//   .virtual('password')
//   .set(function (password) {
//     this._password = password;
//     this.salt = this.makeSalt();
//     this.hashed_password = this.encryptPassword(password);
//   })
//   .get(function () {
//     return this._password;
//   });
//
// /**
//  * Validations
//  */
//
// // the below 5 validations only apply if you are signing up traditionally
//
// UserSchema.path('realname').validate(function (name) {
//   if (this.skipValidation()) return true;
//   return name.length;
// }, '姓名不能为空');
//
// UserSchema.path('email').validate(function (email) {
//   if (this.skipValidation()) return true;
//   return email.length;
// }, '邮箱不能为空');
//
// UserSchema.path('email').validate(function (email, fn) {
//   const User = mongoose.model('User');
//   if (this.skipValidation()) fn(true);
//
//   // Check only when it is a new user or when email field is modified
//   if (this.isNew || this.isModified('email')) {
//     User.find({ email: email }).exec(function (err, users) {
//       fn(!err && users.length === 0);
//     });
//   } else fn(true);
// }, '邮箱已经存在');
//
// UserSchema.path('username').validate(function (username) {
//   if (this.skipValidation()) return true;
//   return username.length;
// }, '用户名不能为空');
//
// UserSchema.path('hashed_password').validate(function (hashed_password) {
//   if (this.skipValidation()) return true;
//   return hashed_password.length && this._password.length;
// }, '密码不能为空');
//
//
// /**
//  * Pre-save hook
//  */
//
// UserSchema.pre('save', function (next) {
//   if (!this.isNew) return next();
//
//   if (!validatePresenceOf(this.password) && !this.skipValidation()) {
//     next(new Error('无效的密码'));
//   } else {
//     next();
//   }
// });
//
// /**
//  * Methods
//  */
//
// UserSchema.methods = {
//
//   /**
//    * Authenticate - check if the passwords are the same
//    *
//    * @param {String} plainText
//    * @return {Boolean}
//    * @api public
//    */
//
//   authenticate: function (plainText) {
//     return this.encryptPassword(plainText) === this.hashed_password;
//   },
//
//   /**
//    * Make salt
//    *
//    * @return {String}
//    * @api public
//    */
//
//   makeSalt: function () {
//     return Math.round((new Date().valueOf() * Math.random())) + '';
//   },
//
//   /**
//    * Encrypt password
//    *
//    * @param {String} password
//    * @return {String}
//    * @api public
//    */
//
//   encryptPassword: function (password) {
//     if (!password) return '';
//     try {
//       return crypto
//         .createHmac('sha1', this.salt)
//         .update(password)
//         .digest('hex');
//     } catch (err) {
//       return '';
//     }
//   },
//
//   /**
//    * Validation is not required if using OAuth
//    */
//
//   skipValidation: function () {
//     return ~oAuthTypes.indexOf(this.provider);
//   }
// };
//
// /**
//  * Statics
//  */
//
// UserSchema.statics = {
//
//   /**
//    * Load
//    *
//    * @param {Object} options
//    * @param {Function} cb
//    * @api private
//    */
//
//   load: function (options, cb) {
//     options.select = options.select || 'name username';
//     return this.findOne(options.criteria)
//       .select(options.select)
//       .exec(cb);
//   }
// };

module.exports = UserSchema;
