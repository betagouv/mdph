'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:AdapteHandicapCtrl
 * @description
 * # AdapteHandicapCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('AdapteHandicapCtrl', function($scope, $state, FormService) {

    $scope.subtitle = FormService.estRepresentant($scope.formAnswers) ? 'Son emploi est-il adapté à son handicap ?' : 'Votre emploi est-il adapté à votre handicap ?';

    if (angular.isUndefined($scope.sectionModel.adapte)) {
      $scope.sectionModel.adapte = {};
    }

    $scope.question = {
      model: 'adapte',
      answers: [
        {
          label: 'Non',
          value: false,
          detailUrl: 'components/detail/precisez.html',
          detail: $scope.sectionModel.adapte.detail
        },
        {
          label: 'Oui',
          value: true
        }
      ]
    };

    $scope.isNextStepDisabled = function() {
      var model = $scope.sectionModel.adapte;
      if (angular.isUndefined(model.value)) {
        return true;
      }

      if (model.detailUrl && !model.detail) {
        return true;
      }

      return false;
    };

    $scope.nextStep = function() {
      $state.go('^.difficultes');
    };
  });
