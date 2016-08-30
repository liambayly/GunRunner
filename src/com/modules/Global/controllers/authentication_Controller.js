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