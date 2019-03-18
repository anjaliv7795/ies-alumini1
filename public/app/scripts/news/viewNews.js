(function () {
    'use strict';
    var App = angular.module('app');
    App.controller('viewNewsCtrl', viewNewsCtrl);
    viewNewsCtrl.$inject = ['$scope', 'alumniService', '$stateParams'];
    function viewNewsCtrl($scope, alumniService, $stateParams) {
        // alert("Welcome to view");
        $scope.newNews = {};
        $scope.newsarr = [];
        $scope.dataMode = "ADD";
        //$scope.alumniMemberId = $stateParams.alumniID;
        alumniService.getNewsById($stateParams.newsId, function (err, res) {
            $scope.newsarr = res.data;
            $scope.newsarr.createdDate = moment(res.data.createdDate).format('DD/MM/YYYY,h:mm:ss a');
        })
    }
})();