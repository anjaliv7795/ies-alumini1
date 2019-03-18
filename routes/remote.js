var express = require('express');
var router = express.Router();
var mongodb = require("mongodb")
var Client = require('node-rest-client').Client
var config = require('../config/config.' + process.env.NODE_ENV);
var entitiesRemoteUrl = config.entitiesRemoteUrl;
router.get('/getAllAlumniEvent', function (req, res) {
    var client = new Client();
    // remote url has to come from configuration file based on entity name
    var remoteUrl = entitiesRemoteUrl["events"];
    // set content-type header and data as json in args parameter 
    var args = {
        data: { filterQuery: req.body, projection: ["title", "venue", "fdesc", "startdate", "enddate", "starttime", "endtime", "displayPicture"] },
        headers: {
            "Content-Type": "application/json",
            "Authorization": "PsgSt02112016"
        }
    };

    // direct way 
    client.post(remoteUrl, args, function (data, response) {
        // parsed response body as js object 
        if (response.statusCode == 200) {
            res.send(data);
        }

    }).on('error', function (e) {
        res.status(500).send({ err: e });
    }).end()
});


router.get('/getAlumniEventById/:id', function (req, res) {
    var client = new Client();
    // remote url has to come from configuration file based on entity name
    var remoteUrl = entitiesRemoteUrl.eventbyid + req.params.id;
    // set content-type header and data as json in args parameter 
    var args = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "PsgSt02112016"
        }
    };
    // direct way 
    client.get(remoteUrl, args, function (data, response) {
        // parsed response body as js object 
        if (response.statusCode == 200) {
            res.send(data);
        }

    }).on('error', function (e) {
        res.status(500).send({ err: e });
    }).end()
});

//sis api for bysearch
router.get('/getAllStudents', function (req, res) {
    var client = new Client();
    var remoteUrl = entitiesRemoteUrl["sis"];
    // set content-type header and data as json in args parameter 
    // var projection = ["attendanceDate","session","studentName","attendance"];
    var args = {
        data: { criteria: {}, projection: ["studentName", "rollNumber", "currentSem", "branchName", "degreeName"] },
        headers: {
            "Content-Type": "application/json",
            "Authorization": "annasarpprasanna"
        }
    };
    // direct way 
    client.post(remoteUrl, args, function (data, response) {
        // parsed response body as js object 
        if (response.statusCode == 200) {
            res.send(data);
        }
        else {
            res.status(500).send({ err: response.statusMessage });
        }

    }).on('error', function (e) {
        res.status(500).send({ err: e });
    }).end()
});

// router.post('/getAlumniByQuery', function (req, res, next) {
//     alumniService.getAlumniByQuery(req.body.asset,function (err, response) {
//         if (!err) {
//             res.send(response);
//         }
//         else {
//             // appLogger.error({ err: err }, "Error while updating Authority details");
//             console.log("Error While read the item")
//             res.status(500).send({ error: err.name, message: err.message });
//         }
//     });
// })

module.exports = router;