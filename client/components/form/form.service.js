'use strict';

angular.module('impactApp')
  .factory('FormService', function RequestService(isAdult) {
    return {
      getRepresentant: function(answers) {
        if (angular.isUndefined(answers.contexte)) {
          return null;
        }
        return answers.contexte.demandeur;
      },

      getName: function(answers) {
        var representant = this.getRepresentant(answers);
        if (angular.isUndefined(representant) || angular.isUndefined(representant.prenom)) {
          return 'la personne';
        }
        return representant.prenom;
      },

      estMasculin: function(answers) {
        var representant = this.getRepresentant(answers);
        if (angular.isUndefined(representant)) {
          return false;
        }
        return representant.sexe === 'masculin';
      },

      getPronoun: function(answers, capitalize) {
        if (capitalize) {
          return this.estMasculin(answers) ? 'Il' : 'Elle';
        }
        return this.estMasculin(answers) ? 'il' : 'elle';
      },

      getPronounTonic: function(answers) {
        return this.estMasculin(answers) ? 'lui' : 'elle';
      },

      estRepresentant: function(answers) {
        if (angular.isUndefined(answers.contexte)) {
          return false;
        }
        return answers.contexte.estRepresentant;
      },

      isAdult: function(answers) {
        return isAdult(answers.contexte);
      },

      estRenouvellement: function(formAnswers) {
        return formAnswers.contexte && !formAnswers.contexte.nouveauDossier;
      },

      getRenouvellementDroits: function(answers) {
        if (answers && answers.vie) {
          return answers.vie.mesPrestations;
        }

        return undefined;
      }
    };
  });
