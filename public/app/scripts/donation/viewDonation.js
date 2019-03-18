(function () {
    'use strict';
    var App = angular.module('app');
    App.controller('viewDonationCtrl', viewDonationCtrl);
    viewDonationCtrl.$inject = ['$scope', 'alumniService', '$stateParams'];
    function viewDonationCtrl($scope, alumniService, $stateParams) {
        // alert("Welcome to view");
        $scope.newDonation = {};
        $scope.donationarr = [];
        $scope.dataMode = "ADD";
        //$scope.alumniMemberId = $stateParams.alumniID;
        alumniService.getDonationById($stateParams.donationId, function (err, res) {
            $scope.donationarr = res.data;
            $scope.donationarr.createdDate = moment(res.data.createdDate).format('DD/MM/YYYY,h:mm:ss a');
        })
    }
})();