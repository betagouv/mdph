'use strict';

angular.module('impactApp')
  .factory('QuestionService', function QuestionService(DemandeService) {

    var loadAshCompile = function(str, profil) {

      var estHomme = DemandeService.estHomme(profil);
      var pronoun = estHomme ? 'il' : 'elle';
      var pronounTonic = estHomme ? 'lui' : 'elle';
      var fem = estHomme ? '' : 'e';
      var name = DemandeService.getPrenom(profil);

      var compiled = _.template(str);
      return compiled({
        name: name,
        pronoun: pronoun,
        pronounTonic: pronounTonic,
        fem: fem
      });
    };

    var compileLabel = function(answer, profil) {
      if (DemandeService.estMineur(profil)) {
        if (answer.labelRep) {
          return loadAshCompile(answer.labelRep, profil);
        }

        if (DemandeService.estHomme(profil) && answer.labelRepMasc) {
          return loadAshCompile(answer.labelRepMasc, profil);
        } else if (answer.labelRepFem) {
          return loadAshCompile(answer.labelRepFem, profil);
        }
      }

      return answer.label;
    };

    var compileDetailLabel = function(answer, profile) {
      if (DemandeService.estMineur(profile)) {
        if (answer.detailLabelRep) {
          return answer.detailLabelRep;
        }
      }

      return answer.detailLabel;
    };

    var compileTitle = function(question, profile) {
      if (DemandeService.estMineur(profile) && question.titleRep) {
        return loadAshCompile(question.titleRep, profile);
      }

      return question.titleDefault;
    };

    var compilePlaceholder = function(question, profil) {
      if (DemandeService.estMineur(profil) && angular.isDefined(question.placeholder)) {
        return loadAshCompile(question.placeholder, profil);
      }

      return question.placeholderDefault ? question.placeholderDefault : question.placeholder;
    };

    var capitaliseFirstLetter = function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return {
      get: function(section, model, profil) {
        var question = section.questions[model];
        if (typeof question === 'undefined') {
          console.error('Question "' + model + '" not found in section "' + section.id + '"');
        }

        var title = compileTitle(question, profil);
        question.title = capitaliseFirstLetter(title);

        angular.forEach(question.answers, function(answer) {
          var label = compileLabel(answer, profil);
          answer.label = capitaliseFirstLetter(label);

          if (answer.detailLabel) {
            answer.detailLabel = compileDetailLabel(answer, profil);
          }

          if (answer.placeholder) {
            var placeholder = compilePlaceholder(answer, profil);
            answer.placeholder = capitaliseFirstLetter(placeholder);
          }
        });

        return question;
      }
    };
  });
