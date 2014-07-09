'use strict';

describe('Controller: AttentestructureCtrl', function () {

  // load the controller's module
  beforeEach(module('impactApp'));

  var AttentestructureCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AttentestructureCtrl = $controller('AttentestructureCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
