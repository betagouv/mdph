'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:NomPosteCtrl
 * @description
 * # NomPosteCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('NomPosteCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('travail', 'nomPoste', $scope.formAnswers);

    if (angular.isUndefined($scope.sectionModel.nomPoste)) {
      $scope.sectionModel.nomPoste = {
        placeholder: 'Nom du poste',
        value: ''
      };
    }

    $scope.model = $scope.sectionModel.nomPoste;

    $scope.checkNextStep = function(answer) {
      return answer.value === '';
    };

    $scope.nextStep = function() {
      $state.go('^.temps');
    };
  });
