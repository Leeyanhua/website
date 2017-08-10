const express = require('express');
// const index = require('./routes/index.js');
const app = express();

// 定义注册模型
require('./db/modules.js')();
// 常规设置
require('./config/express')(app);
// api 路由设置
require('./config/url')(app);
// 错误处理
require('./config/err')(app)

module.exports = app;
