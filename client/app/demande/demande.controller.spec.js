'use strict';

describe('Controller: DemandeCtrl', function () {

  // load the controller's module
  beforeEach(module('impactApp'));

  var DemandeCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DemandeCtrl = $controller('DemandeCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
