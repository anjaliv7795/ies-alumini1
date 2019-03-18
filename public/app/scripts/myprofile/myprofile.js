(function () {
    'use strict';
    var App = angular.module('app');
    App.controller('myprofileCtrl', myprofileCtrl);
    myprofileCtrl.$inject = ['$scope', 'alumniService'];
    function myprofileCtrl($scope, alumniService) {
        $scope.newAlumni = {};
        $scope.alumniarr = [];
        $scope.dataMode = "EDIT";
        function loadInitial() {
            alumniService.getAllAlumni(function (err, res) {
                if (!err) {
                    $scope.alumniarr = res.data;
                }
            })
        }
        loadInitial();

        $scope.saveAlumni = function () {


            alumniService.createAlumni($scope.newAlumni, function (err, res) {
                if (!err) {
                    $scope.alumniarr.push($scope.newAlumni);
                    $('#alumniModal').modal("hide");
                }

            })
        }
        $scope.setEnvForEdit = function (alumni) {
            $scope.dataMode = "EDIT";
            $('#alumniModal').modal("show");
            $scope.newAlumni = JSON.parse(JSON.stringify(alumni));

        }
        // $scope.removeAlumni = function (index) {
        //     $scope.newAlumni.splice(index, 1);
        // }

        $scope.confirmModal = function (index) {
            $("#confirmModal").modal("show");
            $scope.deleteIndex = index;
        
        }
        $scope.deleteAlumniSure = function () {
            alumniService.deleteAlumni($scope.alumniarr[$scope.deleteIndex]._id, function (err, res) {
            })
           
            $scope.alumniarr.splice($scope.deleteIndex, 1);
            $("#confirmModal").modal('hide');
       
            }

        $scope.updateAlumni = function () {
            delete $scope.newAlumni.$$hashKey
            alumniService.updateAlumni($scope.newAlumni._id, $scope.newAlumni, function (err, res) {
                if (!err) {
                    var index = $scope.alumniarr.findIndex(function (data) {
                        return data._id == $scope.newAlumni._id;
                    });
                    $scope.alumniarr[index] = $scope.newAlumni;
                    //  $('#alumniModal').modal('hide');
                }
            });
        }
    };
})();


/*(function () {
    'use strict';
    var App = angular.module('app');
    App.controller('myprofileCtrl', ['$rootScope', '$scope', '$stateParams', '$timeout', '$http', '$localStorage', '$window', 'alumniService',
        function ($rootScope, $scope, $stateParams, $timeout, $http, $localStorage, $window, alumniService) {

            $scope.stateName = $stateParams.state;
            $scope.alumniId = $stateParams.alumni;
            $scope.getAlumniDetails = function ($event) {
                var rollNumber = $scope.group.rollNumber;
                if (rollNumber != "" && rollNumber != undefined && rollNumber != null) {
                    alumniService.getAlumniDetail(rollNumber, function (err, result) {
                        if (!err) {
                            $scope.alumniDetails = result.data[0];
                            if ($scope.alumniDetails != "" && $scope.alumniDetails != undefined && $scope.alumniDetails != null) {
                                $scope.group.alumniName = $scope.alumniDetails.Name;
                                $scope.group.Email = $scope.alumniDetails.Email;
                                //$scope.group.studentContactNo = $scope.studentDetails.studentContactNo;


                            } else {
                                $scope.group.Name = "";
                                $scope.group.Email = "";

                            }
                        }
                        else {
                            console.log("Error")
                        }
                    });

                }
            }
        }
    ]);
})();*/



/*
var app;
(function () {
    'use strict'; //Defines that JavaScript code should be executed in "strict mode"
    app = angular.module('app', []);
app.controller('myprofileCtrl', ['$scope', 'alumniService',

function ($scope, alumniService) {
    $scope.getAlumniDetails=function()
    {
        var apiRoute = baseUrl + 'getAlumniDetails/';
        var _student = alumniService.getAll(apiRoute);
        _student.then(function (response) {
            $scope.alumni = response.data;
        },
        function (error) {
            console.log("Error: " + error);
        });

    }
    $scope.getAlumniDetails();

}]);  */