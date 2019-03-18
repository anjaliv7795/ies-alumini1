// Application Main Controller
App.controller('guestHouseStayCtrl', ['$scope', '$window', '$timeout',
    function ($scope, $window, $timeout) {
        //Datepicker
        $scope.dateOpts1 = {
            dateFormat: 'd-m-Y',
        };


    }
]);

// Application Main Controller
App.controller('guestHouseroomListCtrl', ['$scope', '$window', '$timeout',
    function ($scope, $window, $timeout) {

        $scope.dateOptsfrom = {
            dateFormat: 'd/m/Y',
            minDate: "today",
            disable: ["18/01/2019", "22/01/2019", "30/01/2019"]
        }

        $scope.dateOptsto = {
            dateFormat: 'd/m/Y',
            minDate: "today",
            disable: ["18/01/2019", "22/01/2019", "30/01/2019"]
        }

        $scope.city = ['Coimbatore', 'Karur', 'Tiruppur', 'Madurai', 'Salem'];

        $scope.state = ['Tamil Nadu', 'Andhra Pradesh', 'Bihar', 'Haryana', 'Manipur'];


        $scope.facility = [{
            name: "AC",
            class: "icon icon-013"
        }, {
            name: "TV",
            class: "icon icon-013"
        }, {
            name: "Wifi",
            class: "icon icon-013"
        }]

        $scope.classes = {
            "TV": "icon icon-013",
            "Wifi": "icon icon-047",
            "GYM": "icon icon-041",
            "VIP": "icon icon-037",
            "AC": "icon icon-227",
            "Parking Facility": "icon icon-202",
            "Car Parking": "icon icon-098",
            "Bike Parking": "icon icon-097",
            "Food": "icon icon-045",
            "Landline": "icon icon-180",
            "Swimming Pool": "icon icon-026",
            "Tea / Coffee": "icon icon-005",
            "Games": "icon icon-209",
            "Room Cleaning": "icon icon-199",
            "CCTV Cameras": "icon icon-153",
            "No smoking": "icon icon-060",
            "Support": "icon icon-249",
            "Card Payment": "icon icon-111",
            "In-house Restauarant ": "icon icon-216",
            "Power Backup ": "icon icon-028",
            "Conference Room ": "icon icon-206",
            "Banquet Hall": "icon icon-147",
            "Dining Area": "icon icon-191",
            "Elevator": "icon icon-059",
            "Hot Water": "icon icon-158",
            "Bar": "icon icon-188",
            "Wheelchair Accessible": "icon icon-178",
            "Room Heater": "icon icon-141",
            "In Room Safe": "icon icon-119",
            "Mini Fridge": "icon icon-223",
            "Complimentary Breakfast": "icon icon-173",
            "Hair Dryer": "icon icon-205",
            "Laundry ": "icon icon-126",
            "Pet Friendly": "icon icon-156",
            "HDTV": "icon icon-013",
            "Spa": "icon icon-083",
            "Wellness Center": "icon icon-200",
            "Electricity": "icon icon-231",
            "Bath Tub": "icon icon-008",
            "Netflix ": "icon icon-079",
            "Kindle": "icon icon-163",
            "Coffee Tea Maker": "icon icon-090",
            "Sofa Set": "icon icon-178",
            "Jacuzzi": "icon icon-008",
            "Full Length Mirrror": "icon icon-187",
            "Balcony": "icon icon-233",
            "King Bed": "icon icon-167",
            "Single Bed": "icon icon-022",
            "Intercom": "icon icon-076",
            "Sufficient Room Size": "icon icon-030",
            "Sufficient Washroom": "icon icon-014"
        }
        $scope.getClasses = function (name) {
            return $scope.classes[name];
        }
        $scope.facility = ['AC', 'TV', 'Free Wifi', 'Kitchen', 'In-house Restaurant', 'Parking Facility', 'Card Payment', 'Power backup', 'Conference Room', 'Banquet Hall', 'CCTV Cameras', 'Dining Area', 'Elevator', 'Swimming Pool', 'Hot Water', 'Bar', 'Wheelchair Accessible', 'Room Heater', 'In Room Safe', 'Mini Fridge', 'Complimentary Breakfast', 'Gym', 'Hair Dryer', 'Laundry', 'Pet Friendly', 'HDTV', 'Spa', 'Wellness Center', 'Electricity', 'Bath Tub', 'Netflix', 'Kindle', 'Coffee Tea Maker', 'Sofa Set', 'Jacuzzi', 'Full Length Mirrror', 'Balcony', 'King Bed', 'Queen Bed', 'Single Bed', 'Intercom', 'Sufficient Room Size', 'Sufficient Washroom'];


    }
]);


App.controller('addGuesthouseCtrl', ['$scope', '$window', '$timeout',
    function ($scope, $window, $timeout) {
        //Datepicker
        $scope.dateOpts1 = {
            dateFormat: 'd-m-Y',
        };


        //SelectBox Multiple Facilities
        $scope.facility = ['AC', 'TV', 'Free Wifi', 'Kitchen', 'In-house Restaurant', 'Parking Facility', 'Card Payment', 'Power backup', 'Conference Room', 'Banquet Hall', 'CCTV Cameras', 'Dining Area', 'Elevator', 'Swimming Pool', 'Hot Water', 'Bar', 'Wheelchair Accessible', 'Room Heater', 'In Room Safe', 'Mini Fridge', 'Complimentary Breakfast', 'Gym', 'Hair Dryer', 'Laundry', 'Pet Friendly', 'HDTV', 'Spa', 'Wellness Center', 'Electricity', 'Bath Tub', 'Netflix', 'Kindle', 'Coffee Tea Maker', 'Sofa Set', 'Jacuzzi', 'Full Length Mirrror', 'Balcony', 'King Bed', 'Queen Bed', 'Single Bed', 'Intercom', 'Sufficient Room Size', 'Sufficient Washroom'];

        //////////// Floor & Rooms /////////////////////////////////////////////

        $scope.startingNumber = [];
        $scope.numberDigit = [];
        $scope.roomNumber = [];

        $scope.roomCounts = [];
        $scope.roomCount = function (index, count) {

            $scope.roomCounts[index] = [];
            $scope.roomNumber[index] = {};
            $scope.roomNumber[index].room = [];

            for (i = 0; i < count; i++) {
                $scope.roomCounts[index].push(i);
                $scope.roomNumber[index].room.push(i);
                $scope.roomNumber[index].room[i] = i + 1;
            }
            //alert( $scope.roomNumber[index].room.length)

            $scope.startingNumber[index] = 1;
            $scope.numberDigit[index] = 1;

            $scope.roomNoDigit(index);
            $scope.roomStartingNumber(index);

        }

        function pad(n, width, z) {
            z = z || '0';
            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
        }

        $scope.roomNoDigit = function (index) {

            var digit = $scope.roomNumber[index].room.length

            for (i = 0; i < digit && digit != 0; i++) {
                $scope.roomNumber[index].room[i] = pad(parseInt($scope.startingNumber[index]) + parseInt(i), parseInt($scope.numberDigit[index]), 0)
            }

        }

        $scope.roomStartingNumber = function (index) {


            var number = $scope.roomNumber[index].room.length;

            for (i = 0; i < number && number != 0; i++) {
                $scope.roomNumber[index].room[i] = pad(parseInt($scope.startingNumber[index]) + parseInt(i), parseInt($scope.numberDigit[index]), 0)
            }
        }

        //Add New Floor
        $scope.floors = [];
        $scope.addNewFloor = function () { //Add
            var itemIndex = 0;
            if ($scope.floors.length) {
                itemIndex = ($scope.floors[$scope.floors.length - 1].itemIndex) + 1;
            }
            $scope.floors.push({
                itemIndex: itemIndex
            })
        }


        //Dropzone
        $scope.dzOptions = {
            url: '/alt_upload_url',
            thumbnail: false,
            acceptedFiles: 'image/jpeg, images/jpg, image/png',
            addRemoveLinks: true,
            dictDefaultMessage: 'Click to add or drop photos',
            autoProcessQueue: false
        };



    }
]);


App.controller('viewProgrammeCtrl', ['$scope', '$window', '$timeout',
    function ($scope, $window, $timeout) {

        $scope.showCommentBox = function ($event) {
            angular.element('.card-body.post-collapse').removeClass('show');
            angular.element($event.currentTarget).parent().parent().find('.card-body.post-collapse').addClass('show');
        }

    }
]);

App.controller('messageCtrl', ['$scope', '$window', '$timeout',
    function ($scope, $window, $timeout) {

        //Mobile Toggle Left Side Menu 
        $scope.leftMenuToggle = function () {
            angular.element('.ae-overflow-layout').toggleClass('ae-active');
            angular.element('.ae-side-menu').toggleClass('ae-active');
            angular.element('.mb-menu-toggle').toggleClass('ae-hide');
        }
        angular.element('.ae-main-menu li a').on('click', function () {
            $scope.leftMenuToggle();
        })
        angular.element('.ae-overflow-layout').on('click', function () {
            $scope.leftMenuToggle();
        })

        //Mobile Toggle Content
        angular.element('.ae-item').on('click', function () {
            angular.element('.ae-content-w').toggleClass('ae-active');
            angular.element('.ae-list-w').toggleClass('ae-hide');
            $(window).scrollTop(0);
        })
        $scope.msgContentBack = function () {
            angular.element('.ae-content-w').toggleClass('ae-active');
            angular.element('.ae-list-w').toggleClass('ae-hide');
        }

        $(window).scroll(function () {
            if ($(document).scrollTop() > 80) {
                $('.aec-head').addClass('content-menu-fixed');
            } else {
                $('.aec-head').removeClass('content-menu-fixed');
            }
        });



    }
]);






App.controller('FeesDashboardCtrl', ['$scope', '$window',

    function ($scope, $window) {

        $scope.DatewiseJson = {
            "type": "area",

            "plotarea": {
                margin: "dynamic"
            },


            "plot": {
                "stacked": false,

            },



            "scale-x": {
                "labels": ["Date 1", "Date 2", "Date 3", "Date 4", "Date 5", "Date 6", "Date 7", "Date 8", "Date 9", "Date 10"] /* Scale Labels */
            },
            "series": [{
                "values": [20, 40, 25, 50, 15, 45, 33, 34],
                "background-color": "#EDE7F0",
                /* Single color or gradient (2 colors) */
                "line-color": "#AD6BAE",
                "alpha-area": 0.3,
                /* Shaded region transparency */
                "marker": {
                    "background-color": "#5D436A",
                    "border-width": "5px",
                    "border-color": "#B0B3DC"
                }
            }]
        };




        $scope.CoursewiseJson = {
            "type": "hbar",
            "plotarea": {
                margin: "dynamic"
            },
            "background-color": "#fff",
            "scale-y": {
                "line-color": "none",
                "tick": {
                    "visible": false
                },
                "item": {
                    "visible": false
                },
                "guide": {
                    "visible": false
                }
            },
            "scale-x": {
                "values": ["Course 1", "Course 2", "Course 3", "Course 4", "Course 5", "Course 6"],
                "line-color": "none",
                "tick": {
                    "visible": false
                },
                "item": {
                    "width": 200,
                    "text-align": "left",
                    "offset-x": 206,
                    "offset-y": -12,
                    "font-color": "#8391a5",
                    "font-family": "Arial",
                    "font-size": "11px",
                    "padding-bottom": "8px"
                },
                "guide": {
                    "visible": false
                }
            },
            "plot": {
                "bars-overlap": "100%",
                "bar-width": "12px",
                "thousands-separator": ",",
                "tooltip": {
                    "font-color": "#ffffff",
                    "background-color": "#707e94",

                    "font-family": "Arial",
                    "font-size": "11px",
                    "border-radius": "6px",
                    "shadow": false,
                    "padding": "5px 10px"
                },
                "hover-state": {
                    "background-color": "#707e94"
                },
                "animation": {
                    "delay": 500,
                    "effect": "ANIMATION_EXPAND_LEFT"
                }
            },
            "plotarea": {
                "margin": "50px 15px 10px 15px"
            },

            "series": [{
                    "values": [70, 20, 60, 50, 40, 30],
                    "styles": [

                        {
                            "background-color": "#ad6bae"
                        },
                        {
                            "background-color": "#707d94"
                        },
                        {
                            "background-color": "#f3950d"
                        },
                        {
                            "background-color": "#e62163"
                        },
                        {
                            "background-color": "#4e74c0"
                        },
                        {
                            "background-color": "#9dc012"
                        }
                    ],
                    "z-index": 2,

                    "tooltip-text": "Paid: %node-value"
                },
                {
                    "max-trackers": 0,
                    "values": [100, 100, 100, 100, 100, 100],
                    "data-rvalues": [70, 20, 60, 50, 40, 30],
                    "background-color": "#F9F7FA",
                    "z-index": 1,
                    "value-box": {
                        "visible": true,
                        "offset-y": "-12px",
                        "offset-x": "-54px",
                        "text-align": "right",
                        "font-color": "#8391a5",
                        "font-family": "Arial",
                        "font-size": "11px",
                        "text": "Total: %v",
                        "padding-bottom": "8px"
                    }
                }
            ]
        };



        $scope.ProfileJson = {
            "type": "funnel",
            "scale-y": {
                "visible": true,
                "labels": ["0-25%", "25-50%", "50-75%", "75-100%"],
            },
            "series": [{
                    "values": [101]
                },
                {
                    "values": [60]
                },
                {
                    "values": [30]
                },
                {
                    "values": [15]
                }
            ]
        };



    }
]);

// Application Main Controller
App.controller('AppCtrl', ['$scope', '$window', '$timeout',
    function ($scope, $window, $timeout) {


        //Standard Table Filter Collapse
        $scope.filterCollapse = function ($event) {
            var thisElement = $event.currentTarget;
            angular.element('.get-collapse').parent().removeClass('selected');
            angular.element(thisElement).parent().toggleClass('selected');
            angular.element('#getData').hide();
            angular.element('#filterResult').toggle();
        }

        //Data Collapse
        $scope.dataCollapse = function ($event) {
            var thisElement = $event.currentTarget;
            angular.element('.filter-collapse').parent().removeClass('selected');
            angular.element(thisElement).parent().toggleClass('selected');
            angular.element('#filterResult').hide();
            angular.element('#getData').toggle();
        }

        //Sidebar Collapse
        $scope.sidebarCollapseHide = function ($event) {
            var thisElement = $event.currentTarget;
            angular.element('#leftColumn').toggle("silde");
            $timeout(function () {
                angular.element('#rightColumn').toggleClass('col-md-12');
                angular.element('#siderbarCollapseShow').toggleClass('d-flex');
            }, 150);
        }
        $scope.sidebarCollapseShow = function ($event) {
            var thisElement = $event.currentTarget;
            angular.element('#siderbarCollapseShow').toggleClass('d-flex');
            angular.element('#rightColumn').toggleClass('col-md-12');
            angular.element('#leftColumn').toggle("silde");
        }

    }
]);

// Header Controller
App.controller('HeaderCtrl', ['$scope', '$rootScope', '$window',
    function ($scope, $rootScope, $window) {


    }
]);

//Admission Verfication Controller
App.controller('admissionsVerficationCtrl', ['$scope', '$window', '$timeout',
    function ($scope, $window, $timeout) {
        var $image = $('.imagezoom')
        $('.imagezoom').viewer({
            inline: true,
            zoomRatio: 0.8,
            toolbar: {
                zoomIn: 4,
                zoomOut: 4,
                oneToOne: 4,
                reset: 4,
                prev: 0,
                play: {
                    show: 0
                },
                next: 0,
                rotateLeft: 4,
                rotateRight: 4,
                flipHorizontal: 4,
                flipVertical: 4,
            },
        });

    }
]);


// Admissions Dashboard Controller
App.controller('AdmissionsDashboardCtrl', ['$scope', '$window', '$timeout',
    function ($scope, $window, $timeout) {

        var streamAdmissions = {
            type: "bar",
            "plot": {
                "value-box": {
                    "text": "%v",
                    "placement": "top-in",
                    "font-color": "white"
                }
            },
            "plotarea": {
                "margin": "30px"
            },
            "legend": {
                "highlight-plot": true,
                "layout": "1x3",
                "y": "-10px",
                "shadow": false,
                "border-width": 0,
            },
            "scale-x": {
                "labels": ["Arts", "Commerce", "Science", "Vocational"] /* Scale Labels */
            },
            "series": [{
                    "values": [20, 40, 25, 50],
                    "text": "Sanctioned",


                }, {
                    "values": [10, 25, 5, 60],
                    "text": "Admitted",

                }, {
                    "values": [59, 50, 28, 33],
                    "text": "Vacant",

                }

            ]
        };

        zingchart.render({
            id: 'StreamAdmissions',
            data: streamAdmissions,
            defaultsurl: 'assets/css/zingchart_color.txt', // Path to my_theme.txt
        });



        var enrollmentsJson = {
            "type": "bar",
            "scale-x": {
                "labels": ["Fees Paid", "Certificates Verified", "Dropouts"] /* Scale Labels */
            },
            "plotarea": {
                "margin": "30px"
            },

            "plot": {
                "aspect": "cone",
                "value-box": {
                    "text": "%v",
                    "placement": "bottom-in",
                    "font-color": "white"
                }
            },
            "series": [{
                    "values": [70, 40, 5],

                },

            ]
        };
        zingchart.render({
            id: 'Enrollments',
            data: enrollmentsJson,
            defaultsurl: 'assets/css/zingchart_color.txt', // Path to my_theme.txt
        });

        var communityEnrollmentsJson = {
            "type": "pie",
            "plotarea": {
                "margin": "30px"
            },
            "legend": {
                "item": {
                    "margin-right": "0",

                },
                "highlight-plot": true,
                "layout": "horizontal",
                "overflow": "page",
                "y": "-10px",
                "shadow": false,
                "border-width": 0,
            },
            "plot": {},
            "series": [{
                "values": [35],
                "text": "BC Muslim",
            }, {
                "values": [575],
                "text": "BC-Others",
            }, {
                "values": [252],
                "text": "MBC-DNC",
            }, {
                "values": [110],
                "text": "SC",
            }, {
                "values": [84],
                "text": "OC",
            }, {
                "values": [38],
                "text": "SCA",
            }]
        };
        zingchart.render({
            id: 'CommunityEnrollments',
            data: communityEnrollmentsJson,
            defaultsurl: 'assets/css/zingchart_color.txt', // Path to my_theme.txt
        });

        var cutOffJson = {
            type: "hbar",
            "plot": {
                "stacked": true,
                "value-box": {
                    "text": "%v",
                    "placement": "top-in",
                    "font-color": "white"
                }
            },
            "plotarea": {
                "margin": "30px 30px 30px 60px"
            },
            "legend": {
                "highlight-plot": true,
                "layout": "1x7",
                "y": "-10px",
                "shadow": false,
                "border-width": 0

            },
            "scale-x": {
                "labels": ["520-560", "560-600", "600-640", "640-680", "680-720", "720-760", "760-800"] /* Scale Labels */
            },
            "series": [{
                    "values": [20, 40, 25, 50, 70, 30, 5],
                    "text": "CBSE",
                    "opacity": 0.1

                }, {
                    "values": [10, 50, 5, 15, 30, 10, 45],
                    "text": "Defense",

                }, {
                    "values": [30, 10, 25, 45, 10, 40, 65],
                    "text": "Free Seats",

                }, {
                    "values": [6, 8, 5, 4, 23, 32, 45],
                    "text": "Merit",

                }, {
                    "values": [3, 2, 5, 4, 10, 8, 6],
                    "text": "Management",

                }, {
                    "values": [1, 2, 5, 4, 3, 4, 6],
                    "text": "Sports",

                }

            ]
        };
        zingchart.render({
            id: 'CutOff',
            data: cutOffJson,
            defaultsurl: 'assets/css/zingchart_color.txt', // Path to my_theme.txt
        });
    }
]);


App.controller('examdashboardCtrl', ['$scope', '$window',
    function ($scope, $window) {


        var sessionwiseJson = {
            type: "bar",
            "plot": {
                "bars-space-left": 0.15,
                "bars-space-right": 0.15,
                "animation": {
                    "effect": "ANIMATION_SLIDE_BOTTOM",
                    "sequence": 0,
                    "speed": 500,
                    "delay": 500
                },
                valueBox: [{
                        text: '%v',
                        placement: 'top'
                    },
                    {
                        "text": "%t",
                        "placement": "top-in",
                        "font-color": "white",
                        "angle": -90,
                        "offset-y": 25
                    }
                ],
                "tooltip": {
                    "text": "%kt",
                }

            },
            "plotarea": {
                "margin": "40px 30px 70px"
            },
            "legend": {
                "highlight-plot": true,
                "layout": "1x3",
                "y": "-10px",
                "shadow": false,
                "border-width": 0,
            },
            "scale-x": {
                "labels": ["13 FEB 2019", "14 FEB 2019", "15 FEB 2019", "16 FEB 2019", "20 FEB 2019", "21 FEB 2019"],
                /* Scale Labels */
                "item": {
                    "angle": -45
                }
            },
            "series": [{
                    "values": [500, 400, 200, 300, 400, 100],
                    "text": "Session - 1",
                    "borderRadiusTopLeft": 5,
                    "borderRadiusTopRight": 5,
                    "alpha": 1.5,

                }, {
                    "values": [200, 100, 500, 400, 200, 500],
                    "text": "Session - 2",
                    "borderRadiusTopLeft": 5,
                    "borderRadiusTopRight": 5,
                    "alpha": 1.5,

                }, {
                    "values": [500, 300, 200, 100, 300, 200],
                    "text": "Session - 3",
                    "borderRadiusTopLeft": 5,
                    "borderRadiusTopRight": 5,
                    "alpha": 1.5,

                },

            ]
        };

        zingchart.render({
            id: 'sessionwiseJson',
            data: sessionwiseJson,
            height: '400px',
            defaultsurl: 'assets/css/zingchart_color.txt', // Path to my_theme.txt
        });

        var distributionJson = {
            "type": "pie",
            "plotarea": {
                "margin": "30px"
            },
            "legend": {
                "item": {
                    "margin-right": "0",
                },
                "highlight-plot": true,
                "layout": "horizontal",
                "overflow": "page",
                "y": "-10px",
                "shadow": false,
                "border-width": 0,
            },
            "plot": {

                "tooltip": {
                    "text": "%t",
                },

                valueBox: [{
                    text: '%v',

                }],
            },
            "series": [{
                "values": [15000],
                "text": "General",
            }, {
                "values": [12000],
                "text": "Regular",
            }, {
                "values": [10000],
                "text": "Fine",
            }]
        };
        zingchart.render({
            id: 'distributionJson',
            data: distributionJson,
            height: '300px',
            defaultsurl: 'assets/css/zingchart_color.txt', // Path to my_theme.txt
        });



        $scope.sessionJson = {
            "type": "area",
            "plotarea": {
                margin: "dynamic"
            },
            "plot": {
                "animation": {
                    "effect": "ANIMATION_SLIDE_LEFT",
                    "sequence": 0,
                    "speed": 800,
                    "delay": 800
                },
                "stacked": false,
                valueBox: [{
                    text: '%v',
                    placement: 'top'
                }],
                "tooltip": {
                    "text": "%kt",
                }
            },
            "scale-x": {
                "labels": ["13 FEB 2019", "14 FEB 2019", "15 FEB 2019", "16 FEB 2019", "20 FEB 2019", "21 FEB 2019", "20 FEB 2019", "22 FEB 2019"],
                /* Scale Labels */
                "item": {
                    "angle": -45
                }
            },
            "series": [{
                "values": [5000, 4000, 2000, 1000, 3000, 4000, 4000, 2000],
                "background-color": "#EDE7F0",
                /* Single color or gradient (2 colors) */
                "line-color": "#AD6BAE",
                "alpha-area": 0.3,
                /* Shaded region transparency */
                "marker": {
                    "background-color": "#5D436A",
                    "border-width": "5px",
                    "border-color": "#B0B3DC"
                }
            }]
        };



    }
]);

// Grievance Dashboard Controller
App.controller('GrievanceDashboardCtrl', ['$scope', '$window',
    function ($scope, $window) {

        $scope.GrievancesJson = {
            type: 'line',
            "plotarea": {
                "margin-top": "10",
                "margin-left": "30",
                "margin-right": "10",
                "margin-bottom": "60"
            },

            "legend": {
                "layout": "1x3",
                "x": "30%",
                "y": "90%",
                "highlight-plot": true,
                "border-width": 0,
            },

            crosshairX: {},
            scaleX: {
                markers: [],
                offsetEnd: 75,
                labels: ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
            },
            series: [{
                    values: [35, 42, 67, 89, 25, 34, 67],
                    text: 'Active Grievances',
                    "line-width": "2px",
                    "line-color": "#7CA82B",
                    "marker": {
                        "background-color": "#fff",
                        "size": 4,
                        "border-width": 2,
                        "border-color": "#7CA82B",
                        "shadow": 0
                    },

                },
                {
                    values: [30, 40, 67, 89, 25, 34, 67].sort(),
                    text: 'Closed Grievances',
                    "line-width": "2px",
                    "line-color": "#D31E1E",
                    "marker": {
                        "background-color": "#fff",
                        "size": 4,
                        "border-width": 2,
                        "border-color": "#D31E1E",
                        "shadow": 0
                    },
                },
                {
                    values: [5, 2, 67, 89, 25, 34, 67].sort(),
                    text: 'Pending Grievances',
                    "line-width": "2px",
                    "line-color": "#EFAA35",
                    "marker": {
                        "background-color": "#fff",
                        "size": 4,
                        "border-width": 2,
                        "border-color": "#EFAA35",
                        "shadow": 0
                    },
                }
            ]
        };


        $scope.FirstReplyJson = {
            "type": "bar",
            "plot": {
                "value-box": {
                    "text": "%v%",
                    "font-color": "#3E3C5A"
                },
                "bar-width": "50px",
                "background-color": "#7CA82B"
            },
            "plotarea": {
                "margin": "30"
            },
            "scale-x": {
                "labels": ["0-1 hrs", "1-8 hrs", "8-24 hrs", ">24 hrs"]
            },

            "series": [{
                "values": [41, 18, 32, 9]
            }]
        };


        $scope.GrievanceCategoryJson = {
            "type": "pie",
            "legend": {
                "highlight-plot": true,
                "border-width": 0,
            },
            "plot": {},
            "series": [{
                "values": [30],
                "text": "Harassment & Abuse",
            }, {
                "values": [34],
                "text": "Hostel & Amenities",
            }, {
                "values": [15],
                "text": "Benefits",
            }, {
                "values": [14],
                "text": "Discrimination",
            }, {
                "values": [5],
                "text": "Others",
            }]
        };



    }
]);


// Login Controller
App.controller('LoginCtrl', ['$scope', '$window',
    function ($scope, $window) {

    }
]);
//jobs 
// App.controller('jobCtrl', ['$scope', '$window',
//     function ($scope, $window) {

//         $scope.getContent = function () {
//             console.log('Editor content:', $scope.tinymceModel);
//         };

//         $scope.setContent = function () {
//             $scope.tinymceModel = 'This is <em>RICH</em> content';
//         };

//         $scope.tinymceOptions = {
//             theme: 'modern',
//             elementpath: false,
//             statusbar: false,
//             plugins: [
//                 'advlist autolink lists link image charmap print preview hr anchor pagebreak',
//                 'searchreplace wordcount visualblocks visualchars code fullscreen',
//                 'insertdatetime media nonbreaking save table contextmenu directionality',
//                 'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc'
//             ],
//             toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
//             image_advtab: true
//         };
//     }
// ]);


//Dashboard Controller
App.controller('DashboardCtrl', ['$scope', '$window',
    function ($scope, $window) {

        $scope.getContent = function () {
            console.log('Editor content:', $scope.tinymceModel);
        };

        $scope.setContent = function () {
            $scope.tinymceModel = 'This is <em>RICH</em> content';
        };

        $scope.tinymceOptions = {
            theme: 'modern',
            elementpath: false,
            statusbar: false,
            plugins: [
                'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                'searchreplace wordcount visualblocks visualchars code fullscreen',
                'insertdatetime media nonbreaking save table contextmenu directionality',
                'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc'
            ],
            toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
            image_advtab: true
        };
    }
]);

// Tables Controller
App.controller('TablesCtrl', ['$scope', '$window', '$timeout',
    function ($scope, $window, $timeout) {

        //SelectBox
        var vm = $scope;

        vm.itemArray = [{
                id: 1,
                name: 'HTML'
            },
            {
                id: 2,
                name: 'CSS'
            },
            {
                id: 3,
                name: 'JavaScript'
            },
            {
                id: 4,
                name: 'JQuery'
            },
            {
                id: 5,
                name: 'Angular JS'
            },
        ];

        $('#example').DataTable();

        $scope.tables = $('#exampleCheckbox').DataTable({
            columnDefs: [{
                orderable: false,
                className: 'select-checkbox',
                targets: 0
            }],

            select: {
                //style:    'os',
                style: 'multi',
                selector: 'td:first-child'
            },
            order: [
                [1, 'asc']
            ]
        });


        $(document).on("click", "th.select-checkbox", function () {
            if ($("th.select-checkbox").hasClass("selected")) {
                $scope.tables.rows().deselect();
                $("th.select-checkbox").removeClass("selected");
            } else {
                $scope.tables.rows().select();
                $("th.select-checkbox").addClass("selected");
            }
        }).on("select deselect", function () {
            ("Some selection or deselection going on")
            if ($scope.tables.rows({
                    selected: true
                }).count() !== $scope.tables.rows().count()) {
                $("th.select-checkbox").removeClass("selected");
            } else {
                $("th.select-checkbox").addClass("selected");
            }
        });

    }
]);

//Form FormValidationCtrl
App.controller('FormValidationCtrl', ['$scope', '$window', '$timeout', '$translate', 'ValidationService',
    function ($scope, $window, $timeout, $translate, ValidationService) {

        //Bootstrap Form Validation
        $scope.formSubmit = function () {
            // Fetch form to apply custom Bootstrap validation
            var form = $("#myForm")

            if (form[0].checkValidity() === false) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.addClass('was-validated');
            // Perform ajax submit here...
        }

        //SelectBox
        var vm = $scope;

        vm.itemArray = [{
                id: 1,
                name: 'HTML'
            },
            {
                id: 2,
                name: 'CSS'
            },
            {
                id: 3,
                name: 'JavaScript'
            },
            {
                id: 4,
                name: 'JQuery'
            },
            {
                id: 5,
                name: 'Angular JS'
            },
        ];

        vm.selected = {
            value: vm.itemArray[1]
        };

        //SelectBox Multiple
        vm.people = [{
                name: 'Adam',
                email: 'adam@email.com',
                age: 12,
                country: 'United States'
            },
            {
                name: 'Amalie',
                email: 'amalie@email.com',
                age: 12,
                country: 'Argentina'
            },
            {
                name: 'Estefanía',
                email: 'estefania@email.com',
                age: 21,
                country: 'Argentina'
            },
            {
                name: 'Adrian',
                email: 'adrian@email.com',
                age: 21,
                country: 'Ecuador'
            },
            {
                name: 'Wladimir',
                email: 'wladimir@email.com',
                age: 30,
                country: 'Ecuador'
            },
            {
                name: 'Nicole',
                email: 'nicole@email.com',
                age: 43,
                country: 'Colombia'
            },
            {
                name: 'Natasha',
                email: 'natasha@email.com',
                age: 54,
                country: 'Ecuador'
            },
            {
                name: 'Michael',
                email: 'michael@email.com',
                age: 15,
                country: 'Colombia'
            },
            {
                name: 'Nicolás',
                email: 'nicolas@email.com',
                age: 43,
                country: 'Colombia'
            }
        ];

        vm.multipleDemo = {};
        vm.multipleDemo.selectedPeople = [vm.people[2], vm.people[4]];


        //Datepicker Default
        $scope.dateOpts1 = {
            dateFormat: 'd-m-Y',
        };

        $scope.dateOpts2 = {
            dateFormat: 'd-m-Y',
            allowInput: true
        };


        ///*******************************   Angular Js Validation  **************************************** */////

        // you can change default debounce globally
        $scope.$validationOptions = {
            debounce: 1500,
            preValidateFormElements: false
        };

        // if we want to use the invalid_pattern_data locale translation as an alternateText (:alt=)
        // then we need to supply an extra 'data' variable (as defined in the JSON locale) of what we expect the search pattern on our input4
        $scope.translationData = {
            data: 'YYWW'
        };

        // remove a single element ($scope.form1, string)
        // OR you can also remove multiple elements through an array type .removeValidator($scope.form1, ['input2','input3'])
        $scope.removeInputValidator = function (elmName) {
            new ValidationService().removeValidator($scope.form1, elmName);
        };
        $scope.resetForm = function () {
            new ValidationService().resetForm($scope.form1);
        };
        $scope.submitForm = function () {
            if (new ValidationService().checkFormValidity($scope.form1)) {
                alert('All good, proceed with submit...');
            }
        }

        $scope.resetForm1 = function () {
            new ValidationService().resetForm($scope.form2);
        };
        $scope.submitForm1 = function () {
            if (new ValidationService().checkFormValidity($scope.form2)) {
                alert('All good, proceed with submit...');
            }
        }




        // If Condition Show
        $scope.ifCondCheck = function () {
            $scope.checkngif = true;
        }


    }
]);

// Form Pickers-More Controller
App.controller('PickersMoreCtrl', ['$scope', '$window',
    function ($scope, $window) {

        //Datepicker Default
        $scope.dateOpts1 = {
            dateFormat: 'd/m/Y',
            allowInput: true
        };
        $scope.dateOpts2 = {
            dateFormat: 'd/m/Y'
        };
        $scope.dateOpts3 = {
            dateFormat: 'd/m/Y'
        };

        //Datepicker Range
        $scope.dateRangeOpts = {
            mode: "range",
            dateFormat: "d/m/Y",
        };


        //Datepicker Inline
        $scope.inlineDateOpts = {
            inline: true,
            dateFormat: "d/m/Y",
        };


        //DateTimePicker
        $scope.DateTimeOpts = {
            enableTime: true,
            dateFormat: "d-m-Y H:i",
        };

        //DateTimePicker Inline
        $scope.inlineDateTimeOpts = {
            inline: true,
            enableTime: true,
            dateFormat: "d-m-Y H:i",
        };

        //DateTimePicker Components
        $scope.DateTimeCompOpts = {
            enableTime: true,
            dateFormat: "d-m-Y H:i",
        };

        //Timepicker DateTime
        $scope.DateTime = {
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
        };


    }
]);


//Form Elements
App.controller('FormElementCtrl', ['$scope', '$rootScope', '$window', '$timeout',
    function ($scope, $rootScope, $window, $timeout) {

        //Toogle Left Section
        $rootScope.toggleLeftSection = function ($event) {
            angular.element($event.currentTarget).children('i').toggleClass('la-indent')
            angular.element('#treeSection').toggleClass('d-none');
            angular.element('#gridSection').toggleClass('col-md-12');
        }

        $scope.typeOfAwards = ['Sports', 'Academic'];
        $scope.awardLevels = ['DEPARTMENTAL', 'INTER-COLLEGE', 'DISTRICT LEVEL', 'INTERNATIONAL LEVEL', 'NATIONAL LEVEL', 'STATE LEVEL'];

        $scope.dateOpts1 = {
            dateFormat: 'd/m/Y',
            allowInput: true
        };

        //Tags
        $scope.tags = [{
                text: 'just'
            },
            {
                text: 'some'
            },
            {
                text: 'cool'
            },
            {
                text: 'tags'
            }
        ];



        //SelectBox
        var vm = $scope;

        vm.itemArray = [{
                id: 1,
                name: 'HTML'
            },
            {
                id: 2,
                name: 'CSS'
            },
            {
                id: 3,
                name: 'JavaScript'
            },
            {
                id: 4,
                name: 'JQuery'
            },
            {
                id: 5,
                name: 'Angular JS'
            },
        ];

        vm.selected = {
            value: vm.itemArray[1]
        };

        //SelectBox Multiple
        vm.people = [{
                name: 'Adam',
                email: 'adam@email.com',
                age: 12,
                country: 'United States'
            },
            {
                name: 'Amalie',
                email: 'amalie@email.com',
                age: 12,
                country: 'Argentina'
            },
            {
                name: 'Estefanía',
                email: 'estefania@email.com',
                age: 21,
                country: 'Argentina'
            },
            {
                name: 'Adrian',
                email: 'adrian@email.com',
                age: 21,
                country: 'Ecuador'
            },
            {
                name: 'Wladimir',
                email: 'wladimir@email.com',
                age: 30,
                country: 'Ecuador'
            },
            {
                name: 'Nicole',
                email: 'nicole@email.com',
                age: 43,
                country: 'Colombia'
            },
            {
                name: 'Natasha',
                email: 'natasha@email.com',
                age: 54,
                country: 'Ecuador'
            },
            {
                name: 'Michael',
                email: 'michael@email.com',
                age: 15,
                country: 'Colombia'
            },
            {
                name: 'Nicolás',
                email: 'nicolas@email.com',
                age: 43,
                country: 'Colombia'
            }
        ];

        vm.multipleDemo = {};
        vm.multipleDemo.selectedPeople = [vm.people[2], vm.people[4]];

        //Clone Input Append
        $scope.inputs = [];
        $scope.addfield = function () { //Add
            var itemIndex = 0;
            if ($scope.inputs.length) {
                itemIndex = ($scope.inputs[$scope.inputs.length - 1].itemIndex) + 1;
            }
            $scope.inputs.push({
                itemIndex: itemIndex
            });
        }
        $scope.removefield = function (i) { //Remove
            $scope.inputs.splice(i, 1);
        }


        //Clone Angular Select
        $scope.selectbox = [];

        $scope.addSelectfield = function () { //Add
            var itemIndex = 0;
            if ($scope.selectbox.length) {
                itemIndex = ($scope.selectbox[$scope.selectbox.length - 1].itemIndex) + 1;
            }
            $scope.selectbox.push({
                itemIndex: itemIndex
            });
        }
        $scope.removeSelectfield = function (i) { //Remove
            $scope.selectbox.splice(i, 1);
        }

        //Clone Angular Select
        $scope.multiselectbox = [];

        $scope.addMultiSelectfield = function () { //Add
            var itemIndex = 0;
            if ($scope.multiselectbox.length) {
                itemIndex = ($scope.multiselectbox[$scope.multiselectbox.length - 1].itemIndex) + 1;
            }
            $scope.multiselectbox.push({
                itemIndex: itemIndex
            })
        }
        $scope.removeMultiSelectfield = function (i) { //Remove
            $scope.multiselectbox.splice(i, 1);
        }

        //Clone Input + Angular Select
        $scope.inputselectbox = [];

        $scope.addinputSelectfield = function () { //Add
            var itemIndex = 0;
            if ($scope.inputselectbox.length) {
                itemIndex = ($scope.inputselectbox[$scope.inputselectbox.length - 1].itemIndex) + 1;
            }
            $scope.inputselectbox.push({
                itemIndex: itemIndex
            })
        }
        $scope.removeInputSelectfield = function (i) { //Remove
            $scope.inputselectbox.splice(i, 1);
        }


        //Tree Grid
        function Parent($scope) {
            $scope.treedata = createSubTree(3, 4, "");
            $scope.lastClicked = null;
            $scope.buttonClick = function ($event, node) {
                $scope.lastClicked = node;
                $event.stopPropagation();
            }
            $scope.showSelected = function (sel) {
                $scope.selectedNode = sel;
            };
        }
        $scope.treedata = [{
                "name": "Aided",
                "children": [

                    {
                        "name": "UG",
                        "children": [{
                                "name": "BSc ",
                                "children": [{
                                        "name": "Physics"
                                    },
                                    {
                                        "name": "Chemistry"
                                    }
                                ]
                            },
                            {
                                "name": "BA  ",
                                "children": [{
                                        "name": "Sociology "
                                    },
                                    {
                                        "name": "Economics"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "PG",
                        "children": [{
                            "name": "MA ",
                            "children": [{
                                    "name": "Economics"
                                },
                                {
                                    "name": "Tamil"
                                }
                            ]
                        }]
                    }
                ]
            },
            {
                "name": "SF",
                "children": [{
                        "name": "SF - UG",
                        "children": [{
                                "name": "SF - BSc ",
                                "children": [{
                                        "name": "Physics"
                                    },
                                    {
                                        "name": "Chemistry"
                                    }
                                ]
                            },
                            {
                                "name": "SFfghfg - BA Sociology  Economics BA Sociology  Economics BA Sociology  Economics  ",
                                "children": [{
                                        "name": "Sociologyfghfg "
                                    },
                                    {
                                        "name": "Economics"
                                    },
                                    {
                                        "name": "UGfghfg",
                                        "children": [{
                                                "name": "BScfghg ",
                                                "children": [{
                                                        "name": "Physics"
                                                    },
                                                    {
                                                        "name": "Chemistry"
                                                    }
                                                ]
                                            },
                                            {
                                                "name": "BAgffg  ",
                                                "children": [{
                                                        "name": "Sociology "
                                                    },
                                                    {
                                                        "name": "Economics"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "name": "PGfgh",
                                        "children": [{
                                            "name": "MAfgh ",
                                            "children": [{
                                                    "name": "Economics"
                                                },
                                                {
                                                    "name": "Tamil"
                                                }
                                            ]
                                        }]
                                    }
                                ]
                            }
                        ]
                    },

                ]
            },

        ];

        //Dropzone
        $scope.dzOptions = {
            url: '/alt_upload_url',
            thumbnail: false,
            acceptedFiles: 'image/jpeg, images/jpg, image/png',
            addRemoveLinks: true,
            dictDefaultMessage: 'Click to add or drop photos',
            autoProcessQueue: false
        };


        //Profile Page only
        $scope.displayPicture = {
            dzOptions: {
                url: '/alt_upload_url',
                thumbnail: false,
                acceptedFiles: 'image/jpeg, images/jpg, image/png',
                addRemoveLinks: true,
                dictDefaultMessage: 'Click to add or drop photos',
                autoProcessQueue: false
            },

        };



    }
]);



//Time Table Controller
App.controller('TimeTableCtrl', ['$scope', '$window',
    function ($scope, $window) {

    }
]);

//Activity DashboardCtrl Controller
App.controller('ActivityDashboardCtrl', ['$scope', '$window',
    function ($scope, $window, $timeout) {

        $scope.showEditDialog = function (event) {


        };

        $scope.calendarOptions = {
            businessHours: true,
            defaultView: "month",
            editable: true,
            header: {
                left: "title",
                center: "month,agendaWeek,agendaDay",
                right: "today prev,next"
            }
        };


        $scope.events = [{
                title: "Course Plan, Lab Manuals Finalization",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu pellentesque nibh. In nisl nulla, convallis ac nulla eget, pellentesque pellentesque magna.",
                start: "2018-06-04",
                end: "2018-06-06",
                className: "fc-bg-default",
                icon: "rocket"
            },
            {
                title: "CO Definitions and mappings to PO/PSOs",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu pellentesque nibh. In nisl nulla, convallis ac nulla eget, pellentesque pellentesque magna.",
                start: "2018-06-04",
                end: "2018-06-06",
                className: "fc-bg-green",
                icon: "rocket"
            },
            {
                title: "My Event:)",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu pellentesque nibh. In nisl nulla, convallis ac nulla eget, pellentesque pellentesque magna.",
                start: "2018-05-12",
                end: "2018-05-13",
                className: "fc-bg-default",
                icon: "rocket"
            }
        ];

        $scope.calendar = {
            editable: true,
            eventClick: function () {
                $scope.$apply(function () {
                    $scope.showEditDialog()
                });
            }
        };


    }
]);

//Form Sample Form
App.controller('SampleFormCtrl', ['$scope', '$window', '$anchorScroll',
    function ($scope, $window, $anchorScroll) {

    }
]);

//Form Calendar
App.controller('CalendarCtrl', ['$scope', '$window', '$timeout',
    function ($scope, $window, $timeout) {

        $scope.showEditDialog = function (event) {


        };

        $scope.calendarOptions = {
            businessHours: true,
            defaultView: "month",
            editable: true,
            header: {
                left: "title",
                center: "month,agendaWeek,agendaDay",
                right: "today prev,next"
            }
        };


        $scope.events = [{
                title: "Go Space :)",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu pellentesque nibh. In nisl nulla, convallis ac nulla eget, pellentesque pellentesque magna.",
                start: "2018-06-27",
                end: "2018-06-27",
                className: "fc-bg-default",
                icon: "rocket"
            },
            {
                title: "My Event:)",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu pellentesque nibh. In nisl nulla, convallis ac nulla eget, pellentesque pellentesque magna.",
                start: "2018-05-12",
                end: "2018-05-13",
                className: "fc-bg-default",
                icon: "rocket"
            }
        ];

        $scope.calendar = {
            editable: true,
            eventClick: function () {
                $scope.$apply(function () {
                    $scope.showEditDialog()
                });
            }
        };


    }
]);


// Seating Arrangement
App.controller('seatingArrangementCtrl', ['$scope', '$window', '$timeout', 'dragulaService',
    function ($scope, $window, $timeout, dragulaService) {
        dragulaService.options($scope, 'student-card', {

        });

        $scope.setAllocate = [{
                roomsetNO: "01",
                allocateStudent: "BSC0001"
            },
            {
                roomsetNO: "02",
                allocateStudent: "BSC0002"
            },
            {
                roomsetNO: "03",
                allocateStudent: "BSC0003"
            },
            {
                roomsetNO: "04",
                allocateStudent: "BSC0004"
            },
            {
                roomsetNO: "05",
                allocateStudent: "BSC0005"
            },
            {
                roomsetNO: "06",
                allocateStudent: ""
            },
            {
                roomsetNO: "07",
                allocateStudent: ""
            },
            {
                roomsetNO: "08",
                allocateStudent: ""
            },
            {
                roomsetNO: "09",
                allocateStudent: ""
            },
            {
                roomsetNO: "10",
                allocateStudent: ""
            }
        ]


        $scope.setNotAllocate = ['BSC00011', 'BSC00012', 'BSC0013', 'BSC0014', 'BSC0015'];

        $scope.$on('student-card.drop', function (e, el, target, source) {

            var targetIndexID = target.attr('data-id');
            var sourceIndex = source.attr('data-id');

            if (targetIndexID) {
                if ($scope.setAllocate[targetIndexID].allocateStudent) {
                    el.remove();
                    source.append(el);
                } else {
                    if ($scope.setAllocate[sourceIndex].allocateStudent) {
                        $scope.setAllocate[targetIndexID].allocateStudent = $scope.setAllocate[sourceIndex].allocateStudent
                    }
                    delete $scope.setAllocate[sourceIndex].allocateStudent;
                }
            } else {
                if (sourceIndex && targetIndexID) {
                    if ($scope.setAllocate[sourceIndex].allocateStudent) {
                        $scope.setAllocate[targetIndexID].allocateStudent = $scope.setAllocate[sourceIndex].allocateStudent
                    }
                }
                delete $scope.setAllocate[sourceIndex].allocateStudent;
            }


        });


    }
]);

//Faculty Profile
App.controller('facultyProfileCtrl', ['$scope', '$rootScope', '$window', '$timeout', 'dragulaService',
    function ($scope, $rootScope, $window, $timeout, dragulaService) {
        $rootScope.menuToggle = function () {
            angular.element('.profile-menu-toggle i').toggleClass('la-indent')
            angular.element('.faculty-header').toggleClass('profile-fullview');
            angular.element('.content-profile').toggleClass('profile-fullview');
            angular.element('.hs-menu').toggleClass('profile-menu-hide');
        }

        var windowWidth = $(window).width();

        if (windowWidth < 992) {
            angular.element(document).on('click', 'ul.jspPane li a', function () {
                angular.element('.profile-menu-toggle i').toggleClass('la-indent')
                angular.element('.faculty-header').toggleClass('profile-fullview');
                angular.element('.content-profile').toggleClass('profile-fullview');
                angular.element('.hs-menu').toggleClass('profile-menu-hide');
            })
        }

    }
]);

//Faculty Profile
App.controller('alumniMapCtrl', ['$scope', '$rootScope', '$window', '$timeout',
    function ($scope, $rootScope, $window, $timeout) {

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
        }, );

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

/*** Alumni Profile ***/
App.controller('alumniProfileCtrl', ['$scope', '$rootScope', '$window', '$timeout',
    function ($scope, $rootScope, $window, $timeout) {
       
        $scope.menuToggle = function(){
            angular.element('.profile-vertical-wizard').toggleClass('active');
        }

        $(document).on('click', '.profile-vertical-wizard ul li a', function(){
            angular.element('.profile-vertical-wizard').toggleClass('active');
        })

    }
]);

//Syllabus Details
App.controller('syllabusDetailsCtrl', ['$scope', '$rootScope', '$window', '$timeout',
    function ($scope, $rootScope, $window, $timeout) {
        
        $scope.treeOptions = {
            accept: function(sourceNodeScope, destNodesScope, destIndex) {
                if (destNodesScope.$parent.$type === "uiTreeNode" && destNodesScope.$$ChildScope != null){
                        return true;
                }else{
                    return false;
                }
        
            }
        };

        $scope.remove = function (scope) {
            scope.remove();
        };
    
        $scope.toggle = function (scope) {
            scope.toggle();
        };
    
        $scope.newSubItem = function (scope) {
            $scope.collapsed = true;
            var nodeData = scope.$modelValue;
            nodeData.nodes.push({
              id: nodeData.id * 10 + nodeData.nodes.length,
              title: '',

            });
        };

        $scope.addCourseTitle = function(){
            var nodeData = $scope.tree2;
            nodeData.push({
                id: nodeData.id * 10 + nodeData.length,
                title: '',
                nodes: []
            });

            $('html, body').animate({
                scrollTop: $(".angular-ui-tree>ol>li:last-child").offset().top
            }, 500);

        }
    
         
        $scope.tree2 = [{
            'id': 1,
            'title': 'tree2 - item1',
            'nodes': [
                {
                    'id': 1,
                    'title': 'tree11 - item1',
                   
                  },
                  {
                    'id': 2,
                    'title': 'tree22 - item2',
                  
                  },
                  {
                    'id': 3,
                    'title': 'tree33 - item3',
                    
                  }
            ]
          }, {
            'id': 2,
            'title': 'tree2 - item2',
            'nodes': [
                {
                    'id': 1,
                    'title': 'tree2 - item1',
                   
                  },
                  {
                    'id': 2,
                    'title': 'tree2 - item12',
                    
                  }
            ]
          }, {
            'id': 3,
            'title': 'tree2 - item3',
            'nodes': [
                {
                    'id': 1,
                    'title': 'tree2 - item1',
                   
                  },
                  {
                    'id': 2,
                    'title': 'tree2 - item12',
                  
                  }
            ]
          }, {
            'id': 4,
            'title': 'tree2 - item4',
            'nodes': [
                {
                    'id': 1,
                    'title': 'tree2 - item1',
                   
                  },
                  {
                    'id': 2,
                    'title': 'tree2 - item12',
                   
                  }
            ]
        }];
       
       
    }
]);
