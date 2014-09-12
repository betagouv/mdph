'use strict';

describe('Controller: FormCtrl', function () {

  // load the controller's module
  beforeEach(module('impactApp'));

  var FormCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FormCtrl = $controller('FormCtrl', {
      $scope: scope
    });
  }));

  it('should always set formAnswers', function () {
    expect(scope.formAnswers).toBeDefined();
  });
});
