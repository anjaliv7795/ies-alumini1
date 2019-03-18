(function () {
    'use strict';
    var App = angular.module('app');
    App.controller('donationCtrl', donationCtrl);
    donationCtrl.$inject = ['$scope', 'alumniService', 'ValidationService', '$timeout'];
    function donationCtrl($scope, alumniService, ValidationService, $timeout) {
        $scope.newDonation = {};
        $scope.donationarr = [];
        $scope.dataMode = "ADD";
        function loadInitial() {
            alumniService.getAllDonation(function (err, res) {
                if (!err) {
                    $scope.donationarr = res.data;
                    for (var i = 0; i < res.data.length; i++) {
                        $scope.donationarr[i].createdTimestamp = new Date(res.data[i].createdDate)
                        $scope.donationarr[i].createdDate = moment(res.data[i].createdDate).format('DD/MM/YYYY,h:mm:ss a');

                    }
                }
            })
        }
        loadInitial();
        $scope.saveDonation = function () {
            //$scope.dataMode = "ADD";
            //$scope.newNews = {};
           // if (new ValidationService().checkFormValidity($scope.newDonationform)) {

                alumniService.postDonation($scope.newDonation, function (err, res) {
                    if (!err) {
                        $scope.donationarr.push($scope.newDonation);
                        $('#donationModal').modal("hide");
                    }
                })
//}
        }
        $scope.setEnvForAdd = function () {
            $scope.newDonation = {};
            $scope.dataMode = "ADD";
            $('#donationModal').modal("show");
        }
        $scope.setEnvForEdit = function (donation) {
            $scope.dataMode = "EDIT";
            $('#donationModal').modal("show");
            $scope.newDonation = JSON.parse(JSON.stringify(donation));

        }
        $scope.confirmModal = function (index) {
            $("#confirmModal").modal("show");
            $scope.deleteIndex = index;
        }
        $scope.deleteDonationSure = function () {
            alumniService.deleteDonation($scope.deleteIndex, function (err, res) {
            })

            $scope.donationarr.splice($scope.deleteIndex, 1);
            $("#confirmModal").modal('hide');

        }
        $scope.updateDonation = function () {
            delete $scope.newDonation.$$hashKey
            alumniService.updateDonation($scope.newDonation._id, $scope.newDonation, function (err, res) {
                if (!err) {
                    var index = $scope.donationarr.findIndex(function (data) {
                        return data._id == $scope.newDonation._id;
                    });
                    $scope.donationarr[index] = $scope.newDonation;

                }
            });
        }
        $scope.imageAttachment = {
            dzOptions: {
                url: "alumni/file/upload",
                method: "put",
                parallelUploads: 1,
                addRemoveLinks: true,
                acceptedFiles: 'image/jpeg, images/jpg, image/png',
                dictDefaultMessage: 'Click to add or drop photos',
                autoProcessQueue: true,
                createImageThumbnails: true,
                previewContainer: true,
                dictResponseError: 'Could not upload this file',
                paramName: function () {
                    return "fileAttachment";
                },
                renameFile: function (file) {
                    file.upload.filename = file.name;
                },
            },
            dzCallbacks: {
                init: function () {
                    this.on("addedfile", function (file) {
                    });
                },
                "sending": function (file, xhr, formData) {
                },
                "addedfile": function (file) {
                    console.info('File added from dropzone .', file);
                    $scope.displayFile = file.name;
                },
                "removedfile": function (file) {
                    console.info('File removed from Server .', file);
                    $scope.removeFile(file.id);
                    removeFile(file);
                },
                "success": function (file, xhr) {
                    console.info(file);
                    file.id = xhr[0].id;
                    file.xhr = xhr;
                    if (!$scope.newDonation) {
                        $scope.newDonation = {};
                    }
                    $scope.newDonation.fileAttachmentDetails = {
                        "id": file.id,
                        "contentType": file.type,
                        "originalName": file.name,
                        "imageUrl": "alumni/loadimg/" + file.id + "/" + file.name + "/" + file.type
                    };
                    //console.info("details",$scope.imageInput.fileAttachmentDetails);
                },
                "error": function (file) {
                },
                "complete": function (file) {
                }
            },
            dzMethods: {

            }
        };
        $scope.removeFile = function (id) {
            $scope.removeDirtyAttachment(id)
            $scope.newDonation = {};
            $scope.newDonation.fileAttachmentDetails = {};
        }
        $scope.removeDirtyAttachment = function (id) {
            $scope.dirtyFileRemoved = undefined;
            alumniService.removeDirtyAttachment(id, function (err, res) {
                if (!err) {
                    $scope.dirtyFileRemoved = true;
                    return;
                }
                else {
                    $scope.dirtyFileRemoved = false;
                    return;
                }
            })
        }
    };
})();

