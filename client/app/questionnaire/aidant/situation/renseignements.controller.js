'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:RenseignementsAidantCtrl
 * @description
 * # RenseignementsAidantCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('RenseignementsAidantCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('aidant', 'demandesAides', $scope.formAnswers);

    if (angular.isUndefined($scope.sectionModel.demandesAides)) {
      $scope.sectionModel.demandesAides = {};
    }

    $scope.nextStep = function() {
      $state.go('^.^.vos_attentes.type_attente');
    };
  });
