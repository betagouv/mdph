'use strict';

describe('RequestEvaluationCtrl', function() {
  let $controller;
  let $scope = {};
  let controller;

  let $cookies = {
    get() {
      return '1234';
    }
  };

  let $stateParams = {
    syntheseId: '1234'
  };

  let sections = {};
  let model = {};
  let currentRequest = {};

  let fakeQuestion = {
    id: 0,
    Libelle: 'Composition du foyer',
  };

  beforeEach(function() {
    module('impactApp');
  });

  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  describe('isAnswered', function() {
    describe('when an answer is found', function() {
      let listSyntheses = [
        {
          _id: '1234',
          geva: {
            environnement: [0, 'III_5_4', 2],
            evolution_besoins: ['VII_8_1', 20]
          }
        }
      ];

      beforeEach(function() {
        controller = $controller('RequestEvaluationCtrl', {
          $scope,
          $cookies,
          $stateParams,
          sections,
          model,
          currentRequest,
          listSyntheses
        });
      });

      it('should return true', function() {
        var result = $scope.isAnswered(fakeQuestion);
        expect(result).toBe(true);
      });
    });

    describe('when there is no answer', function() {
      let listSyntheses = [
        {
          _id: '1234',
          geva: {
            environnement: ['III_5_4', 2],
            evolution_besoins: ['VII_8_1', 20]
          }
        }
      ];

      beforeEach(function() {
        controller = $controller('RequestEvaluationCtrl', {
          $scope,
          $cookies,
          $stateParams,
          sections,
          model,
          currentRequest,
          listSyntheses
        });
      });

      it('should return false', function() {
        var result = $scope.isAnswered(fakeQuestion);
        expect(result).toBe(false);
      });
    });
  });
});
