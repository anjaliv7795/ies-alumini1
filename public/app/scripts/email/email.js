(function () {
    'use strict';
    var App = angular.module('app');
    App.controller('emailCtrl', ['$rootScope', '$scope', '$timeout', '$compile', '$filter', '$http', '$localStorage', '$window', 'alumniService',
        function ($rootScope, $scope, $timeout, $compile, $filter, $http, $localStorage, $window, alumniService) {

            //Get Full Alumni List Group Name
            $scope.groupName = {};
            $scope.group = {};
            alumniService.getAllAlumniGroupName(function (err, result) {
                if (!err) {
                    $scope.groupMember =  result.data;
                }
                else{
                    console.log("Error")
                }
            });

            $scope.tinymceOptions = { 
                statusbar: false
            };

            $scope.selectGrroupName = [];
            $scope.group.attachFileName = [];
            $scope.group.attachOriginalName= [];
            $scope.group.filesHTML = [];

            //Email Send Function
            $scope.sendEmail = function($event){

                if($scope.group.groupSelected != "" && $scope.group.groupSelected != undefined){
                    angular.element('.ui-select-required').removeClass('group-error');
                }else{
                    angular.element('.ui-select-required').addClass('group-error');
                }
                
                if($scope.group.emailSubject != "" && $scope.group.emailMessage != "" && $scope.group.emailSubject != undefined && $scope.group.emailMessage != undefined && $scope.group.groupSelected.length != undefined){
                    
                  

                    angular.element('#confirmEmailSend').modal('show');

                }else{

                    angular.element.each($('.form-control.required'),function(){
                        var validationInput =  angular.element(this).val();
                        if(validationInput !="" && validationInput != undefined){
                            angular.element(this).parent().removeClass('group-error');
                        }else{
                            angular.element(this).parent().addClass('group-error');
                        }
                        
                    });

                }
              
            }


            $scope.sendEmailConfirm = function(){
                  
                //Button Disable
                angular.element('#submitButton').attr('disabled', 'disabled');

                angular.element('#confirmEmailSend').modal('hide');

                for(var i=0; i < $scope.group.groupSelected.length; i++){
                    $scope.selectGrroupName.push($scope.group.groupSelected[i].groupName);
                }

                $scope.group.selectGrroupNames = $scope.selectGrroupName;

                if($scope.myFile){
                    var file = $scope.myFile;
                    var fd = new FormData();
                    for( var k=0;  k < $scope.myFile.length;  k++) {
                        fd.append("file", $scope.myFile[k]);   
                    };

                    $scope.group.fileName = $scope.myFile.name;
                    $scope.group.fileType = $scope.myFile.type;
                    $scope.emailOverlayLoder = true; 
                    
                    alumniService.uploadFileToFolder(fd, function (err, result) {
                        for(var z=0; z < result.data.length; z++){
                            var filename = result.data[z].filename;
                            var originalname = result.data[z].originalname;
                            
                            $scope.group.attachFileName.push(filename);
                            $scope.group.attachOriginalName.push(originalname);
                            $scope.group.filesHTML.push("<br> <a href='http://cdn.psgcas.ac.in/alumni/attachments/"+filename+"'>"+originalname+"</a> ")
                        }

                        if(!err){  
                            alumniService.getGroupMemberEmail($scope.group, function (err, result) {
                                console.log(err);
                                if (!err) {
                                    $scope.emailOverlayLoder = false;
                                    $scope.alertMessage = "Email Sent Successfully";
                                    angular.element('#confirmAlertModel').modal('show');
                                 }
                                 else{
                                     console.log("Error")
                                 }
                            });
                        }
                    });
                }else{
                    $scope.emailOverlayLoder = true;
                    $scope.group.filesHTML = "false"
                    alumniService.getGroupMemberEmail($scope.group, function (err, result) { 
                        if (!err) {
                            $scope.emailOverlayLoder = false;
                            $scope.alertMessage = "Email Sent Successfully";
                            angular.element('#confirmAlertModel').modal('show');
                         }
                         else{
                             console.log("Error")
                         }
                    });
                }

            }


            $scope.alertConfirmOk = function(){
                angular.element('#confirmAlertModel').modal('hide');
                $timeout(function(){
                    $window.location.href = '/alumni/#!/home';
                },250);
            }

        }
    ]);
})();
 
App.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
    
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files);
                });
            });
        }
    };
 }]);



 







