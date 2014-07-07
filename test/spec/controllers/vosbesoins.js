'use strict';

describe('Controller: VosbesoinsCtrl', function () {

  // load the controller's module
  beforeEach(module('impactApp'));

  var VosbesoinsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VosbesoinsCtrl = $controller('VosbesoinsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
