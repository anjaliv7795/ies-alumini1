(function () {
    'use strict';
    var App = angular.module('app');
    App.controller('eventCtrl', eventCtrl);
    eventCtrl.$inject = ['$scope', 'alumniService'];
    function eventCtrl($scope, alumniService) {
        $scope.newEvent = {};
        $scope.eventarr = [];
        $scope.dataMode = "ADD";
        $scope.dateOpts1 = {
            dateFormat: 'd-m-y',
        };
        function loadInitialevent() {
            alumniService.getAllEvent(function (err, res) {
                if (!err) {
                    $scope.eventarr = res.data;
                }
            })
        }
        loadInitialevent();
        $scope.saveEvent = function () {
            alumniService.postEvent($scope.newEvent, function (err, res) {
                if (!err) {
                    $scope.eventarr.push($scope.newEvent);
                    $('#eventModal').modal("hide");
                }

            })
        }
    };
})();
 