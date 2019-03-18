// Create our angular module
var App = angular.module('app', [
	'ngStorage',
	'ui.router',
	'oc.lazyLoad',
	'ngSanitize',
	'angular-flatpickr',
	'ui.select',
	'ui.tinymce',
	'angular-fullcalendar',
	'zingchart-angularjs',
	'angular-progress-arc',
	'app.auth',
	'ghiscoding.validation',
	'pascalprecht.translate'
]);
App.config(['$translateProvider', function ($translatePartialLoader) {
    $translatePartialLoader.useStaticFilesLoader({
      prefix: 'bower_components/angular-validation-ghiscoding/locales/validation/',
      suffix: '.json'
      });

      // load English ('en') table on startup
      $translatePartialLoader.preferredLanguage('en').fallbackLanguage('en');
      $translatePartialLoader.useSanitizeValueStrategy('escapeParameters');

}]);
// Router configuration
App.config(['$stateProvider', '$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/home');
		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: 'app/modules/dashboard/dashboard.html',
				controller: 'dashboardCtrl'
			})
			.state('myprofile', {
				url: '/myprofile',
				templateUrl: 'app/modules/myprofile/myprofile.html',
				controller: 'myprofileCtrl'
			})

			.state('jobs', {
				url: '/jobs',
				templateUrl: 'app/modules/jobs/jobs.html',
				controller: 'jobCtrl',
				//  resolve: {
				// 	loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
				// 		return $ocLazyLoad.load({
				// 			insertBefore: '#css-bootstrap',
				// 			serie: true,
				// 			files: [
				// 				'bower_components/angular-validation-ghiscoding/locales/validation/'
				// 			]
				// 		});
				// 	}]
				// }
			})
			.state('viewJob', {
				url: '/viewJob/:jobId',
				templateUrl: 'app/modules/jobs/viewJob.html',
				controller: 'viewJobCtrl'
			})
			.state('news', {
				url: '/news',
				templateUrl: 'app/modules/news/news.html',
				controller: 'newsCtrl',
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
						return $ocLazyLoad.load({
							insertBefore: '#css-bootstrap',
							serie: true,
							files: [
								'bower_components/dropzone/dist/dropzone.css',
								'bower_components/dropzone/dist/dropzone.js',
								'bower_components/ng-dropzone/dist/ng-dropzone.min.js'
							]
						});
					}]
				}

			})
			.state('viewNews', {
				url: '/viewNews/:newsId',
				templateUrl: 'app/modules/news/viewNews.html',
				controller: 'viewNewsCtrl'
			})

			// .state('events', {
			// 	url: '/events',
			// 	templateUrl: 'app/modules/events/events.html',
			// 	controller:'eventCtrl'
			// })

			.state('event', {
				url: '/event',
				templateUrl: 'app/modules/event/event.html',
				controller: 'alumnieventCtrl'
			})
			.state('viewEvent', {
				url: '/viewEvent/:eventId',
				templateUrl: 'app/modules/event/viewEvent.html',
				controller: 'viewEventCtrl'
			})
			.state('bymap', {
				url: '/bymap',
				templateUrl: 'app/modules/bymap/bymap.html',
				controller: 'alumniMapCtrl',
				resolve: { 
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            insertBefore: '#css-alumni',
                            serie: true,
                            files :[ 
                                'assets/css/custom/alumni.css', 
                                'bower_components/leaflet/dist/leaflet.css',   
                                'bower_components/leaflet.markercluster/dist/MarkerCluster.css',
                                'bower_components/leaflet.markercluster/dist/MarkerCluster.Default.css',
                                'bower_components/leaflet/dist/leaflet.js',
                                'bower_components/leaflet/dist/leaflet-src.js',
                                'bower_components/leaflet.markercluster/dist/leaflet.markercluster.js',
                                'bower_components/leaflet.markercluster/dist/leaflet.markercluster-src.js'
                            ]
                        });
                    }]
                }
			})
			.state('bySearch', {
				url: '/bySearch',
				templateUrl: 'app/modules/bySearch/bySearch.html',
				controller: 'studentCtrl'
			})
			.state('alumniDetails', {
				url: '/alumniDetails',
				templateUrl: 'app/modules/alumniDetails/alumni.html',
				controller: 'studentCtrl',
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
						return $ocLazyLoad.load({
							insertBefore: '#css-bootstrap',
							serie: true,
							files: [
								'bower_components/dropzone/dist/dropzone.css',
								'bower_components/dropzone/dist/dropzone.js',
								'bower_components/ng-dropzone/dist/ng-dropzone.min.js'
							]
						});
					}]
				}
			})
			.state('donation', {
				url: '/donation',
				templateUrl: 'app/modules/donation/donation.html',
				controller: 'donationCtrl',
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
						return $ocLazyLoad.load({
							insertBefore: '#css-bootstrap',
							serie: true,
							files: [
								'bower_components/dropzone/dist/dropzone.css',
								'bower_components/dropzone/dist/dropzone.js',
								'bower_components/ng-dropzone/dist/ng-dropzone.min.js'
							]
						});
					}]
				}
			})
			.state('viewDonation', {
				url: '/viewDonation/:donationId',
				templateUrl: 'app/modules/donation/viewDonation.html',
				controller: 'viewDonationCtrl'
			})
			.state('editAlumni', {
				url: '/editAlumni/:alumniID',
				templateUrl: 'app/modules/dashboard/editAlumni.html',
				controller: 'editAlumniCtrl'
			})
			.state('groupMembershipList', {
				url: '/groupMembershipList',
				templateUrl: 'app/modules/grouplist/groupMemberList.html',
				controller: 'groupMemberListCtrl'
			})
			.state('groupList', {
				url: '/groupList',
				templateUrl: 'app/modules/grouplist/grouplist.html',
				controller: 'grouplistCtrl'
			})
			.state('addMember', {
				url: '/groupMembershipList/:state/addMember/:alumni',
				templateUrl: 'app/modules/grouplist/addMember.html',
				controller: 'addMemberCtrl'
			})
			.state('addMembersExcelSheet', {
				url: '/groupMembershipList/addMembersExcelSheet',
				templateUrl: 'app/modules/grouplist/addMembersExcelSheet.html',
				controller: 'addMembersExcelSheetCtrl'
			})
			.state('email', {
				url: '/email',
				templateUrl: 'app/modules/email/email.html',
				controller: 'emailCtrl'
			})

	}
]);

// Tooltips and Popovers configuration
/** App.config(['$uibTooltipProvider',
		function ($uibTooltipProvider) {
			$uibTooltipProvider.options({
				appendToBody: true
			});
		}
	]); **/

App.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
}])

// Custom UI helper functions
App.factory('uiHelpers', function () {
	return {

		// Handles #main-container height resize to push footer to the bottom of the page
		uiHandleMain: function () {
			var lMain = jQuery('#main-container');
			var hWindow = jQuery(window).height();
			var hHeader = jQuery('#header-navbar').outerHeight();
			var hFooter = jQuery('#page-footer').outerHeight();

			if (jQuery('#page-container').hasClass('header-navbar-fixed')) {
				lMain.css('min-height', hWindow - hFooter);
			} else {
				lMain.css('min-height', hWindow - (hHeader + hFooter));
			}
		},
		// Handles transparent header functionality
		uiHandleHeader: function () {
			var lPage = jQuery('#page-container');

			if (lPage.hasClass('header-navbar-fixed') && lPage.hasClass('header-navbar-transparent')) {
				jQuery(window).on('scroll', function () {
					if (jQuery(this).scrollTop() > 20) {
						lPage.addClass('header-navbar-scroll');
					} else {
						lPage.removeClass('header-navbar-scroll');
					}
				});
			}
		},

		// Handles page loader functionality
		uiLoader: function (mode) {
			var lBody = jQuery('body');
			var lpageLoader = jQuery('#page-loader');

			if (mode === 'show') {
				if (lpageLoader.length) {
					lpageLoader.fadeIn(250);
				} else {
					lBody.prepend('<div id="page-loader"></div>');
				}
			} else if (mode === 'hide') {
				if (lpageLoader.length) {
					lpageLoader.fadeOut(250);
				}
			}
		},
		// Handles blocks API functionality
		uiBlocks: function (block, mode, button) {
			// Set default icons for fullscreen and content toggle buttons
			var iconFullscreen = 'si si-size-fullscreen';
			var iconFullscreenActive = 'si si-size-actual';
			var iconContent = 'icon-arrow-up32';
			var iconContentActive = 'icon-arrow-down32';

			if (mode === 'init') {
				// Auto add the default toggle icons
				switch (button.data('action')) {
					case 'fullscreen_toggle':
						button.html('<i class="' + (button.closest('.block').hasClass('block-opt-fullscreen') ? iconFullscreenActive : iconFullscreen) + '"></i>');
						break;
					case 'content_toggle':
						button.html('<i class="' + (button.closest('.block').hasClass('block-opt-hidden') ? iconContentActive : iconContent) + '"></i>');
						break;
					default:
						return false;
				}
			} else {
				// Get block element
				var elBlock = (block instanceof jQuery) ? block : jQuery(block);

				// If element exists, procceed with blocks functionality
				if (elBlock.length) {
					// Get block option buttons if exist (need them to update their icons)
					var btnFullscreen = jQuery('[data-js-block-option][data-action="fullscreen_toggle"]', elBlock);
					var btnToggle = jQuery('[data-js-block-option][data-action="content_toggle"]', elBlock);

					// Mode selection
					switch (mode) {
						case 'fullscreen_toggle':
							elBlock.toggleClass('block-opt-fullscreen');

							// Enable/disable scroll lock to block
							if (elBlock.hasClass('block-opt-fullscreen')) {
								jQuery(elBlock).scrollLock('enable');
							} else {
								jQuery(elBlock).scrollLock('disable');
							}

							// Update block option icon
							if (btnFullscreen.length) {
								if (elBlock.hasClass('block-opt-fullscreen')) {
									jQuery('i', btnFullscreen)
										.removeClass(iconFullscreen)
										.addClass(iconFullscreenActive);
								} else {
									jQuery('i', btnFullscreen)
										.removeClass(iconFullscreenActive)
										.addClass(iconFullscreen);
								}
							}
							break;
						case 'fullscreen_on':
							elBlock.addClass('block-opt-fullscreen');

							// Enable scroll lock to block
							jQuery(elBlock).scrollLock('enable');

							// Update block option icon
							if (btnFullscreen.length) {
								jQuery('i', btnFullscreen)
									.removeClass(iconFullscreen)
									.addClass(iconFullscreenActive);
							}
							break;
						case 'fullscreen_off':
							elBlock.removeClass('block-opt-fullscreen');

							// Disable scroll lock to block
							jQuery(elBlock).scrollLock('disable');

							// Update block option icon
							if (btnFullscreen.length) {
								jQuery('i', btnFullscreen)
									.removeClass(iconFullscreenActive)
									.addClass(iconFullscreen);
							}
							break;
						case 'content_toggle':
							elBlock.toggleClass('block-opt-hidden');

							// Update block option icon
							if (btnToggle.length) {
								if (elBlock.hasClass('block-opt-hidden')) {
									jQuery('i', btnToggle)
										.removeClass(iconContent)
										.addClass(iconContentActive);
								} else {
									jQuery('i', btnToggle)
										.removeClass(iconContentActive)
										.addClass(iconContent);
								}
							}
							break;
						case 'content_hide':
							elBlock.addClass('block-opt-hidden');

							// Update block option icon
							if (btnToggle.length) {
								jQuery('i', btnToggle)
									.removeClass(iconContent)
									.addClass(iconContentActive);
							}
							break;
						case 'content_show':
							elBlock.removeClass('block-opt-hidden');

							// Update block option icon
							if (btnToggle.length) {
								jQuery('i', btnToggle)
									.removeClass(iconContentActive)
									.addClass(iconContent);
							}
							break;
						case 'refresh_toggle':
							elBlock.toggleClass('block-opt-refresh');

							// Return block to normal state if the demostration mode is on in the refresh option button - data-action-mode="demo"
							if (jQuery('[data-js-block-option][data-action="refresh_toggle"][data-action-mode="demo"]', elBlock).length) {
								setTimeout(function () {
									elBlock.removeClass('block-opt-refresh');
								}, 2000);
							}
							break;
						case 'state_loading':
							elBlock.addClass('block-opt-refresh');
							break;
						case 'state_normal':
							elBlock.removeClass('block-opt-refresh');
							break;
						case 'close':
							elBlock.hide();
							break;
						case 'open':
							elBlock.show();
							break;
						default:
							return false;
					}
				}
			}
		}
	};
});

// Run our App
App.run(function ($rootScope, uiHelpers) {
	// Access uiHelpers easily from all controllers
	$rootScope.helpers = uiHelpers;

	// On window resize or orientation change resize #main-container & Handle scrolling
	var resizeTimeout;

	jQuery(window).on('resize orientationchange', function () {
		clearTimeout(resizeTimeout);

		resizeTimeout = setTimeout(function () {
			$rootScope.helpers.uiHandleMain();
		}, 150);
	});
});

// Application Main Controller
App.controller('AppCtrl', ['$scope', '$rootScope', '$localStorage', '$window',
	function ($scope, $rootScope, $localStorage, $window) {
		// Template Settings
		$scope.webapp = {
			version: '3.1', // Template version
			localStorage: false, // Enable/Disable local storage
			settings: {

				headerFixed: true // Enables fixed header
			}
		};

		// If local storage setting is enabled
		if ($scope.webapp.localStorage) {
			// Save/Restore local storage settings
			if ($scope.webapp.localStorage) {
				if (angular.isDefined($localStorage.webappSettings)) {
					$scope.webapp.settings = $localStorage.webappSettings;
				} else {
					$localStorage.webappSettings = $scope.webapp.settings;
				}
			}

			// Watch for settings changes
			$scope.$watch('webapp.settings', function () {
				// If settings are changed then save them to localstorage
				$localStorage.webappSettings = $scope.webapp.settings;
			}, true);
		}

		// When view content is loaded
		$scope.$on('$viewContentLoaded', function () {
			// Hide page loader
			$scope.helpers.uiLoader('hide');

			// Resize #main-container
			$scope.helpers.uiHandleMain();
		});

		//Keycloak Logout
		$scope.logout = function () {
			$rootScope.Auth.logout();
		}
	}
]);

// Header Controller
App.controller('HeaderCtrl', ['$scope', '$localStorage', '$window',
	function ($scope, $localStorage, $window) {
		// When view content is loaded
		$scope.$on('$includeContentLoaded', function () {
			// Transparent header functionality

		});
	}
]);

//Table Pagination
App.filter('startFrom', function () {
	return function (input, start) {
		start = +start;
		return input.slice(start);
	}
});


function bootstrap() {
	//initialize and login to keycloak as well as attach event handlers
	angular.module('app').run(['$rootScope', '$location', 'Auth', 'rolesToEntitlements', 'roleToStates', runKeycloak]);
	function runKeycloak($rootScope, $location, Auth, rolesToEntitlements, roleToStates) {
		$rootScope.Auth = Auth;

		//login to keycloak
		$rootScope.$on("event:auth-loginRequired", function () {
			console.log("Event auth-loginRequired acquired")
			var loginOptions = {
				redirectUri: window.location,
				prompt: "none",
				maxAge: 3600,
				loginHint: "",
				action: "login",
				locale: "en"
			};
			console.log(createLoginUrl(loginOptions));
			Auth.login(loginOptions);
		});
	}//end init
}
bootstrap();