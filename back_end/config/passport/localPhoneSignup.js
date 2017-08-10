'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const User = mongoose.model('User');

/**
 * Expose
 */

module.exports = new LocalStrategy({
    usernameField: 'phone',
    passwordField: 'password',
    passReqToCallback: true,
  },
  function (req, phone, password, done) {
    const { auth_code } = req.body;
    User.findOne({ phone }, function (err, user) {
      if (err) return done(err);
      // console.log('user', user);
      // console.log('auth_code in form', auth_code);
      if (!user) {
        return done(null, false, { code: 1, msg: '手机号错误' });
      }
      if (auth_code !== user.auth_code) {
        return done(null, false, { code: 1, msg: '验证码错误' });
      }
      if (user.hashed_password) {
        return done(null, false, { code: 1, msg: '手机号已注册' });
      }
      const salt = Math.round((new Date().valueOf() * Math.random())).toString();
      const NewUserData = {
        salt,
        hashed_password: password,
      };
      User.findByIdAndUpdate(user._id, NewUserData, (update_err) => {
        if (update_err) return done(update_err);
        return done(null, user);
      })
    });
  }
);
