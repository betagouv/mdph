'use strict';

angular.module('impactApp')
  .controller('DateNaissanceCtrl', function($scope, $state, datepickerConfig, QuestionService, Auth) {

    $scope.question = QuestionService.get('contexte', 'dateNaissance', $scope.formAnswers);
    var user = Auth.getCurrentUser();
    if(user && !$scope.$parent.sectionModel.dateNaissance){
      $scope.$parent.sectionModel.dateNaissance = user.birthDate;
    }

    datepickerConfig.datepickerMode = 'year';
    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };

    $scope.nextStep = function() {
      if ($scope.currentRequest.renouvellement) {
        $state.go('^.^.renouvellement.evolution');
      } else {
        $state.go('^.^.vie_quotidienne.situation.vie_famille');
      }
    };
  });

