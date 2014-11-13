'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:EmploiPasseCtrl
 * @description
 * # EmploiPasseCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('EmploiPasseCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('travail', 'passe', $scope.formAnswers);

    $scope.model = $scope.sectionModel.passe;

    $scope.nextStep = function() {
      $state.go('^.pole_emploi');
    };
  });
