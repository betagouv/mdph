'use strict';

angular.module('impactApp')
  .controller('AutresRenseignementsScolaireCtrl', function ($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('scolaire', 'vieScolaireAutresRenseignements', $scope.formAnswers);
    $scope.isLastQuestion = true;

    $scope.placeholder = 'Autres renseignements';

    if (angular.isUndefined($scope.sectionModel.vieScolaireAutresRenseignements)) {
      $scope.sectionModel.vieScolaireAutresRenseignements = '';
    }

    $scope.nextStep = function() {
      $scope.$parent.saveSection($scope.sectionModel);
    };
  });
