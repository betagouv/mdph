'use strict';

angular.module('impactApp')
  .factory('FormService', function FormService(isAdult, $sessionStorage, $http, $state, $window) {
    return {
      getCurrentForm: function() {
        return $http.get('/api/forms/mine').then(function(result) {
          return result.data;
        }).catch(function() {
          return {
            formAnswers: {}
          };
        });
      },

      saveCurrentForm: function() {
        $http.put('/api/forms/mine', $sessionStorage.answers)
        .success(function() {
          $state.go('demande');
        })
        .error(function() {
          $window.alert('Vous avez déjà enregistré un questionnaire sur ce compte. Le questionnaire courant sera perdu.');
          $state.go('demande');
        });
      },

      getRepresentant: function(answers) {
        if (angular.isUndefined(answers.contexte)||
            angular.isUndefined(answers.contexte.answers)) {
          return undefined;
        }
        return answers.contexte.answers.demandeur;
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
        if (angular.isUndefined(answers.contexte) ||
            angular.isUndefined(answers.contexte.answers) ||
            angular.isUndefined(answers.contexte.answers.estRepresentant)) {
          return false;
        }
        return answers.contexte.answers.estRepresentant.value;
      },

      isAdult: function(answers) {
        return isAdult(answers.contexte);
      },

      updatedAt: function(form) {
        return moment(form.updatedAt).fromNow();
      }
    };
  });
