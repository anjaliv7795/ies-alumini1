(function () {
    'use strict';
    var App = angular.module('app');
    App.controller('addMembersExcelSheetCtrl', ['$rootScope', '$scope', '$stateParams', '$timeout', '$http', '$localStorage', '$window', 'alumniService',
        function ($rootScope, $scope, $stateParams, $timeout, $http, $localStorage, $window, alumniService) {
            
          
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

            angular.element('.form-req .form-controls').on('change',function(){
                var thisInput =  angular.element(this).val();
                if(thisInput != "" && thisInput != undefined){
                    angular.element(this).closest('.form-req').removeClass('group-error');
                }
            });

            //Add Alumni Group
            $scope.addAlumniMembers = function($event){
               
                if($scope.groupName != "" && $scope.myFile != "" && $scope.groupName != undefined && $scope.myFile != undefined){
                   
                    if($scope.myFile[0].type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
                        //Button Disable
                        angular.element($event.target).attr('disabled', 'disabled');

                        var fd = new FormData();
                        for( var k=0;  k < $scope.myFile.length;  k++) {
                            fd.append("file", $scope.myFile[k]);   
                        }; 
                        
                        alumniService.addAlumniMembers(fd, $scope.groupName, function (err, result) {
                            console.log(err);
                            if (!err) {
                                $scope.alertMessage = "Successfully updated";
                                angular.element('#confirmAlertModel').modal('show');
                            }
                            else{
                                console.log("Error")
                            }
                        });  
                    }else{
                        angular.element("input[type='file']").val(null);
                        angular.element('#errorAlertModel').modal('show');
                    }
                }else{

                    angular.element.each($('.form-controls.required'),function(){
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

           

        }
    ]);
})();