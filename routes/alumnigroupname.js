var express = require('express');
var router = express.Router();
var alumniService = require('../services/alumniGroupNameService');
var appLogger = require('../logging/appLogger');
var gridfsDao = require('../daos/gridfsDao');
var multer = require('multer');
var config = require('../config/config.' + process.env.NODE_ENV);
const storage = require('multer-gridfs-storage')({
    url: config.dbConfig.url
});
const upload = multer({ storage: storage });

router.get('/getGroupName', function (req, res, next) {
    alumniService.getAllList(function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send(err);
        }
    });
    
});

router.post('/addGroupName', function (req, res, next) {
    alumniService.insertDetails(req.body, function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.send(err);
        }
    });
});

router.put('/editGroupName/:id', function (req, res, next) {
    var groupDetails = req.body; 
    //console.log(groupDetails);
    var groupID =  req.params.id;  
    alumniService.updateById(groupID, groupDetails, function (err, response) {
       if (!err) {
           res.send(response);
       }
       else {
           res.status(500).send(err);
       }
   });
});


module.exports = router;


