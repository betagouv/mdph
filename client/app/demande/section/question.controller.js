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
    var currentModel = question.model;

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };

    if (angular.isUndefined($scope.sectionModel[currentModel])) {
      $scope.sectionModel[currentModel] = {
        valeur: false,
        etablissements: [
          {
            nom: '',
            rue: '',
            ville: '',
            date: ''
          }
        ]
      };
    }

    $scope.model = $scope.sectionModel[currentModel];
    $scope.ajouterEtablissement = function() {
      $scope.model.etablissements.push(
        {
          nom: '',
          rue: '',
          ville: '',
          date: ''
        }
      );
    };
    $scope.retirerEtablissement = function(){
      var lastIndex = $scope.model.etablissements.indexOf(_.last($scope.model.etablissements));
      $scope.model.etablissements.splice(lastIndex, 1);
    };
  })
  .controller('EmploiDuTempsCtrl', function($scope, $state, question, nextStep) {
    $scope.jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    $scope.question = question;
    $scope.nextStep = nextStep;
    $scope.hideBack = $state.current.data.hideBack;
    $scope.isLastQuestion = $state.current.data.isLastQuestion;
    $scope.currentModel = question.model;

    if (angular.isUndefined($scope.sectionModel[$scope.currentModel])) {
      $scope.sectionModel[$scope.currentModel] = {
        valeur: false,
        jours: {}
      };
      _.forEach($scope.jours, function(jour){
        $scope.sectionModel[$scope.currentModel].jours[jour] = {
          matin: '',
          midi: '',
          aprem: ''
        };
      });
    }
    $scope.model = $scope.sectionModel[$scope.currentModel];
  })
  .controller('SimpleSectionQuestionCtrl', function($scope, $state, sectionModel, question, nextStep) {
    $scope.sectionModel = sectionModel;
    $scope.question = question;
    $scope.nextStep = nextStep;
    $scope.hideBack = $state.current.data.hideBack;
    $scope.isLastQuestion = $state.current.data.isLastQuestion;
  });
