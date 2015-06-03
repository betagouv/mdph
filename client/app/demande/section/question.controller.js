'use strict';

angular.module('impactApp')
  .controller('QuestionCtrl', function($scope, $state, question, nextStep) {
    $scope.question = question;
    $scope.nextStep = nextStep;
    $scope.hideBack = $state.current.data.hideBack;
    $scope.isLastQuestion = $state.current.data.isLastQuestion;
  })
  .controller('StructureQuestionCtrl', function ($scope, $state, question, nextStep) {
    $scope.question = question;
    $scope.nextStep = nextStep;
    $scope.hideBack = $state.current.data.hideBack;
    $scope.isLastQuestion = $state.current.data.isLastQuestion;

    if (angular.isUndefined($scope.sectionModel[question.model])) {
      $scope.sectionModel[$scope.question.model] = {

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
  .controller('FraisQuestionCtrl', function ($scope, question, nextStep) {
    $scope.question = question;
    $scope.nextStep = nextStep;

    if (angular.isUndefined($scope.sectionModel[question.model])) {
      $scope.sectionModel[$scope.question.model] = {
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
      var lastIndex = $scope.model.listeFrais.length-1;
      $scope.model.listeFrais.splice(lastIndex, 1);
    };
  })
  .controller('DiplomesQuestionCtrl', function ($scope, question, nextStep) {
    $scope.question = question;
    $scope.nextStep = nextStep;
    $scope.opened = [];

    if (angular.isUndefined($scope.sectionModel[question.model])) {
      $scope.sectionModel[$scope.question.model] = {
        listeDiplomes: [
          {
            'nom': '',
            'annee': '',
            'domaine': ''
          }
        ]
      };
    }

    $scope.model = $scope.sectionModel[question.model];
    $scope.ajouterDiplome = function() {
      $scope.model.listeDiplomes.push(
        {
          'nom': '',
          'annee': '',
          'domaine': ''
        }
      );
    };
    $scope.retirerDiplome = function(){
      var lastIndex = $scope.model.length-1;
      $scope.model.listeDiplomes.splice(lastIndex, 1);
    };
    $scope.open = function($event, idx) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened[idx] = true;
    };

  })
  .controller('CvQuestionCtrl', function ($scope, question, nextStep) {
    $scope.question = question;
    $scope.nextStep = nextStep;
    $scope.ajoutEnCours = false;
    var modification = false;
    var index = -1;

    if (angular.isUndefined($scope.sectionModel[question.model])) {
      $scope.sectionModel[$scope.question.model] = {
        experiences: []
      };
    }
    $scope.experiences = $scope.sectionModel[$scope.question.model].experiences;

    $scope.ajouterExperience = function() {
      $scope.ajoutEnCours = true;
      $scope.tempExp = {};
    };

    $scope.modifierExperience = function(experience) {
      $scope.tempExp = experience;
      modification = true;
      $scope.ajoutEnCours = true;
      index = $scope.sectionModel[$scope.question.model].experiences.indexOf(experience);

    };

    $scope.validerExperience = function(form) {
      if (form.$valid) {
        if (modification) {
          $scope.sectionModel[$scope.question.model].experiences.splice(index, 1);
          modification = false;
        }
        var lastIndex = _.findLastIndex($scope.sectionModel[$scope.question.model].experiences);
        $scope.sectionModel[$scope.question.model].experiences[lastIndex+1] = $scope.tempExp;
        $scope.tempExp = {};
        $scope.ajoutEnCours = false;
      }
      else {
        form.showError = true;
      }
    };

    $scope.supprimerExperience = function(experience) {
      index = $scope.sectionModel[$scope.question.model].experiences.indexOf(experience);
      $scope.sectionModel[$scope.question.model].experiences.splice(index, 1);
    };

    $scope.annuler = function() {
      $scope.ajoutEnCours = false;
    };

    $scope.open = function($event, number) {
      $event.preventDefault();
      $event.stopPropagation();
      switch(number){
        case 1 :
          $scope.opened1 = true;
          break;
        case 2:
          $scope.opened2 = true;
          break;
      }
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
        jours: []
      };
      _.forEach($scope.jours, function(jour){
        $scope.sectionModel[$scope.currentModel].jours.push({
          jour : jour,
          matin: '',
          midi: '',
          aprem: ''
        });
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
