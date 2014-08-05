'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:ConditionAidantCtrl
 * @description
 * # ConditionAidantCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('ConditionAidantCtrl', function($scope, $sessionStorage) {

    $scope.subtitle = 'Souhaitez-vous nous informer des attentes et besoins de votre aidant familial ?';

    $scope.question = {
      model: 'aidant',
      'answers': [
        {
          'label': 'Oui',
          'value': true
        },
        {
          'label': 'Non',
          'value': false
        }
      ]
    };

    $scope.isNextStepDisabled = function() {
      return angular.isUndefined($scope.sectionModel.aidant);
    };

    $scope.nextStep = function() {
      $sessionStorage.sectionAidant.isEnabled = $scope.sectionModel.aidant.value;
      $sessionStorage.sectionEnvoi.isEnabled = true;
      $scope.goToNextSection($scope.currentSection);
    };
  });
