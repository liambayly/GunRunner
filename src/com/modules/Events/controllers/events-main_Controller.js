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