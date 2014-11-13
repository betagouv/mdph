'use strict';

angular.module('impactApp')
  .controller('AutresRenseignementsScolaireCtrl', function ($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('scolaire', 'vieScolaireAutresRenseignements', $scope.formAnswers);

    $scope.placeholder = 'Autres renseignements';

    if (angular.isUndefined($scope.sectionModel.vieScolaireAutresRenseignements)) {
      $scope.sectionModel.vieScolaireAutresRenseignements = '';
    }

    $scope.nextStep = function() {
      $state.go('questionnaire.projet_de_vie.travail.situation_professionnelle.condition');
    };
  });
