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

    if (angular.isUndefined($scope.sectionModel.mesPrestations)) {
      $scope.sectionModel.mesPrestations = getDroits();
    }

    $scope.addDroit = function() {
      $scope.sectionModel.mesPrestations[3].prestations.push({label: 'Autre',  selected: true});
    };

    $scope.removeDroit = function(prestation) {
      var array = $scope.sectionModel.mesPrestations[3].prestations;
      var index = array.indexOf(prestation);
      array.splice(index, 1);
    };

    $scope.open = function($event, currentPrestation) {
      $event.preventDefault();
      $event.stopPropagation();
      angular.forEach($scope.sectionModel.mesPrestations, function(category) {
        angular.forEach(category.prestations, function(prestation) {
          prestation.opened = false;
        });
      });
      currentPrestation.opened = true;
    };

    $scope.nextStep = function() {
      $state.go('^.^.vos_besoins.quotidien');
    };
  });
