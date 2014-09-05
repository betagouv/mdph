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

    $scope.subtitle = 'Quelqu\'un participe-t-il avec vous à l\'accompagnement de la personne aidée ?';

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
        {label: 'Oui, un (des) professionnel(s)', model: 'professionnel'},
        {label: 'Oui, un (ou plusieurs) autre(s) proche(s)', model: 'proches'}
      ]
    };

    $scope.nextStep = function() {
      $state.go('^.soutien');
    };
  });
