'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:VieFamilleCtrl
 * @description
 * # VieFamilleCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('VieFamilleCtrl', function($scope, $state) {

    $scope.subtitle = 'Vous vivez';

    if (angular.isUndefined($scope.parentModel.famille)) {
      $scope.parentModel.famille = {'valeur': '', 'detail': {}};
    }

    $scope.model = $scope.parentModel.famille;
    $scope.detail = $scope.model.detail;
    $scope.question = {
      'model': 'valeur',
      'answers': [
        {'label': 'Avec vos parents', 'value': 'parents'},
        {'label': 'Seul', 'value': 'seul'},
        {'label': 'En couple', 'value': 'couple', 'onlyAdult': true},
        {'label': 'Avec vos enfants', 'value': 'enfants', 'onlyAdult': true},
        {'label': 'Autre', 'value': 'autre', 'detail': true}
      ]
    };

    $scope.showDetail = function(value) {
      if (value === 'autre') {
        $state.go('form.vie_quotidienne.vie_famille.autre');
      }
    };
    $scope.showDetail($scope.model.valeur);

    $scope.isNextStepDisabled = function(question) {
      if ($scope.model.valeur === '') {
        return true;
      }

      if ($scope.model.valeur === 'autre' && $scope.detail.autre === '') {
        return true;
      }
      
      return false;
    };

    $scope.nextStep = function() {
      $state.go('form.vie_quotidienne.logement');
    };
  });
