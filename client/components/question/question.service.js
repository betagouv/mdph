'use strict';

angular.module('impactApp')
  .factory('QuestionService', function QuestionService(ProfileService) {

    var loadAshCompile = function(str, profile) {

      var estHomme = ProfileService.estHomme(profile);
      var pronoun = estHomme ? 'il' : 'elle';
      var pronounTonic = estHomme ? 'lui' : 'elle';
      var fem = estHomme ? '' : 'e';
      var name = ProfileService.getPrenom(profile);

      var compiled = _.template(str);
      return compiled({
        name: name,
        pronoun: pronoun,
        pronounTonic: pronounTonic,
        fem: fem
      });
    };

    var compileLabel = function(answer, profile) {
      if (ProfileService.estMineur(profile)) {
        if (answer.labelRep) {
          return loadAshCompile(answer.labelRep, profile);
        }

        if (ProfileService.estHomme(profile) && answer.labelRepMasc) {
          return loadAshCompile(answer.labelRepMasc, profile);
        } else if (answer.labelRepFem) {
          return loadAshCompile(answer.labelRepFem, profile);
        }
      }

      return answer.label;
    };

    var compileTitle = function(question, profile) {
      if (ProfileService.estMineur(profile) && question.titleRep) {
        return loadAshCompile(question.titleRep, profile);
      }

      return question.titleDefault;
    };

    var compilePlaceholder = function(question, profile) {
      if (ProfileService.estMineur(profile) && angular.isDefined(question.placeholder)) {
        return loadAshCompile(question.placeholder, profile);
      }

      return question.placeholderDefault ? question.placeholderDefault : question.placeholder;
    };

    var capitaliseFirstLetter = function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return {
      get: function(section, model, profile) {
        var question = section.questions[model];
        if (typeof question === 'undefined') {
          console.error('Question "' + model + '" not found in section "' + section.id + '"');
        }

        var title = compileTitle(question, profile);
        question.title = capitaliseFirstLetter(title);

        angular.forEach(question.answers, function(answer) {
          var label = compileLabel(answer, profile);
          answer.label = capitaliseFirstLetter(label);

          if (answer.placeholder) {
            var placeholder = compilePlaceholder(answer, profile);
            answer.placeholder = capitaliseFirstLetter(placeholder);
          }
        });

        return question;
      }
    };
  });
