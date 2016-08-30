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