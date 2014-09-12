'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:EmploiTempsCtrl
 * @description
 * # EmploiTempsCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('EmploiTempsCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('travail', 'temps', $scope.formAnswers);

    $scope.nextStep = function() {
      if ($scope.sectionModel.temps) {
        $state.go('^.adapte');
      } else {
        $state.go('^.heures');
      }
    };
  });
