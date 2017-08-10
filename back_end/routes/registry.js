const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Registry = mongoose.model('Registry');

/* GET users listing. */
router.get('/', function(req, res, next) {
    var wherestr = {};

    if(req.query.content!=undefined){
    wherestr['content'] = req.query.content
    }

    if(req.query.name!=undefined){
    wherestr['name'] = req.query.name
    }

    Registry.find(wherestr, function(err, data){
        if (err) {
            console.log("Error:" + err);
        }
        else {

            res.send(data);
        }
    });
});

//新增
router.post('/', function(req, res, next) {

    var registry = new Registry({
        content : req.body.content,
        name : req.body.name
    });

    registry.save(function (err, data) {

        if (err) {
            console.log("Error:" + err);
        }
        else {
            res.json(data);
        }
    });
});

module.exports = router;
