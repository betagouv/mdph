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

    if (angular.isUndefined($scope.sectionModel.heures)) {
      $scope.sectionModel.heures = {
        label: 'Durée de travail',
        value: '',
        addon: 'Heures / semaine'
      };
    }

    $scope.model = $scope.sectionModel.heures;

    $scope.checkNextStep = function(answer) {
      return answer.value === '';
    };

    $scope.nextStep = function() {
      $state.go('^.adapte');
    };
  });
