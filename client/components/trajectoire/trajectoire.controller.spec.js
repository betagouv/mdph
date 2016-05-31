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
      scope.toggleSelected(question);
      expect(question.isSelected).toBe(false);
    });
  });

  describe('toggleCollapse', function() {
    beforeEach(function() {
      controller = $controller('TrajectoireController', { $scope: scope });
    });

    it('should change the selected question', function() {
      var question = {
        id: '1234',
        isSelected: false
      };
      scope.toggleCollapse(question);
      expect(scope.currentQuestionId).toBe('1234');

      scope.toggleCollapse(question);
      expect(scope.currentQuestionId).toBe(null);
    });
  });

});
