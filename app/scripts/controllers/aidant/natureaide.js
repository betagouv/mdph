'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:NatureAideCtrl
 * @description
 * # NatureAideCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('NatureAideCtrl', function($scope, $state) {

    $scope.subtitle = 'Quelle est la nature de l\'aide apportée ? (1/2)';

    if (angular.isUndefined($scope.sectionModel.natureAide)) {
      $scope.sectionModel.natureAide = {
        'natures': {
          'surveillance': false,
          'deplacement_interieur': false,
          'deplacement_exterieur': false,
          'logement': false,
          'hygiene': false,
          'repas_preparation': false,
          'repas_prise': false,

          'professionnels': false,
          'juridique': false,
          'finances': false,
          'loisirs': false,
          'social': false,
          'medical': false,
          'autre': false
        },
        detail: ''
      };
    }

    $scope.model= $scope.sectionModel.natureAide;
    $scope.question = {
      'model': 'natures',
      'answers':[
        {label: 'Surveillance / présence responsable', model: 'surveillance'},
        {label: 'Aide aux déplacements à l’intérieur du logement', model: 'deplacement_interieur'},
        {label: 'Aide aux déplacements à l’extérieur', model: 'deplacement_exterieur'},
        {label: 'Aide pour entretenir le logement et le linge', model: 'logement'},
        {label: 'Aide à l’hygiène corporelle', model: 'hygiene'},
        {label: 'Aide à la préparation des repas', model: 'repas_preparation'},
        {label: 'Aide à la prise de repas', model: 'repas_prise'}
      ]
    };

    $scope.nextStep = function() {
      $state.go('^.nature_aide_bis');
    };
  });
