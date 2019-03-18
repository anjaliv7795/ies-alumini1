(function () {
    'use strict';
    var App = angular.module('app');
    App.controller('groupMemberListCtrl', ['$rootScope', '$scope', '$filter', '$http', '$localStorage', '$window', 'alumniService',
        function ($rootScope, $scope, $filter, $http, $localStorage, $window, alumniService) {

            $scope.alumniDirectory = [];

            $scope.currentPage = 0;
            $scope.pageSize = 10;
            $scope.alumniDetails = [];
            $scope.searchGroupList = '';
            
            //Get Full Alumni List
            $scope.groupNameSelect =function(selectedItem){
                $scope.groupNameList = selectedItem;
                var groupName = $scope.groupNameList;

                alumniService.getAllAlumniDetails(groupName, function (err, result) {
                    if (!err) {
                        $scope.alumniDetails = result.data;

                        $scope.alumniDetail = $scope.alumniDetails;

                        //Tabel Pagination
                        $scope.getData = function () {
                            return $filter('filter')($scope.alumniDetails, $scope.searchGroupList)
                        }
                        $scope.numberOfPages=function(){
                            return Math.ceil($scope.getData().length/$scope.pageSize);
                        }
                        $scope.$watch('searchGroupList', function(newValue, oldValue){  
                            
                            $scope.alumniDetails = $filter('filter')($scope.alumniDetail, newValue);

                            if(oldValue!=newValue){
                                $scope.currentPage = 0;
                            }
                        },true);
                         
                    }
                    else{
                        console.log("Error")
                    }
                });
            }

            $scope.lastpage = function(){
              $scope.currentPage = Math.ceil($scope.getData().length/$scope.pageSize) - 1;
            }
            
            //Get Full Alumni List Group Name
            $scope.alumniGroupName = [];
            alumniService.getAllAlumniGroupName(function (err, result) {
                if (!err) {
                    result.data.forEach(function (record) {
                        $scope.alumniGroupName.push(record.groupName); 
                    });
                    $scope.groupNameList = $scope.alumniGroupName[0];
                    $scope.groupNameSelect($scope.groupNameList);
                }
                else{
                    console.log("Error");
                }
            });

            //Delete Group Member
            $scope.deleteMemberConfirm = function(id, groupname){
                angular.element('#deleteMemberConfirm').modal('show');
                $scope.groupMemberId = id;
                $scope.groupNames = groupname;
            }
            $scope.deleteGroupMember = function(id, groupname){
                var groupNameDelete = { 'groupName' : groupname };
                alumniService.removeGroupMember(id, groupNameDelete, function (err, result) {
                    angular.element('#deleteMemberConfirm').modal('hide');
                    if (!err) {
                        angular.element('#memberDeleteSuccessModal').modal('show');
                        $scope.groupNameList = $scope.alumniGroupName[0];
                        $scope.groupNameSelect($scope.groupNameList);
                    }
                    else{
                         console.log("Error");
                    }
                });
                return false;
            }
        }
    ]);
})();
