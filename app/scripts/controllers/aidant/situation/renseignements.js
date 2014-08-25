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

    $scope.subtitle = 'Avez-vous besoin de mieux connaitre les aides et dispositifs existants ?';

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
        {label: 'Pour vous', model: 'eloignement'},
        {label: 'Pour la personne aidée', model: 'indisponible'},
        {label: 'Autres', model: 'autre', detail: true}
      ]
    };

    $scope.nextStep = function() {
      $scope.$storage.sectionAttentesAidant.isEnabled = true;
      $state.go('^.^.vos_attentes.type_attente');
    };
  });
