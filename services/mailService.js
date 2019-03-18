var emailService = require('../email/sendgridmail');
var appLogger = require('../logging/appLogger');

module.exports.sendMail = function (query,mailType, mailSubject, mailMessage, fileName, fileType,  callback) {
    emailService.mail(query,mailType, mailSubject, mailMessage,  fileName, fileType, function (emailError, emailResponse) {
        if (!emailError) {
            console.log("Successfully sent email to user %s. Status code: %s", query, emailResponse.statusCode);
            appLogger.info("Successfully sent email to user %s. Status code: %s", query, emailResponse.statusCode);
            callback(null,emailResponse);
        } else {
            console.error("Error %s", emailError);
            appLogger.info("Error %s", emailError);
            callback(emailError,null);
        }
    });
}