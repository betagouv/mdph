'use strict';

angular.module('impactApp')
  .factory('QuestionService', function QuestionService(estMineur) {

    var estMasculin = function(formAnswers) {
      try {
        return formAnswers.identites.beneficiaire.sexe === 'masculin';
      } catch(e) {
        return true;
      }
    };

    var estRepresentant = function(formAnswers) {
      try {
        return estMineur(formAnswers.identites.beneficiaire.dateNaissance);
      } catch(e) {
        return false;
      }
    };

    var loadAshCompile = function(str, formAnswers) {
      function getName() {
        try {
          return formAnswers.identites.beneficiaire.prenom;
        } catch(e) {
          return 'le bénéficiaire de la demande';
        }
      }

      function getPronounTonic(formAnswers) {
        return estMasculin(formAnswers) ? 'lui' : 'elle';
      }

      function getPronoun() {
        return estMasculin(formAnswers) ? 'il' : 'elle';
      }

      function getFeminin() {
        return estMasculin(formAnswers) ? '' : 'e';
      }

      var compiled = _.template(str);
      var name = getName(formAnswers);
      var pronoun = getPronoun(formAnswers);
      var pronounTonic = getPronounTonic(formAnswers);
      var fem = getFeminin(formAnswers);

      return compiled({
        'name': name,
        'pronoun': pronoun,
        'pronounTonic': pronounTonic,
        'fem': fem
      });
    };

    var compileLabel = function(answer, formAnswers) {
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

    var compileTitle = function(question, formAnswers) {
      if (estRepresentant(formAnswers) && question.titleRep) {
        return loadAshCompile(question.titleRep, formAnswers);
      }
      return question.titleDefault;
    };

    var compilePlaceholder = function(question, formAnswers) {
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
        var question = section.questions[model];
        if (typeof question === 'undefined') {
          console.error('Question "' + model + '" not found in section "' + section.id + '"');
        }

        var title = compileTitle(question, formAnswers);
        question.title = capitaliseFirstLetter(title);

        angular.forEach(question.answers, function(answer) {
          var label = compileLabel(answer, formAnswers);
          answer.label = capitaliseFirstLetter(label);

          if(answer.placeholder){
            var placeholder = compilePlaceholder(answer, formAnswers);
            answer.placeholder = capitaliseFirstLetter(placeholder);
          }
        });

        return question;
      }
    };
  });
