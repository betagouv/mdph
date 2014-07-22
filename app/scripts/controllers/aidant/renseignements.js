'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:RenseignementsAidantCtrl
 * @description
 * # RenseignementsAidantCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('RenseignementsAidantCtrl', function($scope, $state) {

    $scope.subtitle = 'Renseignements sur les aides et dispositifs existants';
    
    if (angular.isUndefined($scope.sectionModel.demandesAides)) {
      $scope.sectionModel.demandesAides = {
        'aides': {
          'vous': false,
          'personne': false,
          'autre': false
        },
        detail: ''
      };
    }

    $scope.model= $scope.sectionModel.demandesAides;
    $scope.question = {
      'model': 'aides',
      'answers':[
        {label: 'Vous avez besoins de mieux connaitre les aides et dispositifs existants pour vous', model: 'eloignement'},
        {label: 'Vous avez besoins de mieux connaitre les aides et dispositifs existants pour la personne aidée', model: 'indisponible'},
        {label: 'Autres', model: 'autre', detail: true}
      ]
    };

    $scope.nextStep = function() {
      $state.go('^.vos_attentes.type_attente');
    };
  });
