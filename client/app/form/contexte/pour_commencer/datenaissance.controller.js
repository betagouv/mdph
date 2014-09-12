'use strict';

angular.module('impactApp')
  .controller('DateNaissanceCtrl', function($scope, $state, datepickerConfig, QuestionService) {

    $scope.question = QuestionService.get('contexte', 'dateNaissance', $scope.formAnswers);

    datepickerConfig.datepickerMode = 'year';

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };

    $scope.nextStep = function() {
      $scope.sections[1].isEnabled = true;
      $state.go('^.^.situations.particulieres');
    };
  });
