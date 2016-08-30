'use strict';

angular.module('myApp.module.Products.Details.Controller', ['ngRoute','myApp.module.Products.Main.Factory'])// jshint ignore:line
    

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/product-details/:itemID?', {
            controller: 'pdController',
            templateUrl: 'com/modules/Products/views/product-details.html',
            hideMenus: true,
            protectedArea: false,
            title: 'Product Details',
            menuGroup: 'Products',
            description: 'This is the product details screen',
            keywords: 'keyword',
            breadcrumbList: [{view: '/',title:'Home'},{view: '/products', title: 'Products Main'},{view: '/product-details', title: 'Product Details '}]
      });
    }])



    .controller('pdController',// jshint ignore:line
    ['$scope','$rootScope', 'ProductFactory','$routeParams',
    function ($scope,$rootScope, ProductFactory,$routeParams) {
        //List of functions that Products uses 
        $rootScope.itemID = $routeParams.itemID;
        //This function returns the data from the Product service and assigns them to an eventList
        //This variable is used to also help utilize the pagination
        ProductFactory.getProductDetail(function(dataResponse) {
            $scope.productDetail = dataResponse.data[0];
        });
        //This is the general service message to demo setting a variable and displaying it on the page 
        $scope.message = 'This is the Product Details Page';       
    }]);