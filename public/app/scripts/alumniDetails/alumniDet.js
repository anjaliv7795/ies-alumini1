(function () {
    'use strict';
    var App = angular.module('app');
    App.controller('studentCtrl', studentCtrl);
    studentCtrl.$inject = ['$scope', 'alumniService', '$timeout'];
    function studentCtrl($scope, alumniService, $timeout) {
        $scope.newStudent = {};
        $scope.studentarr = [];
        $scope.newDept = [];
        $scope.allData = [];
        function loadInitialStudents() {
            alumniService.getAllStudents(function (err, res) {
                if (!err) {
                    $scope.studentarr = res.data;
                    $scope.allData = res.data;
                    // $scope.newDept = unique("degreeName");
                    $('#dropouts-table').DataTable().clear();
                    $('#dropouts-table').DataTable().destroy();
                    $timeout(function () {
                        $('#dropouts-table').DataTable({
                            "aoColumnDefs": [{ "bSortable": false, "aTargets": [0] }]
                        });
                    }, 50);
                }
            })
        }
        loadInitialStudents();



        // function unique(key) {
        //     var newArr = [];
        //     console.log(allData);
        //     var origLen = $scope.allData.length;
        //     var found;
        //     var x;
        //     var y;
        //     for (x = 0; x < origLen; x++) {
        //         found = undefined;
        //         for (y = 0; y < newArr.length; y++) {
        //             if ($scope.allData[x][key] === newArr[y][key]) {
        //                 found = true;
        //                 break;
        //             }
        //         }
        //         if (!found) {
        //             newArr.push($scope.allData[x]);
        //         }
        //     }
        //     return newArr;
        // }

        // $scope.alumniFilter = function () {
        //     var query = {};
        //     if ($scope.item["degreeName"]) {
        //         query["degreeName"] = $scope.item["degreeName"]["departmentName"];
        //     }
        //     if ($scope.item["studentName"]) {
        //         query["studentName"] = $scope.item["studentName"]["studentName"];
        //     }
        //     if ($scope.item["rollNumber"]) {
        //         query["rollNumber"] = $scope.item["rollNumber"]["rollNumber"];
        //     }
        //     if ($scope.item["branchName"]) {
        //         query["branchName"] = $scope.item["branchName"]["branchName"];
        //     }
        //     if ($scope.item["currentSem"]) {
        //         query["currentSem"] = $scope.item["currentSem"]["currentSem"];
        //     }
        //     if ($scope.item["fromDate"]) {
        //         query["assetPurchaseDate"] = { $gte: $scope.item["fromDate"] };
        //     }
        //     if ($scope.item["endDate"]) {
        //         query["assetPurchaseDate"] = { $lte: $scope.item["endDate"] };
        //     }
        //     alumniService.getAlumniByQuery(query, function (err, res) {
        //         if (!err) {
        //             $scope.studentarr = res;
        //         }
        //         else {
        //             console.log(err);
        //         }

        //     });
        // }
    }
})();