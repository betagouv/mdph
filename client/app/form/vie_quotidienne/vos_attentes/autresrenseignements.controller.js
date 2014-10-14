'use strict';

angular.module('impactApp')
  .controller('AutresRenseignementsCtrl', function ($scope, $state, QuestionService, FormService) {

    $scope.question = QuestionService.get('vieQuotidienne', 'autresRenseignements', $scope.formAnswers);

    $scope.placeholder = FormService.estRepresentant($scope.formAnswers) ?
      'Renseignements importants, et notamment son(ses) projet(s) dans sa vie de tous les jours' :
      'Renseignements importants, et notamment votre(vos) projet(s) dans votre vie de tous les jours';

    if (angular.isUndefined($scope.sectionModel.autresRenseignements)) {
      $scope.sectionModel.autresRenseignements = '';
    }

    $scope.nextStep = function() {
      $state.go('^.objet');
    };
  });
