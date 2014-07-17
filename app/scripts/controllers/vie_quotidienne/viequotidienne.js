'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:VieQuotidienneCtrl
 * @description
 * # VieQuotidienneCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('VieQuotidienneCtrl', function ($scope) {
    $scope.title = 'Votre vie quotidienne';
    
    $scope.section = 'vie_quotidienne';

    if (angular.isUndefined($scope.data.vie)) {
      $scope.data.vie = {
        sectionLabel: 'Vie quotidienne',
        answers: {}
      };
    }

    $scope.sectionModel = $scope.data.vie.answers;
  });
