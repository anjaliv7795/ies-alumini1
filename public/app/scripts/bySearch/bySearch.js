// (function () {
//     'use strict';
//     var App = angular.module('app');
//     App.controller('studentCtrl', studentCtrl);
//     studentCtrl.$inject = ['$scope', 'alumniService'];
//     function studentCtrl($scope, alumniService) {
//         $scope.newStudent = {};
//         $scope.studentarr = [];
//         function loadInitialStudents() {
//             alumniService.getAllStudents(function (err, res) {
//                 if (!err) {
//                     $scope.studentarr = res.data;
//                 }
//             })
//         }
//         loadInitialStudents();
//     };
// })();