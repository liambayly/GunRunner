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