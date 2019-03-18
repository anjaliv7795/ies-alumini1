(function () {
    'use strict';
    var App = angular.module('app');
    App.controller('viewJobCtrl', viewJobCtrl);
    viewJobCtrl.$inject = ['$scope', 'alumniService', '$stateParams'];


    function viewJobCtrl($scope, alumniService, $stateParams) {
        $scope.newJob = {};
        $scope.jobarr = [];
        $scope.dataMode = "ADD";
        //$scope.alumniMemberId = $stateParams.alumniID;
        alumniService.getJobById($stateParams.jobId, function (err, res) {
            $scope.jobarr = res.data;
        })

        //email

        // $scope.sendEmail = function ($event) {
        //     alumniService.sendEmail($scope.newJob, function (err, res) {
        //         if (!err) {
        //            "Email Sent Successfully"
        //         }

        //     })
        // }


        // alumniService.getEmail($scope.newJob, function (err, result) {
        //     console.log(err);
        //     if (!err) {
        //         $scope.emailOverlayLoder = false;
        //         $scope.alertMessage = "Email Sent Successfully";
        //         angular.element('#confirmAlertModel').modal('show');
        //      }
        //      else{
        //          console.log("Error")
        //      }
        // });
        // $scope.selectGrroupName = [];
        $scope.newJob = {};
        $scope.newJob.attachFileName = [];
        $scope.newJob.attachOriginalName = [];
        $scope.newJob.filesHTML = [];
        $scope.sendEmail = function ($event) {
            console.log("ap");
            if ($scope.newJob.emailSubject != "" && $scope.newJob.emailMessage != "" && $scope.newJob.emailSubject != undefined && $scope.newJob.emailMessage != undefined) {
                angular.element('#confirmEmailSend').modal('show');
            }
            else {
                angular.element.each($('.form-control.required'), function () {
                    var validationInput = angular.element(this).val();
                    if (validationInput != "" && validationInput != undefined) {
                        angular.element(this).parent().removeClass('group-error');
                    } else {
                        angular.element(this).parent().addClass('group-error');
                    }
                });
            }
        }
        $scope.sendEmailConfirm = function () {
            //Button Disable
            angular.element('#submitButton').attr('disabled', 'disabled');
            angular.element('#confirmEmailSend').modal('hide');
            // for(var i=0; i < $scope.group.groupSelected.length; i++){
            //     $scope.selectGrroupName.push($scope.group.groupSelected[i].groupName);
            // }
            //$scope.group.selectGrroupNames = $scope.selectGrroupName;
            if ($scope.myFile) {
                var file = $scope.myFile;
                var fd = new FormData();
                for (var k = 0; k < $scope.myFile.length; k++) {
                    fd.append("file", $scope.myFile[k]);
                };
                $scope.newJob.fileName = $scope.myFile.name;
                $scope.newJob.fileType = $scope.myFile.type;
                // $scope.emailOverlayLoder = true; 
                alumniService.uploadFileToFolder(fd, function (err, result) {
                    for (var z = 0; z < result.data.length; z++) {
                        var filename = result.data[z].filename;
                        var originalname = result.data[z].originalname;
                        $scope.newJob.attachFileName.push(filename);
                        $scope.newJob.attachOriginalName.push(originalname);
                        $scope.newJob.filesHTML.push("<br> <a href='http://cdn.psgcas.ac.in/alumni/attachments/" + filename + "'>" + originalname + "</a> ")
                    }
                    if (!err) {
                        alumniService.getEmail($scope.newJob, function (err, result) {
                            console.log("Something");
                            if (!err) {
                                $scope.emailOverlayLoder = false;
                                alert("Email Sent Successfully");
                                angular.element('#confirmAlertModel').modal('show');
                            }
                            else {
                                console.log(err);
                            }
                        });
                    }
                });
            } else {
                $scope.emailOverlayLoder = true;
                $scope.newJob.filesHTML = "false"
                alumniService.getEmail($scope.newJob, function (err, result) {
                    if (!err) {
                        $scope.emailOverlayLoder = false;
                        $scope.alertMessage = "Email Sent Successfully";
                        angular.element('#confirmAlertModel').modal('show');
                    }
                    else {
                        console.log("Error")
                    }
                });
            }
        }
        $scope.alertConfirmOk = function () {
            angular.element('#confirmAlertModel').modal('hide');
            $timeout(function () {
                $window.location.href = '/alumni/#!/home';
            }, 250);
        }
    }
})();
App.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files);
                });
            });
        }
    };
}]);

