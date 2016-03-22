'use strict';

describe('TrajectoireController', function() {

  beforeEach(function() {
    module('impactApp');
  });

  var $controller;

  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  describe('Read mode', function() {
    var scope;
    var controller;
    var ReadModeService;

    beforeEach(function() {
      scope = {};
      ReadModeService = {
        getReadMode() {
          return true;
        }
      };

      controller = $controller('TrajectoireController', { $scope: scope, ReadModeService: ReadModeService });
    });

    it('should return question.isSelected and show the question only if selected', function() {
      //given
      var question = { isSelected: false };

      //when
      var result = scope.filterByMode(question);

      //then
      expect(result).toBe(question.isSelected);
    });
  });

  describe('Not in read mode', function() {
    var scope;
    var controller;
    var ReadModeService;

    beforeEach(function() {
      scope = {};
      ReadModeService = {
        getReadMode() {
          return false;
        }
      };
      controller = $controller('TrajectoireController', { $scope: scope, ReadModeService: ReadModeService });
    });

    it('should return false and not show the question', function() {
      //given
      var question = { isSelected: false };

      //when
      var result = scope.filterByMode(question);

      //then
      expect(result).toBe(true);
    });
  });

});
