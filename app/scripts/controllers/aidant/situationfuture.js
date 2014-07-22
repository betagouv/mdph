'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:SituationFutureCtrl
 * @description
 * # SituationFutureCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('SituationFutureCtrl', function($scope, $state) {

    $scope.subtitle = 'Situation future';
    
    if (angular.isUndefined($scope.sectionModel.situationFuture)) {
      $scope.sectionModel.situationFuture = {
        'situations': {
          'eloignement': false,
          'indisponible': false,
          'sante': false,
          'professionnel': false,
          'personnel': false,
          'autre': false
        },
        detail: ''
      };
    }

    $scope.model= $scope.sectionModel.situationFuture;
    $scope.question = {
      'model': 'situations',
      'answers':[
        {label: 'Eloignement géographique (déménagement, ...)', model: 'eloignement'},
        {label: 'Indisponibilité prolongée (séjour à l’étranger, hospitalisation, ...)', model: 'indisponible'},
        {label: 'Problème de santé', model: 'sante'},
        {label: 'Changement majeur dans la situation professionnelle', model: 'professionnelle'},
        {label: 'Changement majeur dans la situation personnelle (séparation, décès du conjoint, départ en établissement de retraite ...)', model: 'personnel'},
        {label: 'Autres changements prochains de situation', model: 'autre', detail: true}
      ]
    };

    $scope.nextStep = function() {
      $state.go('^.renseignements');
    };
  });
