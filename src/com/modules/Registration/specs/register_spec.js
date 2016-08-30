describe('Unit: myApp.module.Registration.Register.Controller', function() {

    beforeEach(module('myApp.module.Registration.Register.Controller'));

        var RegisterController,
        scope;

        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            RegisterController = $controller('RegisterController', {
                $scope: scope
            });
        }));
    
    
        it('Testing scope.message message is "This is the Register page message from the controller"', function () {
            expect(scope.message).toEqual("This is the Register page message from the controller");
        });
    
    
        it('Testing the Route Information in the about Module',
        inject(function ($route) {

          expect($route.routes['/register'].controller).toBe('RegisterController');
          expect($route.routes['/register'].templateUrl).toEqual('com/modules/Registration/views/register.html');
          expect($route.routes['/register'].hideMenus).toBe(true);
          expect($route.routes['/register'].protectedArea).toBe(false);
          expect($route.routes['/register'].title).toBe('Register on Our Site');
          expect($route.routes['/register'].description).toBe('This is the Description of the Register page');
          expect($route.routes['/register'].keywords).toBe('Register, Registration');

        }));

});