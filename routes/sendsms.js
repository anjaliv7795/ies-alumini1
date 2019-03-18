var express = require('express');
var router = express.Router();
var sendsmsService = require('../services/sendsmsService');
var appLogger = require('../logging/appLogger');
router.get('/', function (req, res, next) {
    sendsmsService.getAllList(function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send(err);
        }
    });
});
router.get('/:id',function(req,res,next){
    sendsmsService.getAllListById(req.params.id,function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send(err);
        }
    });
});

router.post('/', function (req, res, next) {
    console.log(req.body);
    sendsmsService.insertDetails(req.body, function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.send(err);
        }
    });
});
router.delete('/:rno',function(req,res,next){
    sendsmsService.remove({rno:req.params.rno},function(err,response){
        if(!err){
            res.send(response);
        }
        else{
            res.send(err);
        }
    });
});
module.exports = router;


