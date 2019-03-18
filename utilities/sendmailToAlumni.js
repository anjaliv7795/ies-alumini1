const alumniDao = require("../daos/alumniDao");
const dbUtil = require('../daos/MongodDbUtil');

var mailService = require('../services/mailService');

dbUtil.connect(function (err, db) {
    if (err) {
        console.error("Not able to connect to MongoDB");
    } else {
        process.nextTick(getFunction(getAluminiEmails, db));
    }
});

function getFunction(fn, arg) {
    //TODO use arguments variable
    return function () {
        return fn(arg);
    }
}

function getAluminiEmails(db) {
    //alumniDao.getAll(sendMailsToAluminis);
     var arr = [{email: "saravanakumar.b@psgsoftwaretechnologies.com"}];
     sendMailsToAluminis(null, arr);
}

function sendMailsToAluminis(err, records) {
    var processedStudents = [];
    var errorStudents = [];
        records.forEach(function(item) {
            setTimeout(function(){
                mailService.sendMail(item, "aluminiInvitation", null, function (emailError, emailResponse) {
                    if (!emailError) {
                        // appLogger.info("Successfully sent email on feedback invite to user %s. Status code: %s", student.email, emailResponse.statusCode);
                    } else {
                        // appLogger.error("Error feedback invite %s", student.email);
                        errorStudents.push(item);
                    }
                    processedStudents.push(item);
        
                    if (processedStudents.length == records.length) {
                        console.log("success");
                    }
                })
            }, 100);
            
        });
}
