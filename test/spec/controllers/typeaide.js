'use strict';

describe('Controller: TypeaideCtrl', function () {

  // load the controller's module
  beforeEach(module('impactApp'));

  var TypeaideCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TypeaideCtrl = $controller('TypeaideCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
