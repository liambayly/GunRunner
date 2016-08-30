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