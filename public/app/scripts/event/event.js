(function () {
    'use strict';
    var App = angular.module('app');
    App.controller('alumnieventCtrl', alumnieventCtrl);
    alumnieventCtrl.$inject = ['$scope', 'alumniService'];
    function alumnieventCtrl($scope, alumniService) {
        $scope.newEvent = {};
        $scope.eventarr = [];
        function loadInitialAlumnievent() {
            alumniService.getAllAlumniEvent(function (err, res) {
                if (!err) {
                    $scope.eventarr = res.data;
                }
            })
        }
        loadInitialAlumnievent();
    };
})();