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

    $scope.isNextStepDisabled = function(question) {
      if ($scope.model.valeur === '') {
        return true;
      }

      if ($scope.model.valeur === 'autre' && !$scope.detail[$scope.model[question.model]]) {
        return true;
      }
      
      return false;
    };

    var next;
    $scope.showDetail = function(value) {
      if (value === 'autre' && !$state.includes('**.autre')) {
        $state.go('.autre');
        next = '^.^.logement';
      } else {
        next = '^.logement';
      }
    };
    $scope.showDetail($scope.model.valeur);

    $scope.nextStep = function() {
      $state.go(next);
    };
  });
