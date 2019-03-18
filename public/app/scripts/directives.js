
/*
 * Custom helper directives
 *
 */
/* This is a service to getting hostel name by clicking the hostel name link
 in the image card view of hostel and send that
name to hostel details controller to fetch the details of that hostel for view and edit*/
App.factory('alumniService', function () {
    return {
        data:{
            name:''
        }
    };
});

App.directive('windowHeight', function ($window) {
    return{
        link: function (scope, element, attrs) {
            angular.element(window).resize(function () {
                scope.windowHeight();
            });
            setTimeout(function () {
                scope.windowHeight();
            }, 10);
            scope.windowHeight = function () {
                element.css('min-height', angular.element(window).height() - 
                (angular.element('#footer').height() + 16));

            }
        }
    }
})


App.directive('scrollSpy', function($timeout){
    return {
        restrict: 'A',
        link: function(scope, elem, attr) {
            var offset = parseInt(attr.scrollOffset, 10)
            if(!offset) offset = 10;
            console.log("offset:  " + offset);
            elem.scrollspy({ "offset" : offset});
            scope.$watch(attr.scrollSpy, function(value) {
                $timeout(function() { 
                  elem.scrollspy('refresh', { "offset" : offset})
                }, 1);
            }, true);
        }
    }
});

App.directive('preventDefault', function() {
    return function(scope, element, attrs) {
        jQuery(element).click(function(event) {
            event.preventDefault();
        });
    }
});

App.directive("scrollTo", ["$window", function($window){
    return {
        restrict : "AC",
        compile : function(){

            function scrollInto(elementId) {
                if(!elementId) $window.scrollTo(0, 0);
                //check if an element can be found with id attribute
                var el = document.getElementById(elementId);
                if(el) el.scrollIntoView();
            }

            return function(scope, element, attr) {
                element.bind("click", function(event){
                    scrollInto(attr.scrollTo);
                });
            };
        }
    };
}]);

App.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
    
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files);
                });
            });
        }
    };
 }]);

