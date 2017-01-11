'use strict';

angular.module('impactApp')
  .factory('initQuestionScope', function() {
    return function(scope, question, nextStep, data, previousModel, sectionModel) {
      scope.question = question;
      scope.nextStep = nextStep;
      scope.hideBack = data && data.hideBack;
      scope.isLastQuestion = data && data.isLastQuestion;

      // Si pas encore de réponse, on reprend la dernière
      if (!sectionModel[question.model]) {
        sectionModel[question.model] = previousModel[question.model];

        if (question.answers) {
          question.answers.map(function(answer) {
            sectionModel[answer.detailModel] = previousModel[answer.detailModel];
          });
        }
      }
    };
  })
  .controller('QuestionCtrl', function($scope, $state, question, previousModel, sectionModel, nextStep, initQuestionScope) {
    initQuestionScope($scope, question, nextStep, $state.current.data, previousModel, sectionModel);
  })
  .controller('CvQuestionCtrl', function($scope, question, nextStep, initQuestionScope, previousModel, sectionModel) {
    initQuestionScope($scope, question, nextStep, null, previousModel, sectionModel);
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
      index = $scope.experiences.indexOf(experience);

    };

    $scope.validerExperience = function(form) {
      if (form.$valid) {
        if (modification) {
          $scope.experiences.splice(index, 1);
          modification = false;
        }

        var lastIndex = _.findLastIndex($scope.experiences);
        $scope.experiences[lastIndex + 1] = $scope.tempExp;
        $scope.tempExp = {};
        $scope.ajoutEnCours = false;
      } else {
        form.showError = true;
      }
    };

    $scope.supprimerExperience = function(experience) {
      index = $scope.experiences.indexOf(experience);
      $scope.experiences.splice(index, 1);
    };

    $scope.annuler = function() {
      $scope.ajoutEnCours = false;
    };

    $scope.open = function($event, number) {
      $event.preventDefault();
      $event.stopPropagation();
      switch (number){
        case 1 :
          $scope.opened1 = true;
          break;
        case 2:
          $scope.opened2 = true;
          break;
      }
    };
  })
  .controller('RenseignementsQuestionCtrl', function($scope, $state, question, nextStep, initQuestionScope, previousModel, sectionModel) {
    initQuestionScope($scope, question, nextStep, $state.current.data, previousModel, sectionModel);

    $scope.placeholder = 'Autres renseignements';

    if (angular.isUndefined($scope.sectionModel.autresRenseignements)) {
      $scope.sectionModel.autresRenseignements = '';
    }
  })
  .controller('ListQuestionCtrl', function($scope, $state, question, nextStep, initQuestionScope, listName, previousModel, sectionModel) {
    initQuestionScope($scope, question, nextStep, $state.current.data, previousModel, sectionModel);

    if (angular.isUndefined($scope.sectionModel[question.model])) {
      $scope.sectionModel[question.model] = {};
      $scope.sectionModel[question.model][listName] = [];
    }

    $scope.model = $scope.sectionModel[question.model];

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };

    $scope.addLine = function() {
      $scope.model[listName].push({});
    };

    $scope.removeLine = function() {
      $scope.model[listName].pop();
    };
  })
  .controller('EmploiDuTempsCtrl', function($scope, $state, question, nextStep, initQuestionScope, previousModel, sectionModel) {
    initQuestionScope($scope, question, nextStep, $state.current.data, previousModel, sectionModel);

    $scope.jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    $scope.currentModel = question.model;

    if (angular.isUndefined($scope.sectionModel[$scope.currentModel])) {
      $scope.sectionModel[$scope.currentModel] = {
        jours: []
      };
      _.forEach($scope.jours, function(jour) {
        $scope.sectionModel[$scope.currentModel].jours.push({
          jour: jour,
          matin: '',
          midi: '',
          aprem: ''
        });
      });
    }

    $scope.model = $scope.sectionModel[$scope.currentModel];
  })
  .controller('SimpleSectionQuestionCtrl', function($scope, $state, sectionModel, question, nextStep, initQuestionScope, previousModel) {
    initQuestionScope($scope, question, nextStep, $state.current.data, previousModel, sectionModel);
    $scope.sectionModel = sectionModel;
  });
