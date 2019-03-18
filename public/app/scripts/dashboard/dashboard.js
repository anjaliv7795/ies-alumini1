(function () {
    'use strict';
    var App = angular.module('app');
    App.controller('dashboardCtrl', ['$rootScope', '$scope', '$compile', '$filter', '$http', '$localStorage', '$window', 'alumniService',
        function ($rootScope, $scope, $compile, $filter, $http, $localStorage, $window, alumniService) {

            $scope.currentPage = 0;
            $scope.pageSize = 10;
            $scope.studentDetails = [];
            $scope.dataList = [];
            $scope.searchBox = '';
    
            //Filter Data
            alumniService.getGraduationYearList(function (err, result) {
                if (!err) {
                    $scope.graduationYear = result.data;
                }
            });
            alumniService.getDegreeList(function (err, result) {
                if (!err) {
                    $scope.degrees = result.data;
                }
            });
            alumniService.getDepartmentList(function (err, result) {
                if (!err) {
                    $scope.departments = result.data;
                }
            });
            alumniService.getLocationList(function (err, result) {
                if (!err) {
                    $scope.locations = result.data;
                }
            });

            //Common Function Get Filter Result
            function getResult(dataList, contact){
                $scope.studentDetails = [];
                if(dataList.yearOfGraduation == undefined && dataList.degreeName == undefined && dataList.branchName == undefined && contact == undefined){
                    $scope.studentDetails = [];
                }else{
                    alumniService.getFilterLists(dataList, function (err, result) {
                        if (!err) {
                            result.data.forEach(function(record) {
                                $scope.studentDetails.push(record);
                            });

                            $scope.studentDetail = $scope.studentDetails;

                             //Tabel Pagination
                                $scope.getData = function () {
                                    return $filter('filter')($scope.studentDetails, $scope.searchGroupList)
                                }
                                $scope.numberOfPages=function(){
                                    return Math.ceil($scope.getData().length/$scope.pageSize);
                                }
                                $scope.$watch('searchGroupList', function(newValue, oldValue){  
                                    
                                    $scope.studentDetails = $filter('filter')($scope.studentDetail, newValue);

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
            }

            $scope.lastpage = function(){
                $scope.currentPage = Math.ceil($scope.getData().length/$scope.pageSize) - 1;
            }

            //*************** Table Filter ******************//
            $scope.yearDataList = [];
            $scope.degreeDataList = [];
            $scope.branchDataList = [];
            $scope.locationDataList = [];
            $scope.selectYear = "";
            $scope.selectDegree = "";
            $scope.selectBranch = "";
            $scope.selectLocation = "";
           
            $scope.filterSelect = function(list, active, dataType){

                if (active){
                    if(dataType == "dataYear"){
                       $scope.yearDataList.push(list);
                       $scope.selectYear = $scope.yearDataList;
                       $scope.yearSelectedShow = true;
                    }else if(dataType == "dataDegree"){  
                        $scope.degreeDataList.push(list);
                        $scope.selectDegree = $scope.degreeDataList;
                        $scope.degreeSelectedShow = true;
                    }else if(dataType == "dataBranch"){
                        $scope.branchDataList.push(list);
                        $scope.selectBranch = $scope.branchDataList;
                        $scope.branchSelectedShow = true;
                    }else if(dataType == "dataLocation"){
                        $scope.locationDataList.push(list);
                        $scope.selectLocation = $scope.locationDataList;
                        $scope.locationSelectedShow = true;
                    } 

                    //If Condition For Value Empty 
                    if($scope.selectYear != ""){
                        var filterYear = { $in: $scope.selectYear }
                    }
                    if($scope.selectDegree != ""){
                        var filterDegree = { $in: $scope.selectDegree }
                    }
                    if($scope.selectBranch != ""){
                        var filterBranch = { $in: $scope.selectBranch }
                    }
                    if($scope.selectLocation != ""){
                        var filterLocation = { $in: $scope.selectLocation }
                    }
                    $scope.dataList =  $scope.dataList = {"yearOfGraduation" : filterYear , "degreeName" : filterDegree, "branchName" : filterBranch, "contact.city" : filterLocation };
                    //Call Common Function
                    getResult($scope.dataList, filterLocation);

                } else{
                    
                    if(dataType == "dataYear"){
                        if(list == 'clearAll'){
                            $scope.yearDataList = [];
                        }
                       $scope.yearDataList.splice($scope.yearDataList.indexOf(list), 1);
                       $scope.selectYear = $scope.yearDataList;
                    }else if(dataType == "dataDegree"){
                        if(list == 'clearAll'){
                            $scope.degreeDataList = [];
                        }
                        $scope.degreeDataList.splice($scope.degreeDataList.indexOf(list), 1);
                        $scope.selectDegree = $scope.degreeDataList;
                    }else if(dataType == "dataBranch"){
                        if(list == 'clearAll'){
                            $scope.branchDataList = [];
                        }
                        $scope.branchDataList.splice($scope.branchDataList.indexOf(list), 1);
                        $scope.selectBranch = $scope.branchDataList;
                    }else if(dataType == "dataLocation"){
                        if(list == 'clearAll'){
                            $scope.locationDataList = [];
                        }
                        $scope.locationDataList.splice($scope.locationDataList.indexOf(list), 1);
                        $scope.selectLocation = $scope.locationDataList;
                    } 

                    //If Condition For Value Empty 
                    if($scope.selectYear != ""){
                        var filterYear = { $in: $scope.selectYear }
                    }
                    if($scope.selectDegree != ""){
                        var filterDegree = { $in: $scope.selectDegree }
                    }
                    if($scope.selectBranch != ""){
                        var filterBranch = { $in: $scope.selectBranch }
                    }
                    if($scope.selectLocation != ""){
                        var filterLocation = { $in: $scope.selectLocation }
                    }
                    $scope.dataList =  $scope.dataList = {"yearOfGraduation" : filterYear , "degreeName" : filterDegree, "branchName" : filterBranch, "contact.city" : filterLocation };
                    //Call Common Function
                    getResult($scope.dataList, filterLocation);

                }
              
                if($scope.dataList == ""){
                     $scope.yearSelectedShow = false;
                     $scope.degreeSelectedShow = false;
                     $scope.branchSelectedShow = false;
                     $scope.locationSelectedShow = false;
                }
            }

            //*************** End Table Filter ******************//
            
            /*** Clear All Function ***/
            $scope.yearActive = [];
            $scope.degreeActive = [];
            $scope.branchActive = [];
            $scope.locationActive = [];
            $scope.clearAllFilter = function(dataType){
                if(dataType == "clearYear"){
                    $scope.selectYear = "";
                    $scope.yearActive = [];
                    $scope.filterSelect('clearAll', false, 'dataYear');
                    $scope.yearSelectedShow = false;
                }else if(dataType == "clearDegree"){
                    $scope.selectDegree = "";
                    $scope.degreeActive = [];
                    $scope.filterSelect('clearAll', false, 'dataDegree');
                    $scope.degreeSelectedShow = false;
                }else if(dataType == "clearBranch"){
                    $scope.selectBranch = "";
                    $scope.branchActive = [];
                    $scope.filterSelect('clearAll', false, 'dataBranch');
                    $scope.branchSelectedShow = false;
                }else if(dataType == "clearLocation"){
                    $scope.selectLocation = "";
                    $scope.locationActive = [];
                    $scope.filterSelect('clearAll', false, 'dataLocation');
                    $scope.locationSelectedShow = false;
                }
            }


            //Single Filter Clear
            $scope.singleClearFilter = function(dataType, data, event){
                //console.log(data);
                //return false;
                var dataTypeCount = angular.element(event.currentTarget).parent().parent().children('span').length;
                if(dataType == "clearYear"){
                    $scope.yearActive[data] = [];
                    $scope.filterSelect(data, false, 'dataYear');
                    if(dataTypeCount == 1){
                        $scope.yearSelectedShow = false; 
                    }
                }else if(dataType == "clearDegree"){
                    $scope.degreeActive[data] = [];
                    $scope.filterSelect(data, false, 'dataDegree');
                    if(dataTypeCount == 1){
                        $scope.degreeSelectedShow = false; 
                    }
                }else if(dataType == "clearBranch"){
                    $scope.branchActive[data] = [];
                    $scope.filterSelect(data, false, 'dataBranch');
                    if(dataTypeCount == 1){
                        $scope.branchSelectedShow = false; 
                    }
                }else if(dataType == "clearLocation"){
                    $scope.locationActive[data] = [];
                    $scope.filterSelect(data, false, 'dataLocation');
                    if(dataTypeCount == 1){
                        $scope.locationSelectedShow = false; 
                    }
                }
            }

           


            //*************** End Table Filter ******************//

            alumniService.getStudentDetails(function (err, result) {
                if (!err) {
                   // $scope.studentDetails = result.data;

                    //console.log($scope.studentDetails);

                    //Tabel Pagination
                    $scope.getData = function () {
                        return $filter('filter')($scope.studentDetails, $scope.q)
                    }
                    $scope.numberOfPages=function(){
                        return Math.ceil($scope.getData().length/$scope.pageSize);
                    }
                    $scope.$watch('searchBox', function(newValue,oldValue){  
                        if(oldValue!=newValue){
                            $scope.currentPage = 0;
                        }
                    },true);
                    
                }
                else{
                    console.log("Error")
                }
            });


            //Edit Alumni Member 
            


        }
    ]);
})();





