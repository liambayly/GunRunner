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

