'use strict';

angular.module('impactApp')
  .controller('CodePostalCtrl', function($scope, $state, FormService, QuestionService) {

    $scope.question = QuestionService.get('contexte', 'codePostal', $scope.formAnswers);

    $scope.mdph = {};

    $scope.findMdph = function() {
      var value = $scope.sectionModel[$scope.question.model];
      if (angular.isDefined(value)) {
        if (value.indexOf('14') === 0) {
          $scope.mdph.value = 'Votre demande sera dirigée vers la MDPH du 14, Calvados.';
        } else if (value.indexOf('59') === 0) {
          $scope.mdph.value = 'Votre demande sera dirigée vers la MDPH du 59, Nord.';
        } else {
          $scope.mdph.value = 'Ce département ne participe pas à l\'expérimentation de formulaire en ligne. Vous pourrez imprimer votre demande et l\'envoyer par courrier.';
        }
      } else {
        $scope.mdph.value = '';
      }
    };

    $scope.findMdph();

    $scope.nextStep = function() {
      $state.go('^.dossier');
    };
  });
