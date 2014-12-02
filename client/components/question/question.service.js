'use strict';

angular.module('impactApp')
  .factory('QuestionService', function QuestionService(FormService, contexte, vieQuotidienne, vieScolaire, travail, aidant, renouvellement) {

    var q = {
      contexte: _.indexBy(contexte, 'model'),
      vieQuotidienne: _.indexBy(vieQuotidienne, 'model'),
      scolaire: _.indexBy(vieScolaire, 'model'),
      travail: _.indexBy(travail, 'model'),
      aidant: _.indexBy(aidant, 'model'),
      renouvellement: _.indexBy(renouvellement, 'model')
    };

    var loadAshCompile = function(str, formAnswers) {
      var compiled = _.template(str);
      return compiled({
        'name': FormService.getName(formAnswers),
        'pronoun': FormService.getPronoun(formAnswers),
        'pronounTonic': FormService.getPronounTonic(formAnswers),
        'fem': FormService.estMasculin(formAnswers) ? '' : 'e'
      });
    };

    var computeLabel = function(answer, formAnswers) {
      if (FormService.estRepresentant(formAnswers)) {
        if (answer.labelRep) {
          return loadAshCompile(answer.labelRep, formAnswers);
        }
        if (FormService.estMasculin(formAnswers) && answer.labelRepMasc) {
          return loadAshCompile(answer.labelRepMasc, formAnswers);
        } else if (answer.labelRepFem){
          return loadAshCompile(answer.labelRepFem, formAnswers);
        }
      }
      return answer.labelDefault;
    };

    var computeTitle = function(question, formAnswers) {
      if (FormService.estRepresentant(formAnswers) && angular.isDefined(question.titleRep)) {
        return loadAshCompile(question.titleRep, formAnswers);
      }
      return question.titleDefault;
    };

    var capitaliseFirstLetter = function (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return {
      get: function(section, model, formAnswers) {
        var question = q[section][model];
        if (!question) {
          return;
        }
        question.title = capitaliseFirstLetter(computeTitle(question, formAnswers));
        angular.forEach(question.answers, function(answer) {
          answer.label = capitaliseFirstLetter(computeLabel(answer, formAnswers));
        });
        return question;
      },

      isNextStepDisabled: function(question, section, next) {
        if (question.type === 'checkbox') {
          return false;
        }

        if (!section) {
          return true;
        }

        var value = section[question.model];
        if (angular.isUndefined(value)) {
          return true;
        }

        var answer = _.find(question.answers, function(answer) {
          return answer.value === value;
        });

        if (answer && answer.detailModel && !section[answer.detailModel]) {
          return true;
        }

        if (next) {
          return next(value);
        } else {
          return false;
        }
      },

      getAnswer: function(section, model, formAnswers) {
        if (formAnswers[section] && formAnswers[section][model]) {
          return formAnswers[section][model];
        }
        return undefined;
      }
    };
  });
