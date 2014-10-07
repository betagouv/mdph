'use strict';

angular.module('impactApp')
  .factory('FormService', function FormService(isAdult, $sessionStorage, $http, $state, $window, Auth) {
    return {
      /**
      * Appels API
      */

      getCurrentForm: function() {
        return $http.get('/api/forms/mine').then(function(result) {
          return result.data;
        }).catch( function() {
          return null;
        });
      },

      getAllForms: function() {
        return $http.get('/api/forms').then(function(forms) {
          return forms.data;
        });
      },

      saveCurrentForm: function() {
        $http.put('/api/forms/mine', $sessionStorage.formAnswers)
        .success(function() {
          Auth.getCurrentUser().$promise.then(function (user) {
            user.mdph = $sessionStorage.formAnswers.contexte.mdph;
          });
          $state.go('demande');
        })
        .error(function() {
          $window.alert('Vous avez déjà enregistré un questionnaire sur ce compte. Le questionnaire courant sera perdu.');
          $state.go('demande');
        });
      },

      saveStepState: function(form, step, state, next) {
        this.saveStepStateAndFiles(form, step, state, [], next);
      },

      saveStepStateAndFiles: function(form, step, state, files, next) {
        $http.put('/api/forms/' + form._id + '/step', {step: step.id, state: state, files: files})
        .success(function() {
          _.find(form.steps, {name: step.id}).state = state;
          if (next) { next(); }
        });
      },

      saveNewStep: function(form, step, state, next) {
        this.saveNewStepAndFiles(form, step, state, [], next);
      },

      saveNewStepAndFiles: function(form, step, state, files, next) {
        $http.post('/api/forms/' + form._id + '/step', {step: step, state: state, files: files})
        .success(function(data) {
          form.steps.push(data);
          $state.go('^.' + step);
          if (next) { next(); }
        });
      },
      /**
      * Utilitaires
      */

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

      updatedAt: function(form) {
        return moment(form.updatedAt).fromNow();
      },

      estRenouvellement: function(formAnswers) {
        return formAnswers.contexte && !formAnswers.contexte.nouveauDossier;
      },

      getRenouvellementDroits: function(form) {
        if (form && form.vie) {
          return form.vie.mesPrestations;
        }

        return undefined;
      }
    };
  });
