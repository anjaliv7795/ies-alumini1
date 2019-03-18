(function () {
    'use strict';
    var App = angular.module('app');
    App.controller('viewEventCtrl', viewEventCtrl);
    viewEventCtrl.$inject = ['$scope', 'alumniService', '$stateParams'];
    function viewEventCtrl($scope, alumniService, $stateParams) {
        $scope.newEvent = {};
        $scope.eventarr = [];
        $scope.dataMode = "ADD";
        alumniService.getAlumniEventById($stateParams.eventId, function (err, res) {
            $scope.eventarr = res.data;
        })
    }
})();