//This is the module you are testing in this case we are looking at the about module which is comprised of everything within the module folder (services/Controllers)
describe('Unit: myApp.module.Products.Main.Controller', function() {

    //Here we declare what items are required for testing , in this case its a controller and the scope of variables that we will be testing.
    beforeEach(module('myApp.module.Products.Main.Controller'));

    var ProductController,
        scope,
        ProductFactory,
        spy;

        beforeEach(inject(function ($rootScope, $controller, _ProductFactory_) {
            scope = $rootScope.$new();
            ProductFactory = _ProductFactory_;
            ProductController = $controller('ProductController', {
                $scope: scope, 'ProductFactory': ProductFactory
            });
            
            
            createController = function () {
            return $controller('ProductController', {
                '$scope': scope,
                'ProductController': ProductController
            });
        };
            
            
            spy  = spyOn(ProductFactory, 'listProducts');
        }));
    
    
        it('Testing scope.message message is "This is the Products page message from the controller"', function () {
            expect(scope.message).toEqual("This is the Products page message from the controller");
        });
    
        it('Test the currPage Vairable is 0"', function () {
            expect(scope.curPage).toEqual(0);
        });
    
        it('Test the pageSize Vairable is 8"', function () {
            expect(scope.pageSize).toEqual(8);
        });
    
        it('Should get an instance of ProductFactory', function() {
            expect(ProductFactory).toBeDefined();
        });
    
        it('should attach Events to the scope', function() {
            expect(scope.dataList).not.toBe(null);
        });
    
        it('This should have called the listProducts Function', function () {
            createController();
            expect(spy).toHaveBeenCalled();
        });
    
    
        it('Testing the Route Information in the about Module',
        inject(function ($route) {

          expect($route.routes['/products'].controller).toBe('ProductController');
          expect($route.routes['/products'].templateUrl).toEqual('com/modules/Products/views/products-main.html');
          expect($route.routes['/products'].hideMenus).toBe(true);
          expect($route.routes['/products'].protectedArea).toBe(true);
          expect($route.routes['/products'].title).toBe('Products Main');
          expect($route.routes['/products'].description).toBe('This is the Products Description');
          expect($route.routes['/products'].keywords).toBe('Products, Products Page');

        }));

});