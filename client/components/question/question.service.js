'use strict';

angular.module('impactApp')
  .factory('QuestionService', function QuestionService(estMineur) {

    var getName = function(formAnswers) {
      try {
        return formAnswers.identites.beneficiaire.prenom;
      } catch(e) {
        return 'le bénéficiaire de la demande';
      }
    };

    var estMasculin = function(formAnswers) {
      try {
        return formAnswers.identites.beneficiaire.sexe === 'masculin';
      } catch(e) {
        return true;
      }
    };

    var getPronoun = function(formAnswers, capitalized) {
      if (capitalized) {
        return estMasculin(formAnswers) ? 'Il' : 'Elle';
      }
      return estMasculin(formAnswers) ? 'il' : 'elle';
    };

    var getPronounTonic = function(formAnswers) {
      return estMasculin(formAnswers) ? 'lui' : 'elle';
    };

    var loadAshCompile = function(str, formAnswers) {
      var compiled = _.template(str);
      return compiled({
        'name': getName(formAnswers),
        'pronoun': getPronoun(formAnswers),
        'pronounTonic': getPronounTonic(formAnswers),
        'fem': estMasculin(formAnswers) ? '' : 'e'
      });
    };

    var estRepresentant = function(formAnswers) {
      try {
        return estMineur(formAnswers.identites.beneficiaire.dateNaissance);
      } catch(e) {
        return true;
      }
    };

    var computeLabel = function(answer, formAnswers) {
      if (estRepresentant(formAnswers)) {
        if (answer.labelRep) {
          return loadAshCompile(answer.labelRep, formAnswers);
        }
        if (estMasculin(formAnswers) && answer.labelRepMasc) {
          return loadAshCompile(answer.labelRepMasc, formAnswers);
        } else if (answer.labelRepFem){
          return loadAshCompile(answer.labelRepFem, formAnswers);
        }
      }
      return answer.label;
    };

    var computeTitle = function(question, formAnswers) {
      if (estRepresentant(formAnswers) && angular.isDefined(question.titleRep)) {
        return loadAshCompile(question.titleRep, formAnswers);
      }
      return question.titleDefault;
    };

    var computePlaceholder = function(question, formAnswers) {
      if (estRepresentant(formAnswers) && angular.isDefined(question.placeholder)) {
        return loadAshCompile(question.placeholder, formAnswers);
      }
      return question.placeholderDefault ? question.placeholderDefault : question.placeholder;
    };

    var capitaliseFirstLetter = function (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return {
      get: function(section, model, formAnswers) {
        var questions = section.questions;
        var question = questions[model];
        if (!question) {
          return;
        }
        question.title = capitaliseFirstLetter(computeTitle(question, formAnswers));
        angular.forEach(question.answers, function(answer) {
          answer.label = capitaliseFirstLetter(computeLabel(answer, formAnswers));
          if(answer.placeholder){
            answer.placeholder = capitaliseFirstLetter(computePlaceholder(answer, formAnswers));
          }
        });
        return question;
      },

      getAnswer: function(section, model, formAnswers) {
        if (formAnswers[section] && formAnswers[section][model]) {
          return formAnswers[section][model];
        }
        return undefined;
      }
    };
  });
