//This describes the test you are running and will be used when a test fails , this will display as the item where it fails, 
//I use a dot notation to know the location of the module I am testing 
describe('Unit: myApp.module.Events.Main.Controller', function() {
    
    //This is the module you are testing in this case we are looking at the about module which is comprised of everything within the module folder (services/Controllers)
    beforeEach(module('myApp.module.Events.Main.Controller'));
    
    //Here we declare what items are required for testing , in this case its a controller and the scope of variables that we will be testing.
    var EventController,
        scope,
        EventFactory,
        spy;
    
        //Here we declare the controller and pass the rootscope and controller mock to it to allow it to find and test the controller in the module
        beforeEach(inject(function ($rootScope, $controller, _EventFactory_) {
            scope = $rootScope.$new();
            EventFactory = _EventFactory_;
            EventController = $controller('EventController', {
                $scope: scope, 'EventFactory': EventFactory
            });
            
            //We create a controller to allow us to test the service call 
            createController = function () {
            return $controller('EventController', {
                '$scope': scope,
                'EventController': EventController
            });
        };
            
            
            //We create a spy, this spy will call the service and return the results to ensure that it works 
            spy  = spyOn(EventFactory, 'listEvents');
        }));
    
        //This is where we test the scope.message variable to ensure it is returning correctly. 
        it('Testing scope.message message is "This is the Events page message from the controller"', function () {
            expect(scope.message).toEqual("This is the Events page message from the controller");
        });
    
        //This is where we check the curPage variable to ensure it is set to zero as needed by the paginate system
        it('Test the currPage Vairable is 0"', function () {
            expect(scope.curPage).toEqual(0);
        });
    
    
        //This is where we check the pageSize variable to ensure its at 8 for the page showing 
        it('Test the pageSize Vairable is 12"', function () {
            expect(scope.pageSize).toEqual(12);
        });
    
        //This is where we check to see that we can instantiate the EventFactory from the controller. 
        it('Should get an instance of EventFactory', function() {
            expect(EventFactory).toBeDefined();
        });
    
        //This is where we check to see if the returned results are attached to the scope.dataList variable
        it('should attach Events to the scope', function() {
            expect(scope.dataList).not.toBe(null);
        });
    
        //This is where we check to see that the listEvents function was called and returned by asking the spy
        it('This should have called the listEvents Function', function () {
            createController();
            expect(spy).toHaveBeenCalled();
        });
    
        //This is where we check the route information to ensure it is correct for events. 
        it('Testing the Route Information in the about Module',
        inject(function ($route) {

          expect($route.routes['/events-main'].controller).toBe('EventController');
          expect($route.routes['/events-main'].templateUrl).toEqual('com/modules/Events/views/events-main.html');
          expect($route.routes['/events-main'].hideMenus).toBe(true);
          expect($route.routes['/events-main'].protectedArea).toBe(true);
          expect($route.routes['/events-main'].title).toBe('Events Main');
          expect($route.routes['/events-main'].description).toBe('This is the Description of the Events page');
          expect($route.routes['/events-main'].keywords).toBe('Events, Events Page');

        }));

});