'use strict';

describe('SignupCtrl', function() {
  var scope;
  var $controller;
  var controller;

  beforeEach(function() {
    module('impactApp');
    scope = {};
  });

  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  describe('toggleType', function() {
    beforeEach(function() {
      controller = $controller('SignupCtrl', { $scope: scope });
    });

    describe('password to text', function() {
      it('should toggle the input type', function() {
        scope.inputType = 'password';
        scope.toggleType();
        expect(scope.inputType).toBe('text');
      });
    });

    describe('text to password', function() {
      it('should toggle the input type', function() {
        scope.inputType = 'text';
        scope.toggleType();
        expect(scope.inputType).toBe('password');
      });
    });
  });

});
