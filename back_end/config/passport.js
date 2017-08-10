'use strict';

/*!
 * Module dependencies.
 */

const mongoose = require('mongoose');
const User = mongoose.model('User');

const localPhoneSignup = require('./passport/localPhoneSignup');
const localPhoneLogin = require('./passport/localPhoneLogin');


/**
 * Expose
 */

module.exports = function (passport) {
  console.log('init passport');

  // 序列 & 反序列
  passport.serializeUser((user, cb) => cb(null, user.id));
  passport.deserializeUser((id, cb) => User.findOne({ _id: id }, { hashed_password: 0, salt: 0 }, cb));

  // 本地 手机注册
  passport.use('local-phone-signup', localPhoneSignup);
  // 本地 手机登陆
  passport.use('local-phone-login', localPhoneLogin);
};
