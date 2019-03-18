(function () {
    'use strict';
    var App = angular.module('app');
    App.controller('editAlumniCtrl', ['$rootScope', '$scope', '$stateParams', '$timeout', '$compile', '$filter', '$http', '$localStorage', '$window', 'alumniService',
        function ($rootScope, $scope, $stateParams,  $timeout, $compile, $filter,  $http, $localStorage, $window, alumniService) {

            $scope.alumniMemberId = $stateParams.alumniID;

            if($scope.alumniMemberId != ""){
                alumniService.getAlumniMember($scope.alumniMemberId, function (err, result) {
                    if (!err) {
                       $scope.group = result.data;
                       console.log($scope.group);
                    }
                    else{
                        console.log("Error")
                    }
                });
            }


            $scope.editAlumniMemeber = function($event){
                if($scope.group.studentContactNo != "" && $scope.group.studentEmail != "" &&  $scope.group.studentContactNo != undefined && $scope.group.studentEmail != undefined){
                     //Button Disable
                     angular.element($event.target).attr('disabled', 'disabled');

                     var details = $scope.group;
                        alumniService.editAlumniMember($scope.alumniMemberId, details, function (err, result) {
                            if (!err) {
                               angular.element('#confirmAlertModel').modal('show');
                               $scope.alertMessage = "Successfully updated";
                            }
                            else{
                                console.log("Error")
                            }
                        });

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
                    $window.location.href = '/alumni/#!/home';
                },250);
            }

        }
    ]);
})();





