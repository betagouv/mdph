'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:SocialCtrl
 * @description
 * # SocialCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('SocialCtrl', function($scope, $state) {

    if ($scope.estRepresentant()) {
      $scope.subtitle = 'Dans ses relations sociales et familiales';
    } else {
      $scope.subtitle = 'Dans vos relations sociales et familiales';
    }

    if (angular.isUndefined($scope.subSectionModel.social)) {
      $scope.subSectionModel.social = {
        'besoins': {
          'proches': false,
          'loisirs': false,
          'famille': false,
          'citoyen': false,
          'autre': false
        },
        'detail': ''
      };
    }

    $scope.model = $scope.subSectionModel.social;
    $scope.question = {
      model: 'besoins',
      'answers': [
        {
          label: 'Pour les relations avec vos voisins, vos amis et votre famille',
          labelRep: 'Pour les relations avec ses voisins, ses amis et sa famille',
          model: 'proches'
        },
        {label: 'Pour avoir des activités culturelles, sportives et de loisirs', model: 'loisirs'},
        {
          label: 'Pour vous occuper de votre famille',
          labelRep: 'Pour s\'occuper de sa famille',
          model: 'famille', 'onlyAdult': true
        },
        {
          label: 'Pour vous accompagner dans votre vie citoyenne (ex: aller voter, vie associative ...)',
          labelRep: 'Pour se faire accompagner dans sa vie citoyenne (ex: aller voter, vie associative ...)',
          model: 'citoyen', 'onlyAdult': true
        },
        {label: 'Autre besoin', model: 'autre', 'detail': true}
      ]
    };

    $scope.nextStep = function() {
      $state.go('^.lieu_de_vie');
    };
  });
