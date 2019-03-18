(function () {
    'use strict';
    var App = angular.module('app');
    App.controller('addMemberCtrl', ['$rootScope', '$scope', '$stateParams', '$timeout', '$http', '$localStorage', '$window', 'alumniService',
        function ($rootScope, $scope, $stateParams, $timeout, $http, $localStorage, $window, alumniService) {
            
            $scope.stateName = $stateParams.state;
            $scope.alumniId = $stateParams.alumni;

            
            //Edit Get Alumni List
            if($scope.alumniId != ""){
                alumniService.getAlumniList($scope.alumniId, function (err, result) {
                    if (!err) {
                       $scope.group = result.data;
                    }
                    else{
                        console.log("Error")
                    }
                });
            }

            //Get Full Alumni List Group Name
            $scope.alumniGroupName = [];
            alumniService.getAllAlumniGroupName(function (err, result) {
                if (!err) {
                    result.data.forEach(function (record) {
                        $scope.alumniGroupName.push(record.groupName); 
                    });
                }
                else{
                    console.log("Error")
                }
            });

            angular.element('.form-req .form-control').on('change',function(){
                var thisInput =  angular.element(this).val();
                if(thisInput != "" && thisInput != undefined){
                    angular.element(this).closest('.form-req').removeClass('group-error');
                }
            });
            //Add Alumni Group
            $scope.group = {};
            $scope.addAlumniGroup = function($event){
               
                if($scope.group.studentName != "" && $scope.group.studentEmail != "" && $scope.group.groupName != "" && $scope.group.studentName != undefined && $scope.group.studentEmail != undefined && $scope.group.groupName != undefined){
                   
                    //Button Disable
                    angular.element($event.target).attr('disabled', 'disabled');

                    if($scope.alumniId !=""){
                        var details = $scope.group;
                        console.log(details);
                        if(details.rollNumber){

                            var rollNoDetails = {
                                'studentContactNo' : details.studentContactNo,
                                'studentEmail' : details.studentEmail,
                                'addressStreet' : details.addressStreet
                            }
                            console.log(rollNoDetails);
                            alumniService.editAlumniListRollNo(details.rollNumber, rollNoDetails, function (err, result) {
                                if (!err) {
                                $scope.alertMessage = "Successfully updated";
                                angular.element('#confirmAlertModel').modal('show');
                                }
                                else{
                                    console.log("Error")
                                }
                            });
                        }else{
                            alumniService.editAlumniList($scope.alumniId, details, function (err, result) {
                                if (!err) {
                                $scope.alertMessage = "Successfully updated";
                                angular.element('#confirmAlertModel').modal('show');
                                }
                                else{
                                    console.log("Error")
                                }
                            });
                        }

                    }else{
                        alumniService.addAlumniList($scope.group, function (err, result) {
                            if (!err) {
                                if(result.data == "exists"){
                                    $scope.alertMessage = "Sorry! This Member Already Exists";
                                    angular.element('#confirmAlertModel').modal('show');
                                    angular.element('.btn-primary').removeAttr('disabled');
                                }else{
                                    $scope.alertMessage = "Successfully Added";
                                    angular.element('#confirmAlertModel').modal('show');
                                }
                            }
                            else{
                                console.log("Error")
                            }
                        });
                    }

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
            $scope.alertConfirmOk = function(){
                angular.element('#confirmAlertModel').modal('hide');
                $timeout(function(){
                    $window.location.href = '/alumni/#!/groupMembershipList';
                },250);
            }

            //Get Student Details
            $scope.getStudentDetails =function($event){
                var rollNumber = $scope.group.rollNumber;
                if(rollNumber != ""  && rollNumber != undefined && rollNumber != null){
                    alumniService.getStudentDetail(rollNumber, function (err, result) {
                        if (!err) {
                           $scope.studentDetails = result.data[0];
                           if($scope.studentDetails != "" && $scope.studentDetails != undefined && $scope.studentDetails != null){
                                $scope.group.studentName = $scope.studentDetails.studentName;
                                $scope.group.studentEmail = $scope.studentDetails.studentEmail;
                                $scope.group.studentContactNo = $scope.studentDetails.studentContactNo;
                                $scope.group.graduation = parseInt($scope.studentDetails.yearOfGraduation);
                                $scope.group.addressStreet =  
                                    $scope.studentDetails.contact.addressLine1+", "+
                                    $scope.studentDetails.contact.addressLine2+", "+
                                    $scope.studentDetails.contact.city+"-"+
                                    $scope.studentDetails.contact.pincode+", "+
                                    $scope.studentDetails.contact.state+", "+
                                    $scope.studentDetails.contact.country+".";
                           }else{
                                $scope.group.studentName = "";
                                $scope.group.studentEmail = "";
                                $scope.group.studentContactNo = "";
                                $scope.group.graduation = "";
                                $scope.group.addressStreet = ""; 
                           }
                        }
                        else{
                            console.log("Error")
                        }
                    });

                }
            }

        }
    ]);
})();