const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const pkg = require('../package.json');
const mongoStore = require('connect-mongo')(session);
const config = require('./');
const env = process.env.NODE_ENV || 'development';
const index = require('../routes/index.js');


const admin = path.join(__dirname, '..', 'public', 'admin', 'index.html');

const db = require('./db');

module.exports = (app) => {
  console.log('init express');

  // 模板引擎
  app.set('views', path.join(__dirname, '..', 'views'));
  app.set('view engine', 'ejs');

  // expose package.json to views
  app.use(function (req, res, next) {
    res.locals.pkg = pkg;
    res.locals.env = env;
    next();
  });


  // 打印输出
  app.use(logger('dev'));

  // body 解析
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  // cookie 解析操作

  app.use(cookieParser());
  app.use(cookieSession({ secret: 'secret' }));
  app.use(session({
   resave: false,
   saveUninitialized: true,
   secret: pkg.name,
   store: new mongoStore({
     url: db,
     collection : 'sessions'
   })
  }));

  // // 页面 路由处理
  // app.use('/admin', (req, res) => {
  //   console.log('admin get page');
  //   res.sendFile(admin);
  // });


  // 全局静态文件
  // app.use(express.static(path.join(__dirname, '..', 'public')));
  // 前台系统
  app.use(express.static(path.join(__dirname, '..', '..', 'front_end', 'build')));

  require('./passport')(passport); // passport 配置文件

  // use passport session
  app.use(passport.initialize());
  app.use(passport.session());

  app.use((req, res, next) => {
    next();
  });
  console.log('init express end');
}
