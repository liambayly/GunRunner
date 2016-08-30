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