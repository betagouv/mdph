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

    $scope.question = {
      'title': 'Votre vie quotidienne',
      'subTitle': 'Votre logement',
      'detail': '',
      'answers': [
        {'label': 'Vous disposez d\'un logement indépendant', 'value': 'independant', 'detail': true},
        {'label': 'Vous logez en établissement', 'value': 'etablissement', 'detail': true, 'placeholder': 'Nom de l\'établissement'},
        {'label': 'Vous êtes hébergé(e) au domicile', 'value': 'domicile', 'detail': true},
        {'label': 'Autre situation', 'value': 'autre', 'detail': true}
      ]
    };

    $scope.$watch('question.model', function() {
      switch ($scope.question.model) {
        case 'independant':
          $state.go('form.vie_quotidienne.logement.independant');
          break;
        case 'domicile':
          $state.go('form.vie_quotidienne.logement.domicile');
          break;
        case 'etablissement':
          $state.go('form.vie_quotidienne.logement.etablissement');
          break;
        case 'autre':
          $state.go('form.vie_quotidienne.logement.autre');
          break;
      }
      $scope.question.detail = '';
    });

    $scope.isNextStepDisabled = function() {
      if ($scope.question.model === undefined) {
        return true;
      }
      if ($scope.question.detail === '') {
        return true;
      }
      return false;
    };

    $scope.nextStep = function() {
      $scope.data.logement = $scope.question.model;
      $scope.data.logementDetail = $scope.question.detail;
      $state.go('form.vos_besoins.quotidien');
    };
  });
