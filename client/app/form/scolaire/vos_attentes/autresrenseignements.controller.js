'use strict';

angular.module('impactApp')
  .controller('AutresRenseignementsScolaireCtrl', function ($scope, QuestionService) {

    $scope.question = QuestionService.get('vieScolaireAutresRenseignements', $scope.formAnswers);

    $scope.placeholder = 'Autres renseignements';

    if (angular.isUndefined($scope.sectionModel.vieScolaireAutresRenseignements)) {
      $scope.sectionModel.vieScolaireAutresRenseignements = '';
    }

    $scope.nextStep = function() {
      $scope.goToNextSection($scope.currentSectionId);
    };
  });
