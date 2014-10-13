'use strict';

angular.module('impactApp')
  .factory('RequestService', function RequestService(isAdult, $sessionStorage, $http, $state, $window, Auth, RequestResource) {
    var currentRequest = {};

    return {

      startNew: function() {
        currentRequest = {};
        $sessionStorage.currentRequest = currentRequest;
      },

      getCurrentRequest: function() {
        return currentRequest;
      },

      saveCurrentRequest: function(formAnswers) {
        Auth.getCurrentUser().$promise.then(function (user) {
          $http.put('/api/users/' + user._id + 'requests', {formAnswers: formAnswers ? formAnswers : $sessionStorage.formAnswers, steps: [
            // TODO LES STEPS
            ]})
          .success(function() {
            // TODO http put save mdph
            user.mdph = $sessionStorage.formAnswers.contexte.mdph;
          })
          .error(function(err) {
            if (err === 'Locked') {
              $window.alert('Vous avez déjà enregistré un questionnaire sur ce compte. Le questionnaire courant sera perdu.');
            } else {
              $window.alert(err);
            }
          })
          .finally(function() {
            $state.go('demande');
          });
        });

      },

      saveStepState: function(request, step, state, next) {
        this.saveStepStateAndFiles(request, step, state, [], next);
      },

      saveStepStateAndFiles: function(request, step, state, files, next) {
        RequestResource.updateStep({id: request._id}, {step: step.id, state: state, files: files})
        .success(function() {
          _.find(request.steps, {name: step.id}).state = state;
          if (next) { next(); }
        });
      },

      saveNewStep: function(request, step, state, next) {
        this.saveNewStepAndFiles(request, step, state, [], next);
      },

      saveNewStepAndFiles: function(request, step, state, files, next) {
        $http.post('/api/requests/' + request._id + '/step', {step: step, state: state, files: files})
        .success(function(data) {
          request.steps.push(data);
          $state.go('^.' + step);
          if (next) { next(); }
        });
      },

      /**
      * Utilitaires
      */
      getCurrent: function(requests) {
        if (!requests || !angular.isArray(requests)) {
          return {};
        } else if (requests.length === 1) {
          return requests[0];
        } else {
          var current = _.max(requests, function(request) {
            return request.updatedAt;
          });
          return current;
        }
      },

      getCurrentStep: function(request) {
        return request.steps[request.steps.length - 1];
      },

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

      updatedAt: function(request) {
        return moment(request.updatedAt).fromNow();
      },

      estRenouvellement: function(formAnswers) {
        return formAnswers.contexte && !formAnswers.contexte.nouveauDossier;
      },

      getRenouvellementDroits: function(request) {
        if (request && request.vie) {
          return request.vie.mesPrestations;
        }

        return undefined;
      }
    };
  });
