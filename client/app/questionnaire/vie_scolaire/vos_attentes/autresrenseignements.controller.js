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
      $scope.sectionModel.__completion = true;
      $state.go('departement.questionnaire');
    };
  });
