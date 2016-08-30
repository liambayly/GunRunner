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