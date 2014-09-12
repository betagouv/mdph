'use strict';

angular.module('impactApp')
  .factory('QuestionService', function QuestionService(FormService, questions) {
    var q = _.indexBy(questions, 'model');

    var loadAshCompile = function(str, formAnswers) {
      var compiled = _.template(str);
      return compiled({
        'name': FormService.getName(formAnswers),
        'pronoun': FormService.getPronoun(formAnswers),
        'pronounTonic': FormService.getPronounTonic(formAnswers)
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

    return {
      // DEPRECATED
      getLabel: function(form, answer) {
        if (FormService.estRepresentant(form.formAnswers)) {
          if (answer.labelRep) {
            return answer.labelRep;
          }
          if (FormService.estMasculin(form.formAnswers) && answer.labelRepMasc) {
            return answer.labelRepMasc;
          } else if (answer.labelRepFem){
            return answer.labelRepFem;
          }
        }
        return answer.label;
      },

      get: function(model, formAnswers) {
        var question = q[model];
        question.title = computeTitle(question, formAnswers);
        angular.forEach(question.answers, function(answer) {
          answer.label = computeLabel(answer, formAnswers);
        });
        return question;
      },

      isNextStepDisabled: function(question, section, next) {
        if (question.type === 'checkbox') {
          return false;
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
      }

    };
  });
