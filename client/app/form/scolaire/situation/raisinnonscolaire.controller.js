'use strict';

angular.module('impactApp')
  .controller('RaisonNonScolaireCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('scolaire', 'raisonNonScolaire', $scope.formAnswers);

    $scope.checkNextStep = function(value) {
      if (value === 'etablissement' && !$scope.sectionModel.raisonNonScolaireEtablissement) {
        return true;
      }
      if (value === 'tropJeune' && !$scope.sectionModel.raisonNonScolaireTropJeune) {
        return true;
      }
      if (value === 'autre' && !$scope.sectionModel.raisonNonScolaireAutre) {
        return true;
      }
      return false;
    };

    $scope.nextStep = function() {
      $scope.sections[1].isEnabled = true;
      $state.go('^.^.vos_attentes');
    };
  });
