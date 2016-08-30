//This describes the test you are running and will be used when a test fails , this will display as the item where it fails, 
//I use a dot notation to know the location of the module I am testing 
describe('Unit: myApp.module.Global.Error.Controller', function() {
    
    //This is the module you are testing in this case we are looking at the about module which is comprised of everything within the module folder (services/Controllers)
    beforeEach(module('myApp.module.Global.Error.Controller'));
        //Here we declare what items are required for testing , in this case its a controller and the scope of variables that we will be testing. 
        var aboutController,
        scope;
    
        //Here we declare the controller and pass the rootscope and controller mock to it to allow it to find and test the controller in the module
        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            aboutController = $controller('errorController', {
                $scope: scope
            });
        }));
    
    
    
        //Now that we have declared what we are looking for we begin the test cases this are will house all the test cases for this module
    
        //First test we run is looking for the scope.message variable which is set in the controller and ensure that it is set and returning what we set it as. 
        it('Testing scope.message message is "There has been an error!"', function () {
            expect(scope.message).toEqual("There has been an error!");
        });
    
    
        //Second we test the route module, this allows us to ensure that the routing information is passing what we expect to see for the about route. 
        it('Testing the Route Information in the about Module',
        inject(function ($route) {

          expect($route.routes['/error'].controller).toBe('errorController');
          expect($route.routes['/error'].templateUrl).toEqual('com/modules/Global/views/error.html');
          expect($route.routes['/error'].hideMenus).toBe(true);
          expect($route.routes['/error'].protectedArea).toBe(false);
          expect($route.routes['/error'].title).toBe('Error Screen');
          expect($route.routes['/error'].description).toBe('This is the Error Screen');
          expect($route.routes['/error'].keywords).toBe('error,danger,thiserror');

        }));

});