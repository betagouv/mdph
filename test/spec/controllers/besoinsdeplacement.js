'use strict';

describe('Controller: BesoinsdeplacementCtrl', function () {

  // load the controller's module
  beforeEach(module('impactApp'));

  var BesoinsdeplacementCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BesoinsdeplacementCtrl = $controller('BesoinsdeplacementCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
