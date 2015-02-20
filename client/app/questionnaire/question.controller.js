'use strict';

angular.module('impactApp')
  .controller('QuestionCtrl', function($scope, $state, question, nextStep) {
    $scope.question = question;
    $scope.nextStep = nextStep;
    $scope.hideBack = $state.current.data.hideBack;
  })
  .controller('CheckboxQuestionCtrl', function($scope, $state, question, nextStep) {
    $scope.question = question;
    $scope.nextStep = nextStep;
    $scope.hideBack = $state.current.data.hideBack;
    if (angular.isUndefined($scope.sectionModel[question.model])) {
      $scope.sectionModel[question.model] = {};
    }
  })
  .controller('StructureQuestionCtrl', function ($scope, question, nextStep) {
    $scope.question = question;
    $scope.nextStep = nextStep;

    if (angular.isUndefined($scope.sectionModel[question.model])) {
      $scope.sectionModel[$scope.question.model] = {
        valeur: false,
        structures: [
          {'name': '', 'contact': false}
        ]
      };
    }

    $scope.model = $scope.sectionModel[question.model];

    $scope.addStructure = function() {
      $scope.model.structures.push(
        {'name': '', 'contact': false}
      );
    };
  })
  .controller('RenseignementsQuestionCtrl', function ($scope, question, nextStep) {
    $scope.question = question;
    $scope.nextStep = nextStep;
    $scope.isLastQuestion = true;
    $scope.placeholder = 'Autres renseignements';

    if (angular.isUndefined($scope.sectionModel.autresRenseignements)) {
      $scope.sectionModel.autresRenseignements = '';
    }
  })
  .controller('EtablissementScolaireCtrl', function($scope, question, nextStep) {
    $scope.question = question;
    $scope.nextStep = nextStep;

    if (angular.isUndefined($scope.sectionModel.etablissement)) {
      $scope.sectionModel.etablissement = {
        valeur: false,
        etablissements: [
          { 'name': '' }
        ]
      };
    }

    $scope.model = $scope.sectionModel.etablissement;
    $scope.addEtablissement = function() {
      $scope.model.etablissements.push(
        { 'name': '' }
      );
    };
  });
