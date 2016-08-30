//This describes the test you are running and will be used when a test fails , this will display as the item where it fails, 
//I use a dot notation to know the location of the module I am testing 
describe('Unit: myApp.module.Products.Details.Controller', function() {
    
    //This is the module you are testing in this case we are looking at the about module which is comprised of everything within the module folder (services/Controllers)
    beforeEach(module('myApp.module.Products.Details.Controller'));
        //Here we declare what items are required for testing , in this case its a controller and the scope of variables that we will be testing. 
        var pdController,
            scope,
            ProductFactory,
            spy;
    
        beforeEach(inject(function ($rootScope, $controller, _ProductFactory_) {
            scope = $rootScope.$new();
            ProductFactory = _ProductFactory_;
            pdController = $controller('pdController', {
                $scope: scope, 'ProductFactory': ProductFactory
            });
            
            
            createController = function () {
            return $controller('pdController', {
                '$scope': scope,
                'pdController': pdController
            });
        };
            
            
            spy  = spyOn(ProductFactory, 'getProductDetail');
        }));
    
    
        //Now that we have declared what we are looking for we begin the test cases this are will house all the test cases for this module
    
        //First test we run is looking for the scope.message variable which is set in the controller and ensure that it is set and returning what we set it as. 
        it('Testing scope.message message is "This is the Product Details Page"', function () {
            expect(scope.message).toEqual("This is the Product Details Page");
        });
    
        it('Should get an instance of ProductFactory', function() {
            expect(ProductFactory).toBeDefined();
        });
    
        it('should attach Details to the scope', function() {
            expect(scope.productDetail).not.toBe(null);
        });
    
        it('This should have called the productDetail Function', function () {
            createController();
            expect(spy).toHaveBeenCalled();
        });
    
    
        //Second we test the route module, this allows us to ensure that the routing information is passing what we expect to see for the about route. 
        it('Testing the Route Information in the Registration Confirmation Module',
        inject(function ($route) {

          expect($route.routes['/product-details/:itemID?'].controller).toBe('pdController');
          expect($route.routes['/product-details/:itemID?'].templateUrl).toEqual('com/modules/Products/views/product-details.html');
          expect($route.routes['/product-details/:itemID?'].hideMenus).toBe(true);
          expect($route.routes['/product-details/:itemID?'].protectedArea).toBe(false);
          expect($route.routes['/product-details/:itemID?'].title).toBe('Product Details');
          expect($route.routes['/product-details/:itemID?'].description).toBe('This is the product details screen');
          expect($route.routes['/product-details/:itemID?'].keywords).toBe('keyword');

        }));

});