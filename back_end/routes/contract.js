const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Contract = mongoose.model('Contract');

/* GET users listing. */
router.get('/', function(req, res, next) {
    var wherestr = {};

    if(req.query.content!=undefined){
    wherestr['content'] = req.query.content
    }

    if(req.query.name!=undefined){
    wherestr['name'] = req.query.name
    }

    Contract.find(wherestr, function(err, data){
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

    var contract = new Contract({
        content : req.body.content,
        name : req.body.name
    });

    contract.save(function (err, data) {

        if (err) {
            console.log("Error:" + err);
        }
        else {
            res.json(data);
        }
    });
});

module.exports = router;
