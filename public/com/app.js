'use strict';
//This is the only item you need to edit within the app.js this will change it application wide 
//This will also allow you to use 'app' to tie it to the application and it will inherit everything from the application core
var appName = 'BaylySeed';

//Define the Application in one spot and have an alias that doesn't call all the requirements 
var globalApp = angular.module(appName,['ngRoute',// jshint ignore:line
                                        'ngCookies',
                                        'myApp.module.Company.Home.Controller',
                                        'myApp.module.Company.About.Controller',
                                        'myApp.module.Registration.Register.Controller',
                                        'myApp.module.Registration.Confirm.Controller',
                                        'myApp.module.Events.Main.Controller',
                                        'myApp.module.Events.Details.Controller',
                                        'myApp.module.Products.Main.Controller',
                                        'myApp.module.Products.Details.Controller',
                                        'myApp.module.Global.Authentication.Controller',
                                        'myApp.module.Global.Error.Controller'
                                       ]);


//Europaapp is used by items that don't require modules loaded, mostly directives that allow it to be part of the application without the need to log the dependencies needed by the application
//overall
var baylyApp = angular.module(appName);// jshint ignore:line


//This is the run command within angular and it houses items that are needed to on running the application
//This is the second function to run after .config in the application instantiation
globalApp.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        //This sets the user credentials to the cookieStore allowing the user to stay logged in even after they close the browser
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authkey; // jshint ignore:line
            globalApp.value('user', {
                authKey: $rootScope.globals.currentUser.authkey,
                username: $rootScope.globals.currentUser.username
            });
        }
        
        //This is the range function , this is global since it can be used to run an ng-repeat or other item 
        //Using this to allow us to do ng-repeat on a numeric step index. 
        $rootScope.range = function(min, max, step){
            step = step || 1;
            var input = [];
            for (var i = min; i <= max; i += step) input.push(i);// jshint ignore:line
            return input;
          };
 
        //Once all of the dependencies are resolved $routeChangeSuccess is fired.
        //This has a few functions that the application uses including setting the active for the menu and the dynamic title
        $rootScope.$on("$routeChangeSuccess", function(event, current, previous){// jshint ignore:line
                //Change page title, based on Route information
                $rootScope.pageTitle = current.$$route.title;
                $rootScope.menuGroup = current.$$route.menuGroup;
                $rootScope.protected = current.$$route.protectedArea;
                $rootScope.metaDescription = current.$$route.description;
                $rootScope.keywords = current.$$route.metaKeywords;
                $rootScope.breadCrumb = current.$$route.breadcrumbList;
                if(current.protectedArea && !$rootScope.globals.currentUser){
                    $location.path('/login');
                }
                $rootScope.isActive = function (viewLocation) { 
                return viewLocation === current.$$route.menuGroup;
                    
            };
        });
        
        
    }]);

//This is the default route all routes are located within the modules thus making them stand alone objects so to speak 
//setting this will change the default location that the spa points to . 
baylyApp.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {// jshint ignore:line

    $routeProvider.otherwise({ redirectTo: '/login' });
    
        // enable html5Mode for pushstate ('#'-less URLs)
        $locationProvider.html5Mode(true);
        
    //This is the global interceptor that will handle the 401 error and reload the page 
    $httpProvider.interceptors.push(function ($q) {
        return {
            'response': function (response) {
                //Will only be called for HTTP up to 300
                console.log(response);
                return response;
            },
            'responseError': function (rejection) {
                if(rejection.status === 401) {
                    location.reload();
                }
                if(rejection.status === 404) {
                    location.path('/error');
                }
                if(rejection.status === 405) {
                    location.path('/error');
                }
                if(rejection.status === 400) {
                    location.path('/error');
                }
                if(rejection.status === 304) {
                    location.path('/error');
                }
                return $q.reject(rejection);
            }
        };
    });
    
    //End of the interceptor
    
    
}]);


/* jshint ignore:start */
baylyApp.directive('aDisabled', function() {
    return {
        compile: function(tElement, tAttrs, transclude) {
            //Disable ngClick
            tAttrs["ngClick"] = "!("+tAttrs["aDisabled"]+") && ("+tAttrs["ngClick"]+")";

            //return a link function
            return function (scope, iElement, iAttrs) {

                //Toggle "disabled" to class when aDisabled becomes true
                scope.$watch(iAttrs["aDisabled"], function(newValue) {
                    if (newValue !== undefined) {
                        iElement.toggleClass("disabled", newValue);
                    }
                });

                //Disable href on click
                iElement.on("click", function(e) {
                    if (scope.$eval(iAttrs["aDisabled"])) {
                        e.preventDefault();
                    }
                });
            };
        }
    };
});
/* jshint ignore:end */
'use strict';

//This is the directive specification pulling in the view template and restricting the use of the directive. 
baylyApp.directive('breadcrumb', function() {// jshint ignore:line
  return {
    restrict: 'A',
    controller: 'breadcrumbController',
    templateUrl: '/com/directives/views/breadcrumb.html'
  };
});

//This is the controller with functions that are specific to the pagination, because some of those functions are global they have been added into the 
//application wide scope for use in the application. if you need to debug them you can do that in the app.js but they should be working fine and not require 
//editing 
baylyApp.controller('breadcrumbController',// jshint ignore:line
    ['$rootScope','$routeParams',
    function ($scope) {// jshint ignore:line

    }]);
/* jshint ignore:start */
'use strict';

baylyApp.directive("loadMoreData", [function() {
        return {
            restrict: 'ACE',
            link: function($scope, element, attrs, ctrl) {
                var raw = element[0];
                element.scroll(function() {
                    if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight){
                        $scope.$apply("loadMoreData()");
                    }
                });
            }
        };
 
}])
/* jshint ignore:end */
//This is the paginate directive , this directive also pulls a template to show the pagination bar 
//with a few variables this directive will control pagination on the specified page, this is an attribute
//restriction so you can use it like this <span paginate></span> and by setting currPage and pageSize (number of items per page)
//this will show and paginate through items on the page . view the events.html for a full example of it. 
'use strict';

//This is the directive specification pulling in the view template and restricting the use of the directive. 
baylyApp.directive('paginate', function() {// jshint ignore:line
  return {
    restrict: 'A',
    controller: 'paginationController',
    templateUrl: '/com/directives/views/paginate.html'
  };
});


//This is the filter that filters the information on the ng-repeat to show only the items per page. 
baylyApp.filter('pagination', function(){// jshint ignore:line
 return function(input, start){
  start = +start;
  return input.slice(start);
 };
    
});


//This is the controller with functions that are specific to the pagination, because some of those functions are global they have been added into the 
//application wide scope for use in the application. if you need to debug them you can do that in the app.js but they should be working fine and not require 
//editing 
baylyApp.controller('paginationController',// jshint ignore:line
    ['$rootScope',
    function ($scope) {
        
        //These are the pagination functions, these are available throughout the application now 
        $scope.curPage = 0;
        $scope.pageSize = 8;
        
        //This function will calculate the number of pages based on pageSize by dividing the data by it. 
        //This is used to tell you how many pages total are going to be displayed 
        $scope.numberOfPages = function(dataList,pageSize) {
            return Math.ceil(dataList.length / pageSize);
        };
        
        //This function checks the total pages to see if you have gone beyond the beginning or end allowing you to disable the prev and next button
        $scope.checkTotalPages = function(thisPage,dataList,pageSize) {
            var tmpTotal = Math.ceil(dataList.length / pageSize);
            var tmpReturn = false;
                if(thisPage <= tmpTotal){
                    tmpReturn = true;
                }
            return tmpReturn;
        };
        
        //This gives you the PageCount minus one to show the pages on the pagination
        $scope.pagPageCount = function(dataList,pageSize) {
            var tmpRet =  Math.ceil(dataList.length / pageSize);
                tmpRet = tmpRet - 1;
            return tmpRet;
        };
        
        $scope.checkBeginningPage = function(page) {
             var tmpret = true;
            if(page <= 0){
                   tmpret = false;
            }
            return tmpret;
        };
        
        
        //This tells you wether you are on the current page , allowing you to activate the page number on pagination 
        $scope.isCurrentPage = function(thisPage) {
            var tmpReturn = false;
            if (thisPage === $scope.curPage){
                tmpReturn = true;   
            }
            return tmpReturn;
        };
        
    }]);
//This is a simple directive example that showcases how to create a basic directive. 
//This is a mouseover directive 
'use strict';

baylyApp.directive('showsMessageWhenHovered', function() {// jshint ignore:line
  return function(scope, element, attributes) {
    var originalMessage = scope.message;
    element.bind('mouseenter', function() {
      scope.message = attributes.message;
      scope.$apply();
    });
    element.bind('mouseleave', function() {
      scope.message = originalMessage;
      scope.$apply();
    });
  };
});


/* jshint ignore:start */
'use strict';
baylyApp.directive('slick', [
  '$timeout',
  function ($timeout) {
    return {
      restrict: 'AEC',
      scope: {
        initOnload: '@',
        data: '=',
        currentIndex: '=',
        accessibility: '@',
        adaptiveHeight: '@',
        arrows: '@',
        asNavFor: '@',
        appendArrows: '@',
        appendDots: '@',
        autoplay: '@',
        autoplaySpeed: '@',
        centerMode: '@',
        centerPadding: '@',
        cssEase: '@',
        customPaging: '&',
        dots: '@',
        draggable: '@',
        easing: '@',
        fade: '@',
        focusOnSelect: '@',
        infinite: '@',
        initialSlide: '@',
        lazyLoad: '@',
        onBeforeChange: '&',
        onAfterChange: '&',
        onInit: '&',
        onReInit: '&',
        onSetPosition: '&',
        pauseOnHover: '@',
        pauseOnDotsHover: '@',
        responsive: '=',
        rtl: '@',
        slide: '@',
        slidesToShow: '@',
        slidesToScroll: '@',
        speed: '@',
        swipe: '@',
        swipeToSlide: '@',
        touchMove: '@',
        touchThreshold: '@',
        useCSS: '@',
        variableWidth: '@',
        vertical: '@',
        prevArrow: '@',
        nextArrow: '@'
      },
      link: function (scope, element, attrs) {
        var destroySlick, initializeSlick, isInitialized;
        destroySlick = function () {
          return $timeout(function () {
            var slider;
            slider = $(element);
            slider.slick('unslick');
            slider.find('.slick-list').remove();
            return slider;
          });
        };
        initializeSlick = function () {
          return $timeout(function () {
            var currentIndex, customPaging, slider;
            slider = $(element);
            if (scope.currentIndex != null) {
              currentIndex = scope.currentIndex;
            }
            customPaging = function (slick, index) {
              return scope.customPaging({
                slick: slick,
                index: index
              });
            };
            slider.slick({
              accessibility: scope.accessibility !== 'false',
              adaptiveHeight: scope.adaptiveHeight === 'true',
              arrows: scope.arrows !== 'false',
              asNavFor: scope.asNavFor ? scope.asNavFor : void 0,
              appendArrows: scope.appendArrows ? $(scope.appendArrows) : $(element),
              appendDots: scope.appendDots ? $(scope.appendDots) : $(element),
              autoplay: scope.autoplay === 'true',
              autoplaySpeed: scope.autoplaySpeed != null ? parseInt(scope.autoplaySpeed, 10) : 3000,
              centerMode: scope.centerMode === 'true',
              centerPadding: scope.centerPadding || '50px',
              cssEase: scope.cssEase || 'ease',
              customPaging: attrs.customPaging ? customPaging : void 0,
              dots: scope.dots === 'true',
              draggable: scope.draggable !== 'false',
              easing: scope.easing || 'linear',
              fade: scope.fade === 'true',
              focusOnSelect: scope.focusOnSelect === 'true',
              infinite: scope.infinite !== 'false',
              initialSlide: scope.initialSlide || 0,
              lazyLoad: scope.lazyLoad || 'ondemand',
              beforeChange: attrs.onBeforeChange ? scope.onBeforeChange : void 0,
              onReInit: attrs.onReInit ? scope.onReInit : void 0,
              onSetPosition: attrs.onSetPosition ? scope.onSetPosition : void 0,
              pauseOnHover: scope.pauseOnHover !== 'false',
              responsive: scope.responsive || void 0,
              rtl: scope.rtl === 'true',
              slide: scope.slide || 'div',
              slidesToShow: scope.slidesToShow != null ? parseInt(scope.slidesToShow, 10) : 1,
              slidesToScroll: scope.slidesToScroll != null ? parseInt(scope.slidesToScroll, 10) : 1,
              speed: scope.speed != null ? parseInt(scope.speed, 10) : 300,
              swipe: scope.swipe !== 'false',
              swipeToSlide: scope.swipeToSlide === 'true',
              touchMove: scope.touchMove !== 'false',
              touchThreshold: scope.touchThreshold ? parseInt(scope.touchThreshold, 10) : 5,
              useCSS: scope.useCSS !== 'false',
              variableWidth: scope.variableWidth === 'true',
              vertical: scope.vertical === 'true',
              prevArrow: scope.prevArrow ? $(scope.prevArrow) : void 0,
              nextArrow: scope.nextArrow ? $(scope.nextArrow) : void 0
            });
            slider.on('init', function (sl) {
              if (attrs.onInit) {
                scope.onInit();
              }
              if (currentIndex != null) {
                return sl.slideHandler(currentIndex);
              }
            });
            slider.on('afterChange', function (event, slick, currentSlide, nextSlide) {
              if (scope.onAfterChange) {
                scope.onAfterChange();
              }
              if (currentIndex != null) {
                return scope.$apply(function () {
                  currentIndex = currentSlide;
                  return scope.currentIndex = currentSlide;
                });
              }
            });
            return scope.$watch('currentIndex', function (newVal, oldVal) {
              if (currentIndex != null && newVal != null && newVal !== currentIndex) {
                return slider.slick('slickGoTo', newVal);
              }
            });
          });
        };
        if (scope.initOnload) {
          isInitialized = false;
          return scope.$watch('data', function (newVal, oldVal) {
            if (newVal != null) {
              if (isInitialized) {
                destroySlick();
              }
              initializeSlick();
              return isInitialized = true;
            }
          });
        } else {
          return initializeSlick();
        }
      }
    };
  }
]);
/* jshint ignore:end */
'use strict';

angular.module('myApp.module.Company.About.Controller', ['ngRoute'])// jshint ignore:line
    

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/about', {
            controller: 'aboutController',
            templateUrl: 'com/modules/Company/views/about.html',
            hideMenus: true,
            protectedArea: false,
            title: 'About',
            menuGroup: 'About',
            description: 'This is the Description of the about page',
            keywords: 'about,website,aboutme',
            breadcrumbList: [{view: '/',title:'Home'},{view: '/about', title: 'About Main'}]
      });
    }])


    .controller('aboutController', ['$scope', function($scope) {
        $scope.message = 'This is the about message!';
    }]);
//This is the home controller that simply sets a message and returns it to the view.
'use strict';

angular.module('myApp.module.Company.Home.Controller', ['ngRoute'])// jshint ignore:line

.config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/', {
            controller: 'HomeController',
            templateUrl: 'com/modules/Company/views/home.html',
            hideMenus: false,
            protectedArea: true,
            title: 'Welcome',
            menuGroup: 'Home',
            description: 'This is the Description of the Home page',
            keywords: 'Home,Homey',
            breadcrumbList: [{view: '/',title:'Home'}]
      });
    }])


.controller('HomeController',// jshint ignore:line
    ['$scope',
    function ($scope) {
      $scope.message = 'This is the Home page message from the controller';
    }]);
'use strict';

angular.module('myApp.module.Events.Details.Controller', ['ngRoute','myApp.module.Events.Main.Factory'])// jshint ignore:line
    

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/event-details/:itemID?', {
            controller: 'edController',
            templateUrl: 'com/modules/Events/views/event-details.html',
            hideMenus: true,
            protectedArea: true,
            title: 'Event Details',
            menuGroup: 'Events',
            description: 'This is the event details screen',
            keywords: 'keyword',
            breadcrumbList: [{view: '/',title:'Home'},{view: '/events-main', title: 'Events Main'},{view: '/event-details', title: 'Event Details '}]
      });
    }])


    .controller('edController',// jshint ignore:line
    ['$scope','$rootScope', 'EventFactory','$routeParams',
    function ($scope,$rootScope, EventFactory,$routeParams) {
        //List of functions that Products uses 
        $rootScope.itemID = $routeParams.itemID;
        //This function returns the data from the Event Details service and assigns them to an eventList
        //This variable is used to also help utilize the pagination
        //This function returns the data from the events service and assigns them to an eventList
        //This variable is what is used for the pagination
        EventFactory.getEvent(function(dataResponse) {
            $scope.EventDetail = dataResponse.data[0];
        });
        
        //This is the general service message to demo setting a variable and displaying it on the page 
        $scope.message = 'This is the Event Details Page';       
    }]);
'use strict';
//This is the event controller, this houses all functions and items that are needed for the event


angular.module('myApp.module.Events.Main.Controller', ['ngRoute','myApp.module.Events.Main.Factory'])// jshint ignore:line


.config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/events-main', {
            controller: 'EventController',
            templateUrl: 'com/modules/Events/views/events-main.html',
            hideMenus: true,
            protectedArea: true,
            title: 'Events Main',
            menuGroup: 'Events',
            description: 'This is the Description of the Events page',
            keywords: 'Events, Events Page',
            breadcrumbList: [{view: '/',title:'Home'},{view: '/events-main', title: 'Events Main'}]
      });
    }])


.controller('EventController',// jshint ignore:line
    ['$rootScope', '$scope', 'EventFactory',
    function ($rootScope, $scope, EventFactory) {
        //List of functions that Event uses 
        
        //This function returns the data from the events service and assigns them to an eventList
        //This variable is what is used for the pagination
        EventFactory.listEvents(function(dataResponse) {
            $scope.dataList = dataResponse.data;
        });
        
        //This is the general service message to demo setting a variable and displaying it on the page 
        $scope.message = 'This is the Events page message from the controller';
        //This resets the currentPage on pagination on the events page so every time you go to it , it will reset it to the first page
        $scope.curPage = 0;
        //This sets the number of items that are shown on the page for pagination
        $scope.pageSize = 12;        
    }]);
//This is the example service that shows how to setup and utilize a static service to allow for front end development. 
//This system is very simple and basically returns data. 
'use strict';


angular.module('myApp.module.Events.Main.Factory', [])// jshint ignore:line

.factory('EventFactory',// jshint ignore:line
    ['$rootScope','$http',
    function ($rootScope,$http) {
        var service = {};
            $rootScope.serviceMessage = 'This is the about page message from the controller';
        
            service.listEvents = function (callbackFunc) {
                
               $http({
                        method: 'GET',
                        url: '/rest/events/listall.json'
                     }).success(function(data){
                        // With the data succesfully returned, call our callback
                        callbackFunc(data);
                    }).error(function(){
                        alert('error');// jshint ignore:line
                    });
            };
        
        
        
         service.getEvent = function (callbackFunc) {
                
               $http({
                        method: 'GET',
                        url: '/rest/events/getEvent.json',
                        params: {eventID: $rootScope.itemID}
                     }).success(function(data){
                        // With the data succesfully returned, call our callback
                        callbackFunc(data);
                    }).error(function(){
                        alert('error');// jshint ignore:line
                    });
            };
        
        
         return service;
    }]);
//This is the Controller for the login process this process brings the service information (Login info)
//Then it takes it and sets the credentials and clears the credentials
'use strict';


angular.module('myApp.module.Global.Authentication.Controller', ['ngRoute','myApp.module.Global.Authentication.Factory'])// jshint ignore:line


.config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/login', {
            controller: 'LoginController',
            templateUrl: 'com/modules/Global/views/login.html',
            hideMenus: true,
            protectedArea: false,
            title: 'Login',
            menuGroup: 'Login',
            description: 'This is the Description of the Login page',
            keywords: 'Login,Authentication',
            breadcrumbList: [{view: '/',title:'Home'},{view: '/login', title: 'Login Main'}]
      });
    }])

.controller('LoginController',// jshint ignore:line
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {
        // reset login status
        AuthenticationService.ClearCredentials();
 
        $scope.login = function () {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function(response) {
                if(response.success) {
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    $location.path('/');
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };
    }]);
'use strict';

angular.module('myApp.module.Global.Error.Controller', ['ngRoute'])// jshint ignore:line
    

    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/error', {
            controller: 'errorController',
            templateUrl: 'com/modules/Global/views/error.html',
            hideMenus: true,
            protectedArea: false,
            title: 'Error Screen',
            menuGroup: 'Error',
            description: 'This is the Error Screen',
            keywords: 'error,danger,thiserror',
            breadcrumbList: [{view: '/', title: 'Home'}, {view: '/error', title: 'There Has been an Error'}]
      });
    }])


    .controller('errorController', ['$scope', function($scope) {
        $scope.message = 'There has been an error!';
    }]);
//This is the Authentication Service, this service returns the login information for the user 
'use strict';

angular.module('myApp.module.Global.Authentication.Factory', [])// jshint ignore:line


.factory('AuthenticationService',// jshint ignore:line
    ['Base64', '$http', '$cookieStore', '$rootScope', '$timeout',
    function (Base64, $http, $cookieStore, $rootScope, $timeout) {
        var service = {};

        service.Login = function (username, password, callback) {

            /* Dummy authentication for testing, uses $timeout to simulate api call
             ----------------------------------------------*/
            $timeout(function(){
                var response = { success: username === 'test' && password === 'test' };
                if(!response.success) {
                    response.message = 'Username or password is incorrect';
                }
                callback(response);
            }, 1000);


            /* Use this for real authentication
             ----------------------------------------------*/
            //$http.post('/api/authenticate', { username: username, password: password })
            //    .success(function (response) {
            //        callback(response);
            //    });

        };
 
        
        //This is the set credentials function this function sets the credentials (after encrypting them) 
        //to a global function that then gets set to a cookie to allow people to come back to the site and
        //log back in. 
        service.SetCredentials = function (username, password) {
            var authdata = Base64.encode(username + ':' + password);
 
            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: authdata,
                    authkey: '55334RF88D$8D@2'
                }
            };
 
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
        };
 
        
        //This function clears the credentials and removes the cookie to ensure that the person 
        //is logged back out. 
        service.ClearCredentials = function () {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic ';
        };
 
        return service;
    }])
 

//This function encrypts a string simulating the BAse64 Encryption of Java
.factory('Base64', function () {
    /* jshint ignore:start */
 
    var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
 
    //cmment
    return {
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
 
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
 
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
 
                output = output +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);
 
            return output;
        },
 
        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));
 
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
 
                output = output + String.fromCharCode(chr1);
 
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
 
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
 
            } while (i < input.length);
 
            return output;
        }
    };
 
    /* jshint ignore:end */
});
'use strict';

angular.module('myApp.module.Products.Details.Controller', ['ngRoute','myApp.module.Products.Main.Factory'])// jshint ignore:line
    

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/product-details/:itemID?', {
            controller: 'pdController',
            templateUrl: 'com/modules/Products/views/product-details.html',
            hideMenus: true,
            protectedArea: false,
            title: 'Product Details',
            menuGroup: 'Products',
            description: 'This is the product details screen',
            keywords: 'keyword',
            breadcrumbList: [{view: '/',title:'Home'},{view: '/products', title: 'Products Main'},{view: '/product-details', title: 'Product Details '}]
      });
    }])



    .controller('pdController',// jshint ignore:line
    ['$scope','$rootScope', 'ProductFactory','$routeParams',
    function ($scope,$rootScope, ProductFactory,$routeParams) {
        //List of functions that Products uses 
        $rootScope.itemID = $routeParams.itemID;
        //This function returns the data from the Product service and assigns them to an eventList
        //This variable is used to also help utilize the pagination
        ProductFactory.getProductDetail(function(dataResponse) {
            $scope.productDetail = dataResponse.data[0];
        });
        //This is the general service message to demo setting a variable and displaying it on the page 
        $scope.message = 'This is the Product Details Page';       
    }]);
'use strict';

angular.module('myApp.module.Products.Main.Controller', ['ngRoute','myApp.module.Products.Main.Factory'])// jshint ignore:line


.config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/products', {
            controller: 'ProductController',
            templateUrl: 'com/modules/Products/views/products-main.html',
            hideMenus: true,
            protectedArea: true,
            title: 'Products Main',
            menuGroup: 'Products',
            description: 'This is the Products Description',
            keywords: 'Products, Products Page',
            breadcrumbList: [{view: '/',title:'Home'},{view: '/products', title: 'Products Main'}]
      });
    }])



//This is the Product controller, this houses all functions and items that are needed for the event
.controller('ProductController',// jshint ignore:line
    ['$scope', 'ProductFactory',
    function ($scope, ProductFactory) {
        //List of functions that Products uses 
        
        //This function returns the data from the Product service and assigns them to an eventList
        //This variable is used to also help utilize the pagination
        ProductFactory.listProducts(function(dataResponse) {
            $scope.dataList = dataResponse.data;
        });
        
        //This is the general service message to demo setting a variable and displaying it on the page 
        $scope.message = 'This is the Products page message from the controller';
        //This resets the currentPage on pagination on the events page so every time you go to it , it will reset it to the first page
        $scope.curPage = 0;
        //This sets the number of items that are shown on the page for pagination
        $scope.pageSize = 8;        
    }]);
//This is the example service that shows how to setup and utilize a static service to allow for front end development. 
//This system is very simple and basically returns data. 
'use strict';


angular.module('myApp.module.Products.Main.Factory', [])// jshint ignore:line

.factory('ProductFactory',// jshint ignore:line
    ['$rootScope','$http',
    function ($rootScope,$http) {
        var service = {};
        
            $rootScope.serviceMessage = 'This is the Product page message from the controller';

            service.listProducts = function (callbackFunc) {
                $http({
                        method: 'GET',
                        url: '/rest/Products/listall.json'
                     }).success(function(data){
                        // With the data succesfully returned, call our callback
                        callbackFunc(data);
                    }).error(function(){
                        alert('error');// jshint ignore:line
                    });
            };
        
        
        
        service.getProductDetail = function (callbackFunc) {

            $http({
                        method: 'GET',
                        url: '/rest/Products/getProduct.json'
                     }).success(function(data){
                        // With the data succesfully returned, call our callback
                        callbackFunc(data);
                    }).error(function(){
                        alert('error');// jshint ignore:line
                    });
        
            };
        
         return service;
    }]);
//This is the Register Controller function that is used in the About Module. 
'use strict';

angular.module('myApp.module.Registration.Register.Controller', ['ngRoute'])// jshint ignore:line


    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/register', {
            controller: 'RegisterController',
            templateUrl: 'com/modules/Registration/views/register.html',
            hideMenus: true,
            protectedArea: false,
            title: 'Register on Our Site',
            menuGroup: 'Register',
            description: 'This is the Description of the Register page',
            keywords: 'Register, Registration',
            breadcrumbList: [{view: '/',title:'Home'},{view: '/register', title: 'Registration Main'}]
      });
    }])


.controller('RegisterController',// jshint ignore:line
    ['$scope','$location',
    function ($scope,$location) {
      $scope.message = 'This is the Register page message from the controller';
        // function to submit the form after all validation has occurred            
      $scope.submitForm = function() {

			// check to make sure the form is completely valid
			if ($scope.userForm.$valid) {
				$location.path('/register-confirm');// jshint ignore:line
			}

		};

    }]);
'use strict';

angular.module('myApp.module.Registration.Confirm.Controller', ['ngRoute'])// jshint ignore:line
    

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/register-confirm', {
            controller: 'rcController',
            templateUrl: 'com/modules/Registration/views/register-confirm.html',
            hideMenus: true,
            protectedArea: false,
            title: 'Registration Confirmation',
            menuGroup: 'Register',
            description: 'This is the Description of the Registration Confirmation page',
            keywords: 'keyword',
            breadcrumbList: [{view: '/',title:'Home'},{view: '/register', title: 'Register'},{view: '/register-confirm', title: 'Registration Confirmation'}]
      });
    }])


    .controller('rcController', ['$scope', function($scope) {
        $scope.message = 'Congratulations you have registered!';
    }]);