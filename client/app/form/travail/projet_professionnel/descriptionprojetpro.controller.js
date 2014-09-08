'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:DescriptionProjetProCtrl
 * @description
 * # DescriptionProjetProCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('DescriptionProjetProCtrl', function($scope, $state, FormService) {

    $scope.subtitle = FormService.estRepresentant($scope.formAnswers) ?
      'A-t-' + FormService.getPronoun($scope.formAnswers) + ' un ou plusieurs projet(s) professionnel(s) ?' : 'Avez-vous un ou plusieurs projet(s) professionnel(s) ?';

    if (angular.isUndefined($scope.sectionModel.description)) {
      $scope.sectionModel.description = {};
    }

    $scope.question = {
      model: 'description',
      'answers': [
        {
          'label': 'Non',
          'value': false
        },
        {
          'label': 'Oui',
          'value': true,
          detailUrl: 'components/detail/precisez_big.html',
          detail: $scope.sectionModel.description.detail
        }
      ]
    };

    $scope.isNextStepDisabled = function() {
      var model = $scope.sectionModel.description;
      if (angular.isUndefined(model.value)) {
        return true;
      }

      if (model.detailUrl && !model.detail) {
        return true;
      }

      return false;
    };

    $scope.nextStep = function() {
      $state.go('^.besoin_soutien');
    };
  });
