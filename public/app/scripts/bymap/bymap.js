(function () {
    'use strict';
    var App = angular.module('app');
    App.controller('alumniMapCtrl', ['$scope', '$rootScope', '$window', '$timeout',
        function ($scope, $rootScope, $window, $timeout) {
//            alert("asdfg");
            var addressPoints = [
                [20.5937, 78.9629, 250, 'India'],
                [17.123184, 79.208824, 25, 'Telangana, India'],
                [23.473324, 77.947998, 10, 'Madhya Pradesh, India'],
                [29.238478, 76.431885, 35, 'Haryana, India'],
                [21.295132, 81.828232, 20, 'Chhattisgarh, India'],
                [25.794033, 78.116531, 46, 'Bhitarwar, Madhya Pradesh, India'],
                [23.745127, 91.746826, 22, 'Tripura, India'],
                [17.874857, 78.100815, 11, 'Chandoor, Telangana, India'],
                [15.317277, 75.71389, 44, 'Karnataka, India'],
                [10.850516, 76.27108, 29, 'Kerala, India'],
                [28.207609, 79.82666, 12, 'Uttar Pradesh, India'],
                [26.244156, 92.537842, 30, 'Assam, India'],
                [19.66328, 75.300293, 34, 'Maharashtra, India'],
                [11.127123, 78.656891, 21, 'Tamil Nadu, India'],
                [22.978624, 87.747803, 12, 'West Bengal, India'],
                [22.309425, 72.13623, 17, 'Gujarat, India'],
                [20.94092, 84.803467, 13, 'Odisha, India'],
                [27.391277, 73.432617, 23, 'Rajasthan, India'],
                [32.084206, 77.571167, 27, 'Himachal Pradesh, India'],
                [10.45, 77.34, 25, "Dharapuram"]

            ];


            // var tiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            //     maxZoom: 18,
            //     noWrap: true, 
            //     worldCopyJump: true,
            //     inertia: false
            // });


            var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 18,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Points &copy 2012 LINZ'
            }),

                latlng = L.latLng(48.8, 2.35);

            var map = L.map('map', {
                center: latlng,
                zoom: 2,
                layers: [tiles],
            });

            var markers = L.markerClusterGroup({
                chunkedLoading: true
            });

            for (var i = 0; i < addressPoints.length; i++) {
                var a = addressPoints[i];
                var title = '[' + a[2] + '] ' + a[3];
                var marker = L.marker(L.latLng(a[0], a[1]), {
                    title: title
                });
                marker.bindPopup(title);
                markers.addLayer(marker);
            }

            map.addLayer(markers);
            var marker = L.marker([48.8, 2.35]).addTo(map);
            marker.bindPopup('48.8, 2.35');

            //Get Latitude and Longitude
            $scope.getLocation = function (address) {
                $http({
                    method: 'GET',
                    url: 'https://nominatim.openstreetmap.org/search/' + pincode + '?format=json&addressdetails=1&limit=1'
                }).then(function successCallback(response) {

                    var latitude = response[0].lat;
                    var longitude = response[0].lon;

                    alert(latitude + ' / ' + longitude);

                }, function errorCallback(response) {
                    alert("Error");
                });
            }
        }
    ]);

    // App.controller('bymapCtrl', bymapCtrl);
    // bymapCtrl.$inject = ['$scope', 'alumniService', '$rootScope', '$window', '$timeout',];
    // function bymapCtrl($scope, alumniService, $rootScope, $window, $timeout) {
    //     var addressPoints = [
    //         [20.5937, 78.9629, 250, 'India'],
    //         [17.123184, 79.208824, 25, 'Telangana, India'],
    //         [23.473324, 77.947998, 10, 'Madhya Pradesh, India'],
    //         [29.238478, 76.431885, 35, 'Haryana, India'],
    //         [21.295132, 81.828232, 20, 'Chhattisgarh, India'],
    //         [25.794033, 78.116531, 46, 'Bhitarwar, Madhya Pradesh, India'],
    //         [23.745127, 91.746826, 22, 'Tripura, India'],
    //         [17.874857, 78.100815, 11, 'Chandoor, Telangana, India'],
    //         [15.317277, 75.71389, 44, 'Karnataka, India'],
    //         [10.850516, 76.27108, 29, 'Kerala, India'],
    //         [28.207609, 79.82666, 12, 'Uttar Pradesh, India'],
    //         [26.244156, 92.537842, 30, 'Assam, India'],
    //         [19.66328, 75.300293, 34, 'Maharashtra, India'],
    //         [11.127123, 78.656891, 21, 'Tamil Nadu, India'],
    //         [22.978624, 87.747803, 12, 'West Bengal, India'],
    //         [22.309425, 72.13623, 17, 'Gujarat, India'],
    //         [20.94092, 84.803467, 13, 'Odisha, India'],
    //         [27.391277, 73.432617, 23, 'Rajasthan, India'],
    //         [32.084206, 77.571167, 27, 'Himachal Pradesh, India'],
    //         [10.45, 77.34, 25, "Dharapuram"]

    //     ];


    //     // var tiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    //     //     maxZoom: 18,
    //     //     noWrap: true,
    //     //     worldCopyJump: true,
    //     //     inertia: false
    //     // });


    //     var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //         maxZoom: 18,
    //         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Points &copy 2012 LINZ'
    //     }),

    //         latlng = L.latLng(48.8, 2.35);

    //     var map = L.map('map', {
    //         center: latlng,
    //         zoom: 2,
    //         layers: [tiles],
    //     });

    //     var markers = L.markerClusterGroup({
    //         chunkedLoading: true
    //     });

    //     for (var i = 0; i < addressPoints.length; i++) {
    //         var a = addressPoints[i];
    //         var title = '[' + a[2] + '] ' + a[3];
    //         var marker = L.marker(L.latLng(a[0], a[1]), {
    //             title: title
    //         });
    //         marker.bindPopup(title);
    //         markers.addLayer(marker);
    //     }

    //     map.addLayer(markers);
    //     var marker = L.marker([48.8, 2.35]).addTo(map);
    //     marker.bindPopup('48.8, 2.35');

    //     //Get Latitude and Longitude
    //     $scope.getLocation = function (address) {
    //         $http({
    //             method: 'GET',
    //             url: 'https://nominatim.openstreetmap.org/search/' + pincode + '?format=json&addressdetails=1&limit=1'
    //         }).then(function successCallback(response) {

    //             var latitude = response[0].lat;
    //             var longitude = response[0].lon;

    //             alert(latitude + ' / ' + longitude);

    //         }, function errorCallback(response) {
    //             alert("Error");
    //         });
    //     }
    // }
})();



