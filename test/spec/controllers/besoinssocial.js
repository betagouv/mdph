'use strict';

describe('Controller: BesoinssocialCtrl', function () {

  // load the controller's module
  beforeEach(module('impactApp'));

  var BesoinssocialCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BesoinssocialCtrl = $controller('BesoinssocialCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
