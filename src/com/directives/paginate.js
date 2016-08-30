//This is the paginate directive , this directive also pulls a template to show the pagination bar 
//with a few variables this directive will control pagination on the specified page, this is an attribute
//restriction so you can use it like this <span paginate></span> and by setting currPage and pageSize (number of items per page)
//this will show and paginate through items on the page . view the events.html for a full example of it. 
'use strict';

//This is the directive specification pulling in the view template and restricting the use of the directive. 
baylyApp.directive('paginate', function() {// jshint ignore:line
  return {
    restrict: 'A',
    controller: 'paginationController',
    templateUrl: '/com/directives/views/paginate.html'
  };
});


//This is the filter that filters the information on the ng-repeat to show only the items per page. 
baylyApp.filter('pagination', function(){// jshint ignore:line
 return function(input, start){
  start = +start;
  return input.slice(start);
 };
    
});


//This is the controller with functions that are specific to the pagination, because some of those functions are global they have been added into the 
//application wide scope for use in the application. if you need to debug them you can do that in the app.js but they should be working fine and not require 
//editing 
baylyApp.controller('paginationController',// jshint ignore:line
    ['$rootScope',
    function ($scope) {
        
        //These are the pagination functions, these are available throughout the application now 
        $scope.curPage = 0;
        $scope.pageSize = 8;
        
        //This function will calculate the number of pages based on pageSize by dividing the data by it. 
        //This is used to tell you how many pages total are going to be displayed 
        $scope.numberOfPages = function(dataList,pageSize) {
            return Math.ceil(dataList.length / pageSize);
        };
        
        //This function checks the total pages to see if you have gone beyond the beginning or end allowing you to disable the prev and next button
        $scope.checkTotalPages = function(thisPage,dataList,pageSize) {
            var tmpTotal = Math.ceil(dataList.length / pageSize);
            var tmpReturn = false;
                if(thisPage <= tmpTotal){
                    tmpReturn = true;
                }
            return tmpReturn;
        };
        
        //This gives you the PageCount minus one to show the pages on the pagination
        $scope.pagPageCount = function(dataList,pageSize) {
            var tmpRet =  Math.ceil(dataList.length / pageSize);
                tmpRet = tmpRet - 1;
            return tmpRet;
        };
        
        $scope.checkBeginningPage = function(page) {
             var tmpret = true;
            if(page <= 0){
                   tmpret = false;
            }
            return tmpret;
        };
        
        
        //This tells you wether you are on the current page , allowing you to activate the page number on pagination 
        $scope.isCurrentPage = function(thisPage) {
            var tmpReturn = false;
            if (thisPage === $scope.curPage){
                tmpReturn = true;   
            }
            return tmpReturn;
        };
        
    }]);