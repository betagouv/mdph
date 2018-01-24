'use strict';

describe('TrajectoireController', function() {
  var scope;
  var controller;
  var $controller;

  beforeEach(function() {
    module('impactApp');
    scope = {};
  });

  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  describe('toggleSelected', function() {
    beforeEach(function() {
      controller = $controller('TrajectoireController', { $scope: scope });
    });

    it('should toggle the question selection', function() {
      var question = {
        isSelected: true
      };
      controller.toggleSelected(question);
      expect(question.isSelected).toBe(false);
    });
  });

  describe('toggleCollapse', function() {
    beforeEach(function() {
      controller = $controller('TrajectoireController', { $scope: scope });
    });

    it('should open then close question', function() {
      var question = {
        isOpen:false
      };
      controller.toggleCollapse(question);
      expect(question.isOpen).toBe(true);

      controller.toggleCollapse(question);
      expect(question.isOpen).toBe(false);
    });
  });

});
