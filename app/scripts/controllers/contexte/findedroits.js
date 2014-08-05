'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:FinDeDroitsCtrl
 * @description
 * # FinDeDroitsCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('FinDeDroitsCtrl', function($scope, $state, getDroits) {
    $scope.subtitle = 'De quels droits bénéficiez-vous actuellement ?';

    $scope.addDroit = function() {
      $scope.sectionModel.mesDroits.push({name: '', date:'', opened: false});
    };

    if (angular.isUndefined($scope.sectionModel.mesDroits)) {
      $scope.sectionModel.mesDroits = [];
      $scope.addDroit();
    }

    $scope.droits = getDroits($scope.$storage);
    $scope.mesDroits = $scope.sectionModel.mesDroits;

    $scope.open = function($event, droit) {
      $event.preventDefault();
      $event.stopPropagation();
      for (var i = 0; i < $scope.mesDroits.length; i++) {
        $scope.mesDroits[i].opened = false;
      }
      droit.opened = true;
    };

    $scope.nextStep = function() {
      var cleanDroits = [];
      for (var i = 0; i < $scope.mesDroits.length; i++) {
        if ($scope.mesDroits[i].name !== '' && $scope.mesDroits[i].date !== '') {
          cleanDroits.push($scope.mesDroits[i]);
        }
      }
      $scope.sectionModel.mesDroits = cleanDroits;
      $state.go('^.code_postal');
    };
  });
