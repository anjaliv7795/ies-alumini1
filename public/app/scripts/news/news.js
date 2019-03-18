(function () {
    'use strict';
    var App = angular.module('app');
    App.controller('newsCtrl', newsCtrl);
    newsCtrl.$inject = ['$scope', 'alumniService', 'ValidationService', '$timeout'];
    function newsCtrl($scope, alumniService, ValidationService, $timeout) {
        //alert("vxcvxjvxbvjcxcv");
        $scope.newNews = {};
        $scope.newsarr = [];
        $scope.dataMode = "ADD";
        //moment(createdDate).format('MM/DD/YYYY');
       // moment(news.createdDate).format('dd/mm/yyyy');
       // var d = new Date(year, month, day)
        
       // moment().utcOffset("+05:30").format();
        // moment().format('2016-01-01 11:31:23 PM', 'YYYY-MM-DD hh:mm:ss a')
        //moment().format('LLL');
       //moment().format('MMMM Do YYYY, h:mm:ss a');
        $scope.dateOpts1 = {
             dateFormat: 'd-m-y',
         };
        function loadInitial() {
            alumniService.getAllNews(function (err, res) {
                if (!err) {
                    $scope.newsarr = res.data;
                    for(var i=0;i<res.data.length;i++)
                    {
                         $scope.newsarr[i].createdTimestamp= new Date(res.data[i].createdDate)
                        $scope.newsarr[i].createdDate = moment(res.data[i].createdDate).format('DD/MM/YYYY,h:mm:ss a');
                       
                    }
                }
            })
        }
        loadInitial();
        $scope.saveNew= function () {
            
            //$scope.dataMode = "ADD";
            //$scope.newNews = {};
            if(new ValidationService().checkFormValidity($scope.newNewsform)){
        
            alumniService.postNews($scope.newNews, function (err, res) {
                if (!err) {
                    $scope.newsarr.push($scope.newNews);  
                    $('#newsModal').modal("hide");               
                    
                   // alert("vxcvxjvxbvjcxcv");
                }
            })
        }
    }
        $scope.setEnvForAdd = function () {
            $scope.newNews = {};
            $scope.dataMode = "ADD";
            $('#newsModal').modal("show");
           
        
        }
        $scope.setEnvForEdit = function (news) {
            $scope.dataMode = "EDIT";
            $('#newsModal').modal("show");
            $scope.newNews = JSON.parse(JSON.stringify(news));

        }
        $scope.confirmModal = function (index) {
            $("#confirmModal").modal("show");
            $scope.deleteIndex = index;
        }
        $scope.deleteNewsSure = function () {
            alumniService.deleteNews($scope.deleteIndex, function (err, res) {
            })

            $scope.newsarr.splice($scope.deleteIndex, 1);
            $("#confirmModal").modal('hide');

        }
        $scope.updateNews = function () {
            delete $scope.newNews.$$hashKey
            alumniService.updateNews($scope.newNews._id, $scope.newNews, function (err, res) {
                if (!err) {
                    var index = $scope.newsarr.findIndex(function (data) {
                        return data._id == $scope.newNews._id;
                    });
                    $scope.newsarr[index] = $scope.newNews;

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
                    if (!$scope.newNews) {
                        $scope.newNews = {};
                    }
                    $scope.newNews.fileAttachmentDetails = {
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
            $scope.newNews = {};
            $scope.newNews.fileAttachmentDetails = {};
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