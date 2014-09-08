'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:PoleEmploiCtrl
 * @description
 * # PoleEmploiCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('PoleEmploiCtrl', function($scope, $state, FormService) {

    $scope.subtitle = FormService.estRepresentant($scope.formAnswers) ?
      'Est-' + FormService.getPronoun($scope.formAnswers) + ' dans une des situations suivantes ?' : 'Etes-vous dans une des situations suivantes ?';

    if (angular.isUndefined($scope.sectionModel.poleEmploi)) {
      $scope.sectionModel.situationSansEmploi = {
        situations: {},
        detail: ''
      };
    }

    $scope.model = $scope.sectionModel.situationSansEmploi;
    $scope.question = {
      model: 'situations',
      answers: [
        {
          label: 'Inscrit à pôle emploi',
          model: 'poleEmploi'
        },
        {
          label: 'En formation continue',
          model: 'formation'
        },
        {
          label: 'Etudiant',
          model: 'etudiant'
        }
      ]
    };

    $scope.nextStep = function() {
      $scope.sections[1].isEnabled = true;
      $state.go('^.^.^.projet_professionnel.description');
    };
  });
