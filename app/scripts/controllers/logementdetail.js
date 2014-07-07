'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:LogementDetailCtrl
 * @description
 * # LogementDetailCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('LogementDetailCtrl', function($scope, $state) {

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
          $state.go('q.vie_quotidienne.logement_detail.independant');
          break;
        case 'domicile':
          $state.go('q.vie_quotidienne.logement_detail.domicile');
          break;
        case 'etablissement':
          $state.go('q.vie_quotidienne.logement_detail.etablissement');
          break;
        case 'autre':
          $state.go('q.vie_quotidienne.logement_detail.autre');
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
      $state.go('q.vie_quotidienne.vos_besoins.quotidien');
    };
  });
