'use strict';

//This is the directive specification pulling in the view template and restricting the use of the directive. 
baylyApp.directive('breadcrumb', function() {// jshint ignore:line
  return {
    restrict: 'A',
    controller: 'breadcrumbController',
    templateUrl: '/com/directives/views/breadcrumb.html'
  };
});

//This is the controller with functions that are specific to the pagination, because some of those functions are global they have been added into the 
//application wide scope for use in the application. if you need to debug them you can do that in the app.js but they should be working fine and not require 
//editing 
baylyApp.controller('breadcrumbController',// jshint ignore:line
    ['$rootScope','$routeParams',
    function ($scope) {// jshint ignore:line

    }]);