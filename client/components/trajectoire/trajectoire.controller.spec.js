'use strict';

describe('TrajectoireController', function() {
  var scope;
  var controller;
  var ReadModeService;
  var $controller;

  beforeEach(function() {
    module('impactApp');
    scope = {};
  });

  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  describe('filterByMode', function() {
    describe('Read mode', function() {
      beforeEach(function() {
        ReadModeService = {
          getReadMode() {
            return true;
          }
        };

        controller = $controller('TrajectoireController', { $scope: scope, ReadModeService: ReadModeService });
      });

      it('should return question.isSelected and show the question only if selected', function() {
        var question = { isSelected: false };
        var result = scope.filterByMode(question);
        expect(result).toBe(question.isSelected);
      });
    });

    describe('Not in read mode', function() {
      beforeEach(function() {
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

  describe('toggleSelected', function() {
    beforeEach(function() {
      ReadModeService = {
        getReadMode() {}
      };

      controller = $controller('TrajectoireController', { $scope: scope, ReadModeService: ReadModeService });
    });

    it('should toggle the question selection and collapse the question if not selected', function() {
      var question = {
        isSelected: true,
        isExpanded: true
      };
      scope.toggleSelected(question);
      expect(question.isSelected).toBe(false);
      expect(question.isExpanded).toBe(false);
    });
  });

  describe('toggleCollapse', function() {
    beforeEach(function() {
      ReadModeService = {
        getReadMode() {}
      };

      controller = $controller('TrajectoireController', { $scope: scope, ReadModeService: ReadModeService });
    });

    it('should toogle the expansion of the question and select it', function() {
      var question = {
        isSelected: false,
        isExpanded: false
      };
      scope.toggleCollapse(question);
      expect(question.isSelected).toBe(true);
      expect(question.isExpanded).toBe(true);
    });
  });

});
