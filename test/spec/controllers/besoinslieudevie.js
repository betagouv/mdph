'use strict';

describe('Controller: BesoinslieudevieCtrl', function () {

  // load the controller's module
  beforeEach(module('impactApp'));

  var BesoinslieudevieCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BesoinslieudevieCtrl = $controller('BesoinslieudevieCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
