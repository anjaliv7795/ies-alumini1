var alumniGroupDao = require('../daos/alumniGroupNameDao');
var alumniDao = require('../daos/alumniDao');
var gridfsDao = require('../daos/gridfsDao');
var appLogger = require('../logging/appLogger');

function getAllList(callback) {
    alumniGroupDao.getAll(callback);
}

function insertDetails(details, callback) {
    alumniGroupDao.create(details, callback);
}

function getGroupNames(callback) {
    var query = {};
    //var field= ['groupName'];
    alumniGroupDao.getByQuery(query,callback);
    
}

function getDetails(name, callback) {
    alumniGroupDao.getByQuery({ hostelName: name }, callback);
}

function getDetail(Id, callback) {
    alumniGroupDao.getById(Id, callback);
}
function updateByQuery(query, query2, callback) {
    alumniGroupDao.update(query, query2, callback);
}

function updateById(id, detailsToUpdate, callback){
    
    alumniGroupDao.getById(id, function(err, result){
        if(!err){
            var query = {'groupName' : result.groupName};
            var query2 = {'groupName' : detailsToUpdate.groupName};
            alumniGroupDao.updateById(id, detailsToUpdate, function(err, result){
                if(!err){
                    alumniDao.updateMultiple(query, query2, callback);
                }
            });
        }
    });
  
}

module.exports.getAllList = getAllList;
module.exports.insertDetails = insertDetails;
module.exports.getGroupNames = getGroupNames;
module.exports.updateByQuery = updateByQuery;
module.exports.getDetails = getDetails;
module.exports.getDetail = getDetail;
module.exports.updateById = updateById;



