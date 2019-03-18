var express = require('express');
var router = express.Router();
var alumniService = require('../services/alumniService');
var appLogger = require('../logging/appLogger');
var gridfs = require('../daos/gridfsDao');
var path = require('path');
var multer = require('multer');
var config = require('../config/config.' + process.env.NODE_ENV);
var dbConfig = config.dbConfig;
var fs = require('fs-extra');
var XLSX = require('xlsx');
const storage = require('multer-gridfs-storage')({
    url: dbConfig.url
});
const upload = multer({ storage: storage });

const storageDoc = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, '/mnt/nfs/var/www/assets/alumni/attachments/')
        cb(null, '/attachment/')
    },
    filename: function (req, file, cb) {
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        var string_length = 40;
        var randomstring = '';
        for (var i = 0; i < string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
        }

        cb(null, "PSG-" + randomstring + '-' + Date.now() + path.extname(file.originalname))
    }

})

const uploadDoc = multer({ storage: storageDoc });

// const storagexls = multer.diskStorage({
//     destination: (req, file, callback) => {
//         let type = req.params.type;
//         let path = `./uploadFile`;
//         fs.mkdirsSync(path);
//         callback(null, path);
//     },
//     filename: (req, file, callback) => {
//         //originalname is the uploaded file's name with extn
//         callback(null, Date.now() + path.extname(file.originalname));
//     }
// })

// const uploadxls = multer({ storage: storagexls });

/** File upload  **/
// router.route('/uploadFile')
//     .post(upload.array('file', 10), function (req, res) {
//         res.send(req.files);

//     });

/** File upload XLSX  **/
// router.route('/addGroupMembers/:groupName')
//     .post(uploadxls.array('file', 10), function (req, res, next) {

//         var filename = req.files[0].filename;
//         var groupName = req.params.groupName;
//         var filePath = "./uploadFile/" + filename;
//         var workbook = XLSX.readFile(filePath);
//         var sheet_name_list = workbook.SheetNames;
//         var worksheet = workbook.Sheets["Sheet1"];
//         if (Object.keys(worksheet).length) {
//             var headers = {};
//             var data = [];
//             for (z in worksheet) {
//                 if (z[0] === '!') continue;
//                 //console.log("here" + z);
//                 var col = z.substring(0, 1);
//                 var row = parseInt(z.substring(1));
//                 var value = worksheet[z].v;
//                 if (row == 1) {
//                     headers[col] = value;
//                     continue;
//                 }

//                 if (!data[row]) data[row] = {};
//                 data[row][headers[col]] = value;
//             }

//             data.shift();
//             data.shift();

//             var schemaArray = [];
//             data.forEach(function (record) {
//                 schemaArray.push({
//                     studentName: record.name,
//                     rollNumber: record.rollno,
//                     studentEmail: record.email,
//                     studentContactNo: record.phone,
//                     addressStreet: record.address,
//                     addressCity: record.city,
//                     yearOfGraduation: record.YearofGraduation,
//                     degreeName: record.degree,
//                     branchName: record.branch,
//                     groupName: groupName
//                 });
//             });
//             //emptyDir 
//             fs.removeSync(filePath);
//             alumniService.addGroupMembers(schemaArray, function (err, response) {
//                 if (!err) {
//                     res.send(response);
//                 }
//                 else {
//                     res.status(500).send(err);
//                 }
//             });
//         }
//         else {
//             res.send("Sheet name mismatch", null);
//         }
//     });


router.get('/alumniDteails/:groupName', function (req, res, next) {

    alumniService.getDetails(req.params.groupName, function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send(err);
        }
    });

});

router.get('/getAlumniMember/:alumniId', function (req, res, next) {
    alumniService.getAlumniMemberDetail(req.params.alumniId, function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send(err);
        }
    });
});

router.put('/editAlumniMember/:id', function (req, res, next) {
    var groupDetails = req.body;
    var groupID = req.params.id;
    alumniService.editAlumniMemberID(groupID, groupDetails, function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send(err);
        }
    });
});


router.get('/studentDetails/:rollNo', function (req, res, next) {

    alumniService.getStudentDetails(req.params.rollNo, function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send(err);
        }
    });

});

router.get('/alumniList/:alumniId', function (req, res, next) {
    alumniService.getDetail(req.params.alumniId, function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send(err);
        }
    });
});

//Edit Group Member
router.put('/editNameList/:id', function (req, res, next) {
    var groupDetails = req.body;
    var groupID = req.params.id;
    alumniService.updateById(groupID, groupDetails, function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send(err);
        }
    });
});

//Edit Group Member with Rollno
router.put('/editNameListRollNo/:Rollno', function (req, res, next) {
    var groupDetails = req.body;
    var groupRollNO = req.params.Rollno;
    alumniService.updateByRollNO(groupRollNO, groupDetails, function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send(err);
        }
    });
});

/*get Group list*/
router.get('/getGroup', function (req, res, next) {
    alumniService.getGroupNames(function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send(err);
        }
    });
});


router.post('/addNameList', function (req, res, next) {

    alumniService.insertDetails(req.body, function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.send(err);
        }
    });
});

router.post('/alumniGroupMember/:id', function (req, res, next) {
    var groupMemberID = req.params.id;
    var groupname = req.body;
    alumniService.remove(groupMemberID, groupname, function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send(err);
        }
    });
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



//Email 
router.post('/getGroupMemberEmail', function (req, res, next) {
    var details = req.body.selectGrroupNames;
    var subject = req.body.emailSubject;
    var msgHeader = req.body.emailHeader;
    var msgContent = req.body.emailMessage;
    var msgFoooter = req.body.emailFooter;
    var msgFileName = req.body.filesHTML;
    var groupNameList = req.body.selectGrroupNames

    var fileTypeType = req.body.attachOriginalName;
    var fileName = req.body.attachFileName;

    var skip = 0;
    var skipCount = 0;
    if (msgFileName) {
        var message = [msgHeader, msgContent, msgFoooter, msgFileName];
    } else {
        var message = [msgHeader, msgContent, msgFoooter];
    }

    alumniService.getGroupMemberEmailID(details, subject, message, fileName, fileTypeType, skip, skipCount, function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send(err);
        }
    });
});

//Student
router.get('/getAlumniList', function (req, res, next) {
    alumniService.getAlumniList(function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send(err);
        }
    });
});

router.post('/getFilterList', function (req, res, next) {
    var details = req.body;
    alumniService.getFilterDetails(details, function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send(err);
        }
    });
});

router.get('/getFilterDataList/:datatype', function (req, res, next) {
    var dataName = req.params.datatype;
    alumniService.getFilterDataList(dataName, function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send(err);
        }
    });
});

//myprofile get alumni
router.get('/getAllAlumni', function (req, res) {
    alumniService.getAllAlumni(function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send(err);
        }
    });
});

router.post('/createAlumni', function (req, res, next) {
    alumniService.createAlumni(req.body, function (err, response) {
        if (!err) {
            res.send(response);
            //appLogger.info("success in creation");
        }
        else {
            res.status(500).send(err);
            appLogger.error("error in creation ", err);
        }
    });
});
router.put('/updateAlumni', function (req, res) {
    alumniService.updateAlumni(req.body.id, req.body.recordToEdit, function (err, response) {
        if (!err) {
            res.send(response);
            //appLogger.info("success in updating");
        }
        else {
            res.status(500).send(err);
            appLogger.error("error in updating ", err);
        }
    });
});

router.delete('/deleteAlumni', function (req, res) {
    alumniService.deleteAlumni(req.body.id, function (err, response) {
        if (!err) {
            res.send(response);
            //appLogger.info("success in deleting");
        }
        else {
            res.status(500).send(err);
            appLogger.error("error in deleting ", err);
        }
    });
});

/* router.put('/myprofile/:id', function (req, res, next) {
     var alumniDetails = req.body; 
     var alumniID =  req.params.id;  
     alumniService.updateAlumni(alumniID, alumniDetails, function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send(err);
        }
    });
 });*/

/******jobs*****/
router.get('/getAllJob', function (req, res) {
    alumniService.getAllJob(function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send(err);
        }
    });
});

router.get('/getJobById/:id', function (req, res) {
    alumniService.getJobById(req.params.id, function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send(err);
        }
    });
});

router.post('/postJob', function (req, res, next) {
    alumniService.postJob(req.body, function (err, response) {
        if (!err) {
            res.send(response);
            //appLogger.info("successfully posted");
        }
        else {
            res.status(500).send(err);
            appLogger.error("error in posting ", err);
        }
    });
});

router.put('/updateJob', function (req, res) {
    alumniService.updateJob(req.body.id, req.body.recordToEdit, function (err, response) {
        if (!err) {
            res.send(response);
            //appLogger.info("success in updating");
        }
        else {
            res.status(500).send(err);
            appLogger.error("error in updating ", err);
        }
    });
});

router.delete('/deleteJob/:id', function (req, res) {
    alumniService.deleteJob(req.body.id, function (err, response) {
        if (!err) {
            res.send(response);
            //appLogger.info("success in deleting");
        }
        else {
            res.status(500).send(err);
            appLogger.error("error in deleting ", err);
        }
    });
});
//email
router.post('/getEmail', function (req, res, next) {

    var query = req.body.Email;
    var subject = req.body.emailSubject;
    var message = req.body.emailMessage;
    var fileTypeType = req.body.attachOriginalName;
    var fileName = req.body.attachFileName;
    alumniService.getEmailID(query, subject, message, fileName, fileTypeType, function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send(err);
        }
    });
});

////File upload  
router.route('/uploadFile')
    .post(upload.array('file', 10), function (req, res) {
        res.send(req.files);

    });


/**************News***************/
router.get('/getAllNews', function (req, res) {
    alumniService.getAllNews(function (err, response) {
        if (!err) {
            res.send(response);

        }
        else {
            res.status(500).send(err);
        }
    });
});

router.get('/getNewsById/:id', function (req, res) {
    alumniService.getNewsById(req.params.id, function (err, response) {
        if (!err) {
            res.send(response);
            //alert(response);
        }
        else {
            res.status(500).send(err);
        }
    });
});

router.post('/postNews', function (req, res, next) {
    alumniService.postNews(req.body, function (err, response) {
        if (!err) {
            res.send(response);
            //appLogger.info("successfully posted");
        }
        else {
            res.status(500).send(err);
            appLogger.error("error in posting ", err);
        }
    });
});



router.put('/updateNews', function (req, res) {
    alumniService.updateNews(req.body.id, req.body.recordToEdit, function (err, response) {
        if (!err) {
            res.send(response);
            //appLogger.info("success in updating");
        }
        else {
            res.status(500).send(err);
            appLogger.error("error in updating ", err);
        }
    });
});

router.delete('/deleteNews/:id', function (req, res) {
    alumniService.deleteNews(req.body.id, function (err, response) {
        if (!err) {
            res.send(response);
            //appLogger.info("success in deleting");
        }
        else {
            res.status(500).send(err);
            appLogger.error("error in deleting ", err);
        }
    });
});
//upload image
router.put('/file/upload', upload.array("fileAttachment"), function (req, res, next) {
    if (!((req.files) && (req.files.length > 0))) {
        res.send({ message: "No files to upload" });
        return;
    }
    res.send(req.files);
});
router.delete('/removeDirtyAttachment', function (req, res) {
    alumniService.removeDirtyAttachment(req.body.dirtyFileId, function (err, response) {
        if (!err) {
            res.send(response)
        }
        else {
            res.status(500).send(err);
        }
    })
})
router.get('/loadimg/:id/:originalname/:contentType/:contentType2', function (req, res, next) {
    var attachmentDetails = {
        id: req.params.id,
        originalname: req.params.originalname,
        contentType: req.params.contentType + "/" + req.params.contentType2
    }

    gridfs.openAttachment(attachmentDetails, res);
});


/*************events************/

router.get('/getAllEvent', function (req, res) {
    alumniService.getAllEvent(function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send(err);
        }
    });
});
router.get('/getEventById/:id', function (req, res) {
    alumniService.getEventById(req.params.id, function (err, response) {
        if (!err) {
            res.send(response);
            //alert(response);
        }
        else {
            res.status(500).send(err);
        }
    });
});
router.post('/postEvent', function (req, res, next) {
    alumniService.postEvent(req.body, function (err, response) {
        if (!err) {
            res.send(response);
            //appLogger.info("successfully posted");
        }
        else {
            res.status(500).send(err);
            appLogger.error("error in posting ", err);
        }
    });
});
/********Donation**********/
router.get('/getAllDonation', function (req, res) {
    alumniService.getAllDonation(function (err, response) {
        if (!err) {
            res.send(response);

        }
        else {
            res.status(500).send(err);
        }
    });
});

router.get('/getDonationById/:id', function (req, res) {
    alumniService.getDonationById(req.params.id, function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send(err);
        }
    });
});

router.post('/postDonation', function (req, res, next) {
    alumniService.postDonation(req.body, function (err, response) {
        if (!err) {
            res.send(response);
            //appLogger.info("successfully posted");
        }
        else {
            res.status(500).send(err);
            appLogger.error("error in posting ", err);
        }
    });
});



router.put('/updateDonation', function (req, res) {
    alumniService.updateDonation(req.body.id, req.body.recordToEdit, function (err, response) {
        if (!err) {
            res.send(response);
            //appLogger.info("success in updating");
        }
        else {
            res.status(500).send(err);
            appLogger.error("error in updating ", err);
        }
    });
});

router.delete('/deleteDonation/:id', function (req, res) {
    alumniService.deletedonation(req.body.id, function (err, response) {
        if (!err) {
            res.send(response);
            //appLogger.info("success in deleting");
        }
        else {
            res.status(500).send(err);
            appLogger.error("error in deleting ", err);
        }
    });
});
//upload image
router.put('/file/upload', upload.array("fileAttachment"), function (req, res, next) {
    if (!((req.files) && (req.files.length > 0))) {
        res.send({ message: "No files to upload" });
        return;
    }
    res.send(req.files);
});
router.delete('/removeDirtyAttachment', function (req, res) {
    alumniService.removeDirtyAttachment(req.body.dirtyFileId, function (err, response) {
        if (!err) {
            res.send(response)
        }
        else {
            res.status(500).send(err);
        }
    })
})
router.get('/loadimg/:id/:originalname/:contentType/:contentType2', function (req, res, next) {
    var attachmentDetails = {
        id: req.params.id,
        originalname: req.params.originalname,
        contentType: req.params.contentType + "/" + req.params.contentType2
    }

    gridfs.openAttachment(attachmentDetails, res);
});


module.exports = router;


