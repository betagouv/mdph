'use strict';

describe('Controller: EnvoiCtrl', function () {

  // load the controller's module
  beforeEach(module('impactApp'));

  var EnvoiCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EnvoiCtrl = $controller('EnvoiCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
