'use strict';

angular.module('impactApp')
  .controller('ConditionAidantCtrl', function($scope, $state) {

    $scope.subtitle = 'Votre aidant familial souhaite-t-il s\'exprimer ?';

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
      if ($scope.sectionModel.aidant.value) {
        $scope.sections[0].isEnabled = true;
        $state.go('^.situation.lien');
      } else {
        $scope.goToNextSection($scope.currentSectionId);
      }
    };
  });
