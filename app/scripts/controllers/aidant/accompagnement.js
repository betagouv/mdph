'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:AccompagnementCtrl
 * @description
 * # AccompagnementCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('AccompagnementCtrl', function($scope, $state) {

    $scope.subtitle = 'Accompagnement';
    
    if (angular.isUndefined($scope.sectionModel.accompagnement)) {
      $scope.sectionModel.accompagnement = {
        'accompagnements': {
          'professionnel': false,
          'proches': false,
          'seul': false
        }
      };
    }

    $scope.model= $scope.sectionModel.accompagnement;
    $scope.question = {
      'model': 'accompagnements',
      'answers':[
        {label: 'La personne aidée est également accompagnée par un (des) professionnel(s)', model: 'professionnel'},
        {label: 'La personne aidée est également accompagnée par un (ou plusieurs) autre(s) proche(s)', model: 'proches'}
      ]
    };

    $scope.nextStep = function() {
      $state.go('^.soutien');
    };
  });
