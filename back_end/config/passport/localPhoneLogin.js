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
      if (user.hashed_password !== password) {
        return done(null, false, { code: 1, msg: '密码错误' });
      }
      return done(null, user);
    });
  }
);
