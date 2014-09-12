'use strict';

angular.module('impactApp')
  .controller('RepresentantCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('contexte', 'estRepresentant', $scope.formAnswers);

    $scope.checkNextStep = function(value) {
      if (value) {
        var demandeur = $scope.sectionModel.demandeur;
        if (angular.isUndefined(demandeur)) {
          return true;
        }
        if (!demandeur.prenom || demandeur.prenom === '') {
          return true;
        }
        if (!demandeur.sexe) {
          return true;
        }
      }

      return false;
    };

    $scope.nextStep = function() {
      $state.go('^.code_postal');
    };
  });
