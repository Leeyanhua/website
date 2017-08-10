var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();

let index = path.join(__dirname, '..', '..', 'front_end', 'build', 'index.html');

let admin = path.join(__dirname, '..', 'public', 'admin', 'index.html');

if (!fs.existsSync(index)) {
  index = path.join(__dirname, '..', 'public', 'show', 'index.html');
}

console.log('index', index);
// console.log('admin', admin);

// router.get(/^\/admin/, (req, res) => {
//   console.log('page admin');
//   res.sendFile(admin);
// });

// use home page.
router.use('/policy', function(req, res, next) {
  res.sendFile(index);
});
router.use('/calculate', function(req, res, next) {
  res.sendFile(index);
});
router.use('/space', function(req, res, next) {
  res.sendFile(index);
});
router.use('/user', function(req, res, next) {
  res.sendFile(index);
});


/* use home page. */
router.use(/^\/xiaochuang/, (req, res) => {
  res.sendFile(index);
});


module.exports = router;
