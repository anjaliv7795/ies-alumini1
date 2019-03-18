(function () {
    'use strict';
    var App = angular.module('app');
    App.controller('grouplistCtrl', ['$rootScope', '$scope', '$http', '$localStorage', '$window', '$timeout', 'alumniService',
        function ($rootScope, $scope, $http, $localStorage, $window, $timeout, alumniService) {
      
            //Get Full Alumni List Group Name
            $scope.alumniGroupName = [];
            function alumniGroupName(){
                alumniService.getAllAlumniGroupName(function (err, result) {
                    if (!err) {
                        $scope.alumniGroupName = result.data;
                    }
                    else{
                        console.log("Error")
                    }
                });
            }
            alumniGroupName();
            //Model Open
            $scope.modelOpen = function(){
                angular.element('#basic-modal').modal('show');
                $scope.groupName = "";
                $scope.notes = "";
                $scope.groupNameID = "";
            }

            //Add Group List
            $scope.addGroupName = function(){

                if($scope.groupName != "" && $scope.groupName != " " && $scope.groupName != undefined && $scope.groupName != null){
                    angular.element('#groupName').removeClass('group-error');
                    var details = {'groupName' : $scope.groupName , 
                                        'note' : $scope.notes,
                                        'userName' : $rootScope.Auth.tokenParsed.preferred_username,
                                        'userFullName' : $rootScope.Auth.tokenParsed.given_name,
                                        'date' : new Date()
                                    }

                    if($scope.groupNameID != "" && $scope.groupNameID != " " && $scope.groupNameID != null && $scope.groupNameID != undefined ){
                        alumniService.editGroupName($scope.groupNameID, details, function (err, result) {
                            if (!err) {
                                $scope.groupName = "";
                                $scope.notes = "";
                                $scope.groupNameID = "";
                                angular.element('#basic-modal').modal('hide');
                                $scope.groupNameSuccessUpdateMsg = true;
                                alumniGroupName();
                                $timeout(function(){
                                    $scope.groupNameSuccessUpdateMsg = false;
                                },2500);
                            }
                            else{
                                console.log("Error")
                            }
                        });
                    }else{
                        var detailss = {'groupName' : $scope.groupName , 
                                            'note' : $scope.notes,
                                            'userName' : $rootScope.Auth.tokenParsed.preferred_username,
                                            'userFullName' : $rootScope.Auth.tokenParsed.given_name,
                                            'date' : new Date(), 
                                            'groupMemberCount' : 0 
                                        }
                        alumniService.addGroupName(detailss,function (err, result) {
                            if (!err) {
                                $scope.groupName = "";
                                $scope.notes = "";
                                $scope.groupNameID = "";
                                angular.element('#basic-modal').modal('hide');
                                alumniGroupName();
                                $scope.groupNameSuccessMsg = true;
                                $timeout(function(){
                                    $scope.groupNameSuccessMsg = false;
                                },2500);
                            }
                            else{
                                console.log("Error")
                            }
                        });
                    }


                }else{
                    angular.element('#groupName').addClass('group-error');
                }
            }


            //Edit Group List
            $scope.groupNameEdit =function(id, notes, groupname){
                angular.element('#basic-modal').modal('show');
                $scope.groupName = groupname;
                $scope.notes = notes;
                $scope.groupNameID = id;
            }


        }
    ]);
})();