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