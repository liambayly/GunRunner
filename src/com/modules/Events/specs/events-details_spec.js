//This describes the test you are running and will be used when a test fails , this will display as the item where it fails, 
//I use a dot notation to know the location of the module I am testing 
describe('Unit: myApp.module.Events.Details.Controller', function() {
    
    //This is the module you are testing in this case we are looking at the about module which is comprised of everything within the module folder (services/Controllers)
    beforeEach(module('myApp.module.Events.Details.Controller'));
        //Here we declare what items are required for testing , in this case its a controller and the scope of variables that we will be testing. 
        var edController,
            scope,
            EventFactory,
            spy;
    
        beforeEach(inject(function ($rootScope, $controller, _EventFactory_) {
            scope = $rootScope.$new();
            EventFactory = _EventFactory_;
            pdController = $controller('edController', {
                $scope: scope, 'EventFactory': EventFactory
            });
            
            
            createController = function () {
            return $controller('edController', {
                '$scope': scope,
                'edController': edController
            });
        };
            
            
            spy  = spyOn(EventFactory, 'getEvent');
        }));
    
    
        //Now that we have declared what we are looking for we begin the test cases this are will house all the test cases for this module
    
        //First test we run is looking for the scope.message variable which is set in the controller and ensure that it is set and returning what we set it as. 
        it('Testing scope.message message is "This is the Event Details Page"', function () {
            expect(scope.message).toEqual("This is the Event Details Page");
        });
    
        it('Should get an instance of EventFactory', function() {
            expect(EventFactory).toBeDefined();
        });
    
        it('should attach Details to the scope', function() {
            expect(scope.EventDetail).not.toBe(null);
        });
    
        it('This should have called the eventDetail Function', function () {
            createController();
            expect(spy).toHaveBeenCalled();
        });
    
    
        //Second we test the route module, this allows us to ensure that the routing information is passing what we expect to see for the about route. 
        it('Testing the Route Information in the Event Detail Module',
        inject(function ($route) {

          expect($route.routes['/event-details/:itemID?'].controller).toBe('edController');
          expect($route.routes['/event-details/:itemID?'].templateUrl).toEqual('com/modules/Events/views/event-details.html');
          expect($route.routes['/event-details/:itemID?'].hideMenus).toBe(true);
          expect($route.routes['/event-details/:itemID?'].protectedArea).toBe(true);
          expect($route.routes['/event-details/:itemID?'].title).toBe('Event Details');
          expect($route.routes['/event-details/:itemID?'].description).toBe('This is the event details screen');
          expect($route.routes['/event-details/:itemID?'].keywords).toBe('keyword');

        }));

});