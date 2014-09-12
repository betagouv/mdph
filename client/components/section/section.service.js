'use strict';

angular.module('impactApp')
  .factory('SectionService', function SectionService($sessionStorage, defaultSections, $state) {
    var sections = defaultSections;
    var vieQuotidienne = sections[1];
    var scolarite = sections[2];
    var travail = sections[3];
    var aidant = sections[4];
    var envoi = sections[5];

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
        envoi.isEnabled = angular.isDefined(form.envoi);
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
