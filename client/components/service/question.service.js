'use strict';

angular.module('impactApp')
  .factory('QuestionService', function QuestionService(DemandeService) {

    var loadAshCompile = function(str, demande) {

      var estHomme = DemandeService.estHomme(demande);
      var pronoun = estHomme ? 'il' : 'elle';
      var pronounTonic = estHomme ? 'lui' : 'elle';
      var fem = estHomme ? '' : 'e';
      var name = DemandeService.getPrenom(demande);

      var compiled = _.template(str);
      return compiled({
        name: name,
        pronoun: pronoun,
        pronounTonic: pronounTonic,
        fem: fem
      });
    };

    var compileLabel = function(answer, demande) {
      if (DemandeService.estMineur(demande)) {
        if (answer.labelRep) {
          return loadAshCompile(answer.labelRep, demande);
        }

        if (DemandeService.estHomme(demande) && answer.labelRepMasc) {
          return loadAshCompile(answer.labelRepMasc, demande);
        } else if (answer.labelRepFem) {
          return loadAshCompile(answer.labelRepFem, demande);
        }
      }

      return answer.label;
    };

    var compileTitle = function(question, demande) {
      if (DemandeService.estMineur(demande) && question.titleRep) {
        return loadAshCompile(question.titleRep, demande);
      }

      return question.titleDefault;
    };

    var compilePlaceholder = function(question, demande) {
      if (DemandeService.estMineur(demande) && angular.isDefined(question.placeholder)) {
        return loadAshCompile(question.placeholder, demande);
      }

      return question.placeholderDefault ? question.placeholderDefault : question.placeholder;
    };

    var capitaliseFirstLetter = function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return {
      get: function(section, model, demande) {
        var question = section.questions[model];
        if (typeof question === 'undefined') {
          console.error('Question "' + model + '" not found in section "' + section.id + '"');
        }

        var title = compileTitle(question, demande);
        question.title = capitaliseFirstLetter(title);

        angular.forEach(question.answers, function(answer) {
          var label = compileLabel(answer, demande);
          answer.label = capitaliseFirstLetter(label);

          if (answer.placeholder) {
            var placeholder = compilePlaceholder(answer, demande);
            answer.placeholder = capitaliseFirstLetter(placeholder);
          }
        });

        return question;
      }
    };
  });
