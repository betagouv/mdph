'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:LogementCtrl
 * @description
 * # LogementCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('LogementCtrl', function($scope, $state) {

    $scope.subtitle = 'Votre logement';

    if (angular.isUndefined($scope.parentModel.logement)) {
      $scope.parentModel.logement = {'valeur': '', 'detail': {}};
    }

    $scope.model = $scope.parentModel.logement;
    $scope.detail = $scope.parentModel.logement.detail;
    $scope.question = {
      'model': 'valeur',
      'answers': [
        {'label': 'Vous disposez d\'un logement indépendant', 'value': 'independant', 'onlyAdult': true, 'detail': true},
        {'label': 'Vous logez en établissement', 'value': 'etablissement', 'detail': true, 'placeholder': 'Nom de l\'établissement'},
        {'label': 'Vous êtes hébergé(e) au domicile', 'value': 'domicile', 'detail': true},
        {'label': 'Autre situation', 'value': 'autre', 'detail': true}
      ]
    };

    $scope.showDetail = function(value) {
      if (angular.isDefined(value) && value !== '') {
        $state.go('form.vie_quotidienne.logement.' + value);
      }
    };
    $scope.showDetail($scope.model.valeur);

    $scope.isNextStepDisabled = function(question) {
      if (angular.isUndefined($scope.model.valeur)) {
        return true;
      }

      if ($scope.detail[$scope.model[question.model]] === '') {
        return true;
      }
      
      return false;
    };

    $scope.nextStep = function() {
      $state.go('form.vos_besoins.quotidien');
    };
  });
