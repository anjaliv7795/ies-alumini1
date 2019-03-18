var sendsmsDao = require('../daos/sendsmsDao');
var appLogger = require('../logging/appLogger');
function getAllList(callback){
    sendsmsDao.getAll(callback);
}
function getAllListById(id,callback){
    sendsmsDao.getByQuery(id,callback);
}
function insertDetails(details,callback){
    sendsmsDao.create(details,callback);
}
function remove(query,callback){
    sendsmsDao.removeByQuery(query,callback);
}
module.exports.getAllList = getAllList;
module.exports.insertDetails = insertDetails;
module.exports.getAllListById = getAllListById;
module.exports.remove = remove;