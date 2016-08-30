//This describes the test you are running and will be used when a test fails , this will display as the item where it fails, 
//I use a dot notation to know the location of the module I am testing 
describe('Unit: myApp.module.Global.Authentication.Controller', function() {
    
    //This is the module you are testing in this case we are looking at the about module which is comprised of everything within the module folder (services/Controllers)
    beforeEach(module('ngCookies','myApp.module.Global.Authentication.Controller'));
    
    
         //Here we declare what items are required for testing , in this case its a controller and the scope of variables that we will be testing.
        var LoginController,
            scope,
            AuthenticationService;
        //Here we declare the controller and pass the rootscope and controller mock to it to allow it to find and test the controller in the module
        beforeEach(inject(function ($rootScope, $controller, _AuthenticationService_) {
            scope = $rootScope.$new();
            scope.username = 'test';
            scope.password = 'test';
            AuthenticationService = _AuthenticationService_;
            LoginController = $controller('LoginController', {
                $scope: scope, 'AuthenticationService': AuthenticationService
            });
            
            createController = function () {
            return $controller('LoginController', {
                '$scope': scope,
                'AuthenticationService': AuthenticationService
            });
                
        };
             spy  = spyOn(AuthenticationService, 'ClearCredentials');   
                
        }));
    
        //Now that we have declared what we are looking for we begin the test cases this are will house all the test cases for this module
    
        it('Should get an instance of Authentication Service', function() {
            expect(AuthenticationService).toBeDefined();
        });
    
        //Checking to see the globals and that they are set , this allows us to ensure that the service is manipulating the global layer to set and clear credentials
    
        it('Check the Globals to ensure that they have been set', function() {
            expect(scope.globals).not.toBe(null);
        });
    
    
        //This checks to see if the clear credentials function is set , this lets us know that the controller is well and connected to the factory. 
        it('This should have called the SetCredentials Function', function () {
            createController();
            expect(spy).toHaveBeenCalled();
            
        });
    
    
        //Here we check the router information , to ensure that everything under /login works 
        it('Testing the Route Information in the about Module',
        inject(function ($route) {

          expect($route.routes['/login'].controller).toBe('LoginController');
          expect($route.routes['/login'].templateUrl).toEqual('com/modules/Global/views/login.html');
          expect($route.routes['/login'].hideMenus).toBe(true);
          expect($route.routes['/login'].protectedArea).toBe(false);
          expect($route.routes['/login'].title).toBe('Login');
          expect($route.routes['/login'].description).toBe('This is the Description of the Login page');
          expect($route.routes['/login'].keywords).toBe('Login,Authentication');

        }));

});