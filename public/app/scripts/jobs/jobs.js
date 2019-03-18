(function () {
    'use strict';
    var App = angular.module('app');
    App.controller('jobCtrl', jobCtrl);
    jobCtrl.$inject = ['$scope', 'alumniService', 'ValidationService', '$timeout'];
    function jobCtrl($scope, alumniService, ValidationService, $timeout) {
        $scope.newJob = {skills:"<p>Functionalities</p>\n<p>&nbsp;</p>\n<p>Skills Required</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>Domain of work</p>"};
        $scope.jobarr = [];
        $scope.numLimit = 200;

        //$scope.tinymce.activeEditor.setContent('<h1>skills require</h1>');
        $scope.readMore = function () {
            $scope.numLimit = 10000;
            $scope.jobarr = res.data;
            //$scope.jobarr.push($scope.newJob);
        };
        $scope.dataMode = "ADD";
        $scope.dateOpts1 = {
            dateFormat: 'd-m-y',
        };
        function loadInitial() {
            alumniService.getAllJob(function (err, res) {
                if (!err) {
                    $scope.jobarr = res.data;
                    for(var i=0;i<res.data.length;i++)
                    {
                        $scope.jobarr[i].createdDate = moment(res.data[i].createdDate).format('DD/MM/YYYY,h:mm:ss a');
                    }
                }
            })
        }
        loadInitial();

        $scope.saveJob = function () {
            if(new ValidationService().checkFormValidity($scope.newJobform)){
            alumniService.postJob($scope.newJob, function (err, res) {
                if (!err) {
                    $scope.jobarr.push($scope.newJob);
                    $('#jobModal').modal("hide");
                }

            })
        }
    }
    $scope.setEnvForAdd = function () {
        $scope.newJob = {};
        $scope.dataMode = "ADD";
        $('#jobModal').modal("show");
    }

        $scope.setEnvForEdit = function (job) {
            $scope.dataMode = "EDIT";
            $('#jobModal').modal("show");
            $scope.newJob = JSON.parse(JSON.stringify(job));

        }
        $scope.removeJob = function (index) {
            $scope.newJob.splice(index, 1);
        }

        $scope.confirmModal = function (index) {
            $("#confirmModal").modal("show");
            $scope.deleteIndex = index;

        }
        $scope.deleteJobSure = function () {
            alumniService.deleteJob($scope.deleteIndex, function (err, res) {
            })

            $scope.jobarr.splice($scope.deleteIndex, 1);
            $("#confirmModal").modal('hide');

        }

        $scope.updateJob = function () {
            delete $scope.newJob.$$hashKey
            alumniService.updateJob($scope.newJob._id, $scope.newJob, function (err, res) {
                if (!err) {
                    var index = $scope.jobarr.findIndex(function (data) {
                        return data._id == $scope.newJob._id;
                    });
                    $scope.jobarr[index] = $scope.newJob;

                }
            });
        }
        // $scope.search =function(Jtitle,cname,location,salary,Experience,type,lastdate,externallink){
        //     angular.element('#basic-modal').modal('show');
        //     $scope.cname = cname;
        //     $scope.location = location;
        //     $scope.Jtitle = Jtitle;
        //     $scope.salary = salary;
        //     $scope.Experience = Experience;
        //     $scope.type = type;
        //     $scope.lastdate = lastdate;
        //     $scope.externallink = externallink;
        // }

        //filter
        // $scope.roomCategoryType = [];
        // $scope.filterRoomName = [];
        // $scope.room = [];
        $scope.companyName = [];
        $scope.domainName = [];
        $scope.locationName = [];

        //Default display
        $scope.companyFilter = function (event) {
            if ($scope.companyName.length > 0) {
                if ($.inArray(event.cname, $scope.companyName) < 0)
                    return;
            }
            return event;
        }
        $scope.domainFilter = function (event) {
            if ($scope.domainName.length > 0) {
                if ($.inArray(event.Jtitle, $scope.domainName) < 0)
                    return;
            }
            return event;
        }
        $scope.locationFilter = function (event) {
            if ($scope.locationName.length > 0) {
                if ($.inArray(event.location, $scope.locationName) < 0)
                    return;
            }
            return event;
        }

        //Filter display
        $scope.company = function (event) {
            var i = $.inArray(event, $scope.companyName);

            if (i > -1) {
                $scope.companyName.splice(i, 1);
            } else {
                $scope.companyName.push(event);
            }
        }
        $scope.domain = function (event) {
            var i = $.inArray(event, $scope.domainName);

            if (i > -1) {
                $scope.domainName.splice(i, 1);
            } else {
                $scope.domainName.push(event);
            }
        }
        $scope.Location = function (event) {
            var i = $.inArray(event, $scope.locationName);

            if (i > -1) {
                $scope.locationName.splice(i, 1);
            } else {
                $scope.locationName.push(event);
            }
        }
    };
})();


