'use strict';

describe('Controller: RecapCtrl', function () {

  // load the controller's module
  beforeEach(module('impactApp'));

  var RecapCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RecapCtrl = $controller('RecapCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
