'use strict';

angular.module('myApp.module.Products.Main.Controller', ['ngRoute','myApp.module.Products.Main.Factory'])// jshint ignore:line


.config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/products', {
            controller: 'ProductController',
            templateUrl: 'com/modules/Products/views/products-main.html',
            hideMenus: true,
            protectedArea: true,
            title: 'Products Main',
            menuGroup: 'Products',
            description: 'This is the Products Description',
            keywords: 'Products, Products Page',
            breadcrumbList: [{view: '/',title:'Home'},{view: '/products', title: 'Products Main'}]
      });
    }])



//This is the Product controller, this houses all functions and items that are needed for the event
.controller('ProductController',// jshint ignore:line
    ['$scope', 'ProductFactory',
    function ($scope, ProductFactory) {
        //List of functions that Products uses 
        
        //This function returns the data from the Product service and assigns them to an eventList
        //This variable is used to also help utilize the pagination
        ProductFactory.listProducts(function(dataResponse) {
            $scope.dataList = dataResponse.data;
        });
        
        //This is the general service message to demo setting a variable and displaying it on the page 
        $scope.message = 'This is the Products page message from the controller';
        //This resets the currentPage on pagination on the events page so every time you go to it , it will reset it to the first page
        $scope.curPage = 0;
        //This sets the number of items that are shown on the page for pagination
        $scope.pageSize = 8;        
    }]);