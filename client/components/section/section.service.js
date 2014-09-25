'use strict';

angular.module('impactApp')
  .factory('SectionService', function SectionService($sessionStorage, defaultSections, formSteps, $state) {
    var sections = defaultSections;
    var vieQuotidienne = sections[1];
    var scolarite = sections[2];
    var travail = sections[3];
    var aidant = sections[4];
    var envoi = sections[5];

    var stepsById = _.indexBy(formSteps, 'id');

    var getAnswerSection = function(answers) {
      if (answers && answers.vie && answers.vie.answers.attentes && answers.vie.answers.attentes.answers.objetDemande) {
        return answers.vie.answers.attentes.answers.objetDemande;
      }

      return undefined;
    };

    var getAnswerSectionScolaire = function(answers) {
      var answerSection = getAnswerSection(answers);
      return answerSection ? answerSection.scolarite : false;
    };

    var getAnswerSectionTravail = function(answers) {
      var answerSection = getAnswerSection(answers);
      return answerSection ? answerSection.travail : false;
    };

    return {
      getFormSteps: function(form) {
        var currentStep;
        if (form === null) {
          currentStep = stepsById.questionnaire;
        } else {
          currentStep = stepsById[form.step];
          if (currentStep.step > 0) {
            stepsById.questionnaire.isFinished = true;
            stepsById.obligatoire.isEnabled = true;
          }
          if (currentStep.step > 1) {
            stepsById.obligatoire.isFinished = true;
            stepsById.preevaluation.isEnabled = true;
          }
          if (currentStep.step > 2) {
            stepsById.preevaluation.isFinished = true;
            stepsById.complementaire.isEnabled = true;
          }
          if (currentStep.step > 3) {
            stepsById.complementaire.isFinished = true;
            stepsById.evaluation.isEnabled = true;
          }
          if (currentStep.step > 4) {
            stepsById.evaluation.isFinished = true;
            stepsById.reponse.isEnabled = true;
          }
        }

        $state.go(currentStep.sref);

        return formSteps;
      },

      getSections: function(form, refresh) {
        if (refresh) {
          this.refresh(form);
        }
        return sections;
      },

      refresh: function(form) {
        var answers = form.formAnswers;
        if (angular.isUndefined(answers)) {
          return;
        }
        vieQuotidienne.isEnabled = angular.isDefined(answers.vie);
        scolarite.isEnabled = getAnswerSectionScolaire(answers);
        travail.isEnabled = getAnswerSectionTravail(answers);
        aidant.isEnabled = angular.isDefined(answers.vie);
        envoi.isEnabled = angular.isDefined(answers.envoi);
      },

      goToNextSection: function(currentSectionId) {
        var probableNext = sections[currentSectionId + 1];
        if (probableNext.isOptionnal && !probableNext.isEnabled) {
          this.goToNextSection(probableNext.id);
        } else {
          probableNext.isEnabled = true;
          $state.go(probableNext.sref);
        }
      }
    };
  });
