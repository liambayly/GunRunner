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