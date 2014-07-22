'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:SoutienCtrl
 * @description
 * # SoutienCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('SoutienCtrl', function($scope, $state) {

    $scope.subtitle = 'Soutien';
    
    if (angular.isUndefined($scope.sectionModel.soutien)) {
      $scope.sectionModel.soutien = {
        'soutiens': {
          'rencontres': false,
          'individuel': false,
          'aucun': false
        }
      };
    }

    $scope.model= $scope.sectionModel.soutien;
    $scope.question = {
      'model': 'soutiens',
      'answers':[
        {label: 'Vous participez à des rencontres avec d’autres aidants', model: 'rencontres'},
        {label: 'Vous êtes soutenu individuellement', model: 'individuel'}
      ]
    };

    $scope.nextStep = function() {
      $state.go('^.empechement');
    };
  });
