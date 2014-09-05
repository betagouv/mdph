'use strict';

angular.module('impactApp')
  .controller('RenouvellementCtrl', function($scope, $state) {
    $scope.subtitle = 'Quelle est la raison de votre renouvellement ?';

    if (angular.isUndefined($scope.sectionModel.renouvellement)) {
      $scope.sectionModel.renouvellement = {
        raison: {},
        detail: ''
      };
    }

    $scope.model = $scope.sectionModel.renouvellement;
    $scope.question = {
      model: 'raison',
      answers: [
        {
          label: 'Vous arrivez à la fin de vos droits',
          labelRep: $scope.getName() + ' arrive à la fin de ses droits',
          model: 'finDeVosDroits'
        },
        {
          label: 'Votre situation a changé',
          labelRep: 'Sa situation a changé',
          model: 'changementDeSituation'
        }
      ]
    };

    $scope.nextStep = function() {
      $state.go('^.date_naissance');
    };
  });
