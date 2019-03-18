var alumniDao = require('../daos/alumniDao');
var alumniEmailDao = require('../daos/alumniEmailDao');
var studentDao = require('../daos/studentDao');
var alumniGroupNameDao = require('../daos/alumniGroupNameDao');
var gridfsDao = require('../daos/gridfsDao');
var appLogger = require('../logging/appLogger');
var mailService = require('../services/mailService');
var myprofileDao = require('../daos/myprofileDao');
var jobDao = require('../daos/jobDao');
var newsDao = require('../daos/newsDao');
var emailDao = require('../daos/emailDao');
var studentsDao = require('../daos/studentsDao');
var donationDao = require('../daos/donationDao');
var moment = require('moment');
moment().format('DD-MM-YYYY');
var eventDao = require('../daos/eventDao');
function getAllList(callback) {
    hostelDao.getAll(callback);
}
//var d = new Date(year, month, day);

function addGroupMembers(schemaArray, callback) {
    var memberCount = schemaArray.length;
    var groupNameMember = schemaArray[0].groupName;
    //console.log(groupNameMember);
    //console.log(memberCount);
    var query1 = { groupName: groupNameMember };

    alumniDao.createMany(schemaArray, function (err, res) {
        if (!err) {
            alumniGroupNameDao.getByQuery(query1, function (err, res) {
                if (!err) {
                    var groupCount = res[0].groupMemberCount + memberCount;
                    var query2 = { 'groupMemberCount': groupCount };
                    alumniGroupNameDao.update(query1, query2, callback);
                }
            });
        }
    });
}
function insertDetails(details, callback) {
    var query = details.studentEmail
    var query1 = { groupName: details.groupName }
    alumniDao.getByQuery(query1, function (err, res) {
        if (!err) {
            if (res != "" && res != null && res != undefined) {
                for (var i = 0; i < res.length; i++) {
                    var email = res[i].studentEmail;
                    if (email == query) {
                        callback('exists');
                        return false;
                    }
                }
                alumniDao.create(details, function (err, res) {
                    if (!err) {
                        //Group Name Count Add
                        alumniGroupNameDao.getByQuery(query1, function (err, res) {
                            if (!err) {
                                var groupCount = res[0].groupMemberCount + 1;
                                var query2 = { 'groupMemberCount': groupCount };
                                alumniGroupNameDao.update(query1, query2, callback);
                            }
                        });
                    }
                });

            } else {
                alumniDao.create(details, function (err, res) {
                    if (!err) {
                        //Group Name Count Add
                        alumniGroupNameDao.getByQuery(query1, function (err, res) {
                            if (!err) {
                                var groupCount = res[0].groupMemberCount + 1;
                                var query2 = { 'groupMemberCount': groupCount };
                                alumniGroupNameDao.update(query1, query2, callback);
                            }
                        });
                    }
                });
            }
        }
    });
}

function getGroupNames(callback) {
    var query = {};
    var field = ['groupName'];
    alumniDao.getByQuery(query, field, callback);
}

function getDetails(name, callback) {
    alumniDao.getByQuery({ groupName: name }, callback);
}

function getDetail(Id, callback) {
    alumniDao.getById(Id, callback);
}
function updateByQuery(query, query2, callback) {
    alumniDao.update(query, query2, callback);
}

function updateById(id, detailsToUpdate, callback) {
    alumniDao.updateById(id, detailsToUpdate, callback);
}

function updateByRollNO(rollno, detailsToUpdate, callback) {
    alumniDao.updateMultiple({ 'rollNumber': rollno }, detailsToUpdate, function (err, res) {
        studentDao.updateMultiple({ 'rollNumber': rollno }, detailsToUpdate, callback);
    });
}

function remove(id, groupname, callback) {
    alumniDao.remove(id, function (err, res) {
        if (!err) {
            var query = groupname;
            //Group Name Count Subtract
            alumniGroupNameDao.getByQuery(query, function (err, res) {
                if (!err) {
                    var groupCount = res[0].groupMemberCount - 1;
                    var query2 = { 'groupMemberCount': groupCount };
                    alumniGroupNameDao.update(query, query2, callback);
                }
            });
        }
    });
}

function getGroupMemberEmailID(query, subject, message, fileName, fileType, skip, skipCount, callback) {
    var storeQuery = query;
    alumniDao.getQuerySingleField({ "groupName": { $in: query } }, skip, function (err, result) {
        if (!err) {
            console.log(result);
            if (result != "") {

                skipCount++;
                var skipTotal = skipCount;
                var skipVal = skipTotal * 200;

                sendMailsToAluminis(result, query, subject, message, fileName, fileType, skipVal, skipTotal, callback);
            } else {
                var dateTime = new Date();
                var alumniDetails = {
                    'groupName': storeQuery,
                    'message': message,
                    'attachmentFileName': fileName,
                    'attachmentOriginalName': fileType,
                    'date': dateTime
                }
                alumniEmailDao.create(alumniDetails, function (err, res) {
                    callback(null, 'success');
                    return false;
                });
            }

        }
    });
}

function sendMailsToAluminis(records, query, subject, message, fileName, fileType, skipVal, skipCount, callback) {
    var processedStudents = [];
    var errorStudents = [];

    var mailSubject = subject;
    var mailMessage = message;
    if (mailMessage[3] != "false") {
        records.forEach(function (item) {
            setTimeout(function () {

                var email = item.studentEmail;
                mailService.sendMail(email, "aluminiInviteFooter", mailSubject, mailMessage, fileName, fileType, null, function (emailError, emailResponse) {
                    if (!emailError) {
                        // appLogger.info("Successfully sent email on feedback invite to user %s. Status code: %s", student.email, emailResponse.statusCode);
                    } else {
                        // appLogger.error("Error feedback invite %s", student.email);
                        errorStudents.push(item);
                    }
                    processedStudents.push(item);
                    if (processedStudents.length == records.length) {
                        console.log("success");
                        getGroupMemberEmailID(query, subject, message, fileName, fileType, skipVal, skipCount, callback);
                    }

                })
            }, 200);

        });
    } else {
        records.forEach(function (item) {
            setTimeout(function () {

                var email = item.studentEmail;
                mailService.sendMail(email, "aluminiInvitation", mailSubject, mailMessage, fileName, fileType, null, function (emailError, emailResponse) {
                    if (!emailError) {
                        // appLogger.info("Successfully sent email on feedback invite to user %s. Status code: %s", student.email, emailResponse.statusCode);
                    } else {
                        // appLogger.error("Error feedback invite %s", student.email);
                         errorStudents.push(item);
                    }
                    processedStudents.push(item);

                    if (processedStudents.length == records.length) {
                        console.log("success");
                        getGroupMemberEmailID(query, subject, message, fileName, fileType, skipVal, skipCount, callback);
                    }
                })
            }, 200);
        });
    }
}


//Student
function getAlumniList(callback) {
    studentDao.getAll(callback);
}

function getFilterDetails(details, callback) {
    studentDao.getByQuery(details, callback);
}

function getStudentDetails(query, callback) {
    studentDao.getByQuery({ "rollNumber": query }, callback);
}

function getFilterDataList(query, callback) {
    studentDao.getAllDistinct(query, callback);
}

function getAlumniMemberDetail(Id, callback) {
    studentDao.getById(Id, callback);
}

function editAlumniMemberID(id, detailsToUpdate, callback) {
    studentDao.updateById(id, detailsToUpdate, function (err, res) {

        var updateGroupDetails = {
            'studentContactNo': detailsToUpdate.studentContactNo,
            'studentEmail': detailsToUpdate.studentEmail,
            'addressStreet': detailsToUpdate.contact.addressLine1 + ", " +
                detailsToUpdate.contact.addressLine2 + ", " +
                detailsToUpdate.contact.city + "-" +
                detailsToUpdate.contact.pincode + ", " +
                detailsToUpdate.contact.state + ", " +
                detailsToUpdate.contact.country + "."
        }

        alumniDao.updateMultiple({ 'rollNumber': detailsToUpdate.rollNumber }, updateGroupDetails, callback);

    });
}

///////////////////////myprofile
function createAlumni(recordToInsert, callback) {
    alumniDao.create(recordToInsert, callback);
}
function getAllAlumni(callback) {
    alumniDao.getAll(callback);
}
function updateAlumni(id, recordToEdit, callback) {
    alumniDao.updateById(id, recordToEdit, callback);
}
function deleteAlumni(id, callback) {
    alumniDao.remove(id, callback);
}

///////////////////jobs

function getEmailID(query, subject, message, fileName, fileType, callback) {
    var storeQuery = query;
    jobDao.getQuerySingleField({ "Email": { $in: query } }, function (err, result) {
        if (!err) {
            console.log(result);
            if (result != "") {
               // console.log("aa");
                replyMailToAlumini(query, subject, message, fileName, fileType, callback);
            }
            else {
                var dateTime = new Date();
                var alumniDetails = {
                    'Email': storeQuery,
                    'message': message,
                    'attachmentFileName': fileName,
                    'attachmentOriginalName': fileType,
                    'date': dateTime
                }
                emailDao.create(alumniDetails, function (err, res) {
                    callback(null, 'success');
                    return false;
                });
            }

        }
        else {
            console.log("erorr" + err);
        }

    });
}
function replyMailToAlumini(query, subject, message, fileName, fileType, callback) {
    var processedStudents = [];
    var errorStudents = [];
    var mailSubject = subject;
    var mailMessage = message;
    setTimeout(function () {
        var email = query;
        mailService.sendMail(email, "aluminiInviteFooter", mailSubject, mailMessage, fileName, fileType, function (emailError, emailResponse) {
            if (!emailError) {
                console.log("Successfully sent email on feedback invite to user %s. Status code: %s", email, emailResponse.statusCode);
                appLogger.info("Successfully sent email on feedback invite to user %s. Status code: %s", email, emailResponse.statusCode);
                callback(null,emailResponse);
            } else {
                // appLogger.error("Error feedback invite %s", student.email);
                errorStudents.push(email);
            }
            processedStudents.push(email);

            // if (processedStudents.length == records.length) {
            //     console.log("success");
            //     getEmailID(query, subject, message, fileName, fileType, callback);
            // }
        })
    }, 200);
};

function postJob(recordToInsert, callback) {
    recordToInsert.createdDate = new Date();
    jobDao.create(recordToInsert, callback);
}
function getAllJob(callback) {
    jobDao.getAll(callback);
}
function getJobById(id, callback) {
    jobDao.getById(id, callback);
}
function updateJob(id, recordToEdit, callback) {
    jobDao.updateById(id, recordToEdit, callback);
}
function deleteJob(id, callback) {
    jobDao.remove(id, callback);
}

////////////////News
function postNews(recordToInsert, callback) {
    recordToInsert.createdDate = new Date();
    newsDao.create(recordToInsert, callback);
}
function getAllNews(callback) {
    newsDao.getAll(callback);
}
function getNewsById(id, callback) {
    newsDao.getById(id, callback);
}
function updateNews(id, recordToEdit, callback) {
    recordToEdit.createdDate = new Date();
    newsDao.updateById(id, recordToEdit, callback);
}
function deleteNews(id, callback) {
    newsDao.remove(id, callback);
}
function removeDirtyAttachment(fileId, callback) {
    gridfsDao.dropAttachment(fileId, callback);
}

//////////////////Events
function postEvent(recordToInsert, callback) {
    eventDao.create(recordToInsert, callback);
}
function getAllEvent(callback) {
    eventDao.getAll(callback);
}
function updateEvent(id, recordToEdit, callback) {
    eventDao.updateById(id, recordToEdit, callback);
}
function deleteEvent(id, callback) {
    eventDao.remove(id, callback);
}
////////////////laudea-alumni event
function getAllAlumniEvent(callback) {
    eventDao.getAll(callback);
}
function getAlumniEventById(id, callback) {
    eventDao.getById(id, callback);
}
/////////bymap
function getAllStudentLoc(callback) {
    bymap.getAllStudentLoc(callback);
}
////////////get students
function getAllStudents(callback){
    studentsDao.getAllStudents(callback);
}

// function getAlumniByQuery(query,callback){
//     studentsDao.getByQuery(query,callback);
// }

////////////donation
function postDonation(recordToInsert, callback) {
    recordToInsert.createdDate = new Date();
    donationDao.create(recordToInsert, callback);
}
function getAllDonation(callback) {
    donationDao.getAll(callback);
}
function getDonationById(id, callback) {
    donationDao.getById(id, callback);
}
function updateDonation(id, recordToEdit, callback) {
    recordToEdit.createdDate = new Date();
    donationDao.updateById(id, recordToEdit, callback);
}
function deleteDonation(id, callback) {
    donationDao.remove(id, callback);
}
function removeDirtyAttachment(fileId, callback) {
    gridfsDao.dropAttachment(fileId, callback);
}

module.exports.getAllAlumniEvent = getAllAlumniEvent;
module.exports.getAllStudentLoc = getAllStudentLoc;
module.exports.createAlumni = createAlumni;
module.exports.getAllAlumni = getAllAlumni;
module.exports.updateAlumni = updateAlumni;
module.exports.deleteAlumni = deleteAlumni;

module.exports.postJob = postJob;
module.exports.updateJob = updateJob;
module.exports.getAllJob = getAllJob;
module.exports.deleteJob = deleteJob;
module.exports.getJobById = getJobById;
module.exports.getEmailID = getEmailID;

module.exports.postNews = postNews;
module.exports.updateNews = updateNews;
module.exports.getAllNews = getAllNews;
module.exports.getNewsById = getNewsById
module.exports.deleteNews = deleteNews;
module.exports.removeDirtyAttachment = removeDirtyAttachment;

module.exports.postEvent = postEvent;
module.exports.updateEvent = updateEvent;
module.exports.getAllEvent = getAllEvent;
module.exports.getAlumniEventById = getAlumniEventById;
module.exports.deleteEvent = deleteEvent;

module.exports.getAllStudents = getAllStudents;
// module.exports.getAlumniByQuery=getAlumniByQuery;
module.exports.postDonation= postDonation;
module.exports.updateDonation = updateDonation;
module.exports.getAllDonation = getAllDonation;
module.exports.getDonationById = getDonationById
module.exports.deleteDonation = deleteDonation;
module.exports.removeDirtyAttachment = removeDirtyAttachment;

module.exports.getAllList = getAllList;
module.exports.getAlumniMemberDetail = getAlumniMemberDetail;
module.exports.editAlumniMemberID = editAlumniMemberID;
module.exports.getGroupMemberEmailID = getGroupMemberEmailID;
module.exports.insertDetails = insertDetails;
module.exports.getGroupNames = getGroupNames;
module.exports.getFilterDataList = getFilterDataList;
module.exports.getStudentDetails = getStudentDetails;
module.exports.updateByQuery = updateByQuery;
module.exports.getDetails = getDetails;
module.exports.getDetail = getDetail;
module.exports.updateById = updateById;
module.exports.remove = remove;
module.exports.updateByRollNO = updateByRollNO;
module.exports.addGroupMembers = addGroupMembers;




//student
module.exports.getAlumniList = getAlumniList;
module.exports.getFilterDetails = getFilterDetails;
