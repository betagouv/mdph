'use strict';

angular.module('impactApp')
  .controller('FormCtrl', function ($scope, $rootScope, $state, $stateParams, FormService, $sessionStorage, getDocuments, currentForm, datepickerConfig) {

    datepickerConfig.showWeeks = false;

    $scope.$storage = $sessionStorage.$default({
      /* Sections
      ----------------------------*/
      sectionContexte: {
        id: 0,
        sref: 'form.contexte',
        label: 'Pour commencer',
        isOptionnal: false,
        isEnabled: true
      },
      sectionVieQuotidienne: {
        id: 1,
        sref: 'form.vie_quotidienne',
        span: 'A',
        label: 'Vie quotidienne',
        isOptionnal: false
      },
      sectionScolarite: {
        id: 2,
        sref: 'form.votre_scolarite',
        span: 'B',
        label: 'Vie scolaire ou étudiante',
        isOptionnal: true
      },
      sectionTravail: {
        id: 3,
        sref: 'form.votre_travail',
        span: 'C',
        label: 'Vie au travail',
        isOptionnal: true
      },
      sectionAidant: {
        id: 4,
        sref: 'form.votre_aidant',
        span: 'D',
        label: 'Aidant familial',
        isOptionnal: true
      },
      sectionEnvoi: {
        id: 5,
        sref: 'form.envoi',
        glyphicon: 'glyphicon-paperclip',
        label: 'Pièces justificatives',
        isOptionnal: false
      },
      /* Form data
      ----------------------------*/
      answers: {}
    });

    $scope.sections = [
      $scope.$storage.sectionContexte,
      $scope.$storage.sectionVieQuotidienne,
      $scope.$storage.sectionScolarite,
      $scope.$storage.sectionTravail,
      $scope.$storage.sectionAidant,
      $scope.$storage.sectionEnvoi
    ];

    $scope.getLabel = function(answer) {
      if (FormService.estRepresentant($scope.formAnswers)) {
        if (answer.labelRep) {
          return answer.labelRep;
        }
        if (FormService.estMasculin($scope.formAnswers) && answer.labelRepMasc) {
          return answer.labelRepMasc;
        } else if (answer.labelRepFem){
          return answer.labelRepFem;
        }
      }
      return answer.label;
    };

    $scope.encode = function(json) {
      return encodeURIComponent(JSON.stringify(json));
    };

    $scope.getDocuments = function() {
      return getDocuments(FormService.getName($scope.formAnswers));
    };

    $scope.goToNextSection = function(currentSection) {
      var probableNext = $scope.sections[currentSection.id + 1];
      if (probableNext.isOptionnal && !probableNext.isEnabled) {
        $scope.goToNextSection(probableNext);
      } else {
        $state.go(probableNext.sref);
      }
    };

    if (angular.isDefined(currentForm)) {
      $scope.form = currentForm;
      $scope.formAnswers = currentForm.formAnswers;
      $scope.$storage.sectionContexte.isEnabled = true;
      $scope.$storage.sectionVieQuotidienne.isEnabled = true;
      $scope.$storage.sectionScolarite.isEnabled = angular.isDefined($scope.formAnswers.scolaire);
      $scope.$storage.sectionTravail.isEnabled = angular.isDefined($scope.formAnswers.travail);
      $scope.$storage.sectionAidant.isEnabled = angular.isDefined($scope.formAnswers.aidant);
      $scope.$storage.sectionEnvoi.isEnabled = true;
    } else {
      $scope.formAnswers = $scope.$storage.answers;
    }

  });
