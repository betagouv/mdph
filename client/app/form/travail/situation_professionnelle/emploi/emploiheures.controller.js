'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:EmploiHeuresCtrl
 * @description
 * # EmploiHeuresCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('EmploiHeuresCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('travail', 'heures', $scope.formAnswers);

    if (angular.isUndefined($scope.sectionModel[$scope.question.model])) {
      $scope.sectionModel[$scope.question.model] = {
        label: 'Durée de travail',
        value: '',
        addon: 'Heures / semaine'
      };
    }

    $scope.model = $scope.sectionModel[$scope.question.model];

    $scope.checkNextStep = function(answer) {
      return answer.value === '';
    };

    $scope.nextStep = function() {
      $state.go('^.adapte');
    };
  });
