'use strict';

angular.module('impactApp')
  .controller('QuestionCtrl', function($scope, $state, question, nextStep) {
    $scope.question = question;
    $scope.nextStep = nextStep;
    $scope.hideBack = $state.current.data.hideBack;
    $scope.isLastQuestion = $state.current.data.isLastQuestion;
  })
  .controller('CheckboxQuestionCtrl', function($scope, $state,question, nextStep) {
    $scope.question = question;
    $scope.nextStep = nextStep;
    $scope.hideBack = $state.current.data.hideBack;
    $scope.isLastQuestion = $state.current.data.isLastQuestion;

    if (angular.isUndefined($scope.sectionModel[question.model])) {
      $scope.sectionModel[question.model] = {};
    }
  })
  .controller('StructureQuestionCtrl', function ($scope, $state, question, nextStep) {
    $scope.question = question;
    $scope.nextStep = nextStep;
    $scope.hideBack = $state.current.data.hideBack;
    $scope.isLastQuestion = $state.current.data.isLastQuestion;

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
  .controller('FraisQuestionCtrl', function ($scope, $state, question, nextStep) {
    $scope.question = question;
    $scope.nextStep = nextStep;

    if (angular.isUndefined($scope.sectionModel[question.model])) {
      $scope.sectionModel[$scope.question.model] = {
        valeur: false,
        listeFrais: [
          {
            'nom': '',
            'frequence': '',
            'total': '',
            'rembourse': '',
            'detail': ''
          }
        ]
      };
    }

    $scope.model = $scope.sectionModel[question.model];
    $scope.ajouterFrais = function() {
      $scope.model.listeFrais.push(
        {
            'nom': '',
            'frequence': '',
            'total': '',
            'rembourse': '',
            'detail': ''
          }
      );
    };
    $scope.retirerFrais = function(){
      var lastIndex = $scope.model.listeFrais.indexOf(_.last($scope.model.listeFrais));
      $scope.model.listeFrais.splice(lastIndex, 1);
    };
  })
  .controller('RenseignementsQuestionCtrl', function ($scope, $state, question, nextStep) {
    $scope.question = question;
    $scope.nextStep = nextStep;
    $scope.hideBack = $state.current.data.hideBack;
    $scope.isLastQuestion = $state.current.data.isLastQuestion;

    $scope.placeholder = 'Autres renseignements';

    if (angular.isUndefined($scope.sectionModel.autresRenseignements)) {
      $scope.sectionModel.autresRenseignements = '';
    }
  })
  .controller('EtablissementScolaireCtrl', function($scope, $state, question, nextStep) {
    $scope.question = question;
    $scope.nextStep = nextStep;
    $scope.hideBack = $state.current.data.hideBack;
    $scope.isLastQuestion = $state.current.data.isLastQuestion;

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
  })
  .controller('SimpleSectionQuestionCtrl', function($scope, $state, sectionModel, question, nextStep) {
    $scope.sectionModel = sectionModel;
    $scope.question = question;
    $scope.nextStep = nextStep;
    $scope.hideBack = $state.current.data.hideBack;
    $scope.isLastQuestion = $state.current.data.isLastQuestion;
  });
