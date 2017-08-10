const express = require('express');
const router = express.Router();

/* GET 首页的问题配置. */
router.get('/main-questions', function(req, res, next) {
  const questionsGroup = [
    ['你能帮我些什么？'],
    ['4号地铁线附近有没有比较好的孵化器'],
    ['有没有扶持大学生创业的政策？'],
    ['法务咨询？'],
  ];

  res.json({
    code: 0,
    data: questionsGroup
  })
});


module.exports = router;
