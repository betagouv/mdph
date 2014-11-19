'use strict';

angular.module('impactApp')
  .factory('RequestService', function RequestService(isAdult, $sessionStorage, $http, $state, $window, Auth, User, RequestResource) {
    return {
      createRequest: function(next) {
        $http.post('/api/users/me/requests', {
          steps: [
            {
              name: 'questionnaire',
              state: 'en_cours'
            }
          ]})
        .success(function(data) {
          $sessionStorage.currentRequest = data;
          next(null, data);
        })
        .error(function(err) {
          next(err);
        });
      },

      saveCurrentForm: function(request) {
        request.steps[0].state = 'complet';
        request.steps.push({
          name: 'obligatoire',
          state: 'en_cours',
          files: [
            { name: 'certificatMedical', state: 'demande' },
            { name: 'carteIdentite', state: 'demande' }
          ]
        });

        $http.put('/api/requests/' + request.shortId, {
          steps: request.steps,
          mdph: $sessionStorage.formAnswers.contexte.mdph,
          formAnswers: $sessionStorage.formAnswers
        })
        .success(function(data) {
          $sessionStorage.currentRequest = data;
          $state.go('liste_demandes.demande.obligatoire', {id: data._id, step: 'obligatoire'});
        })
        .error(function(err) {
          if (err === 'Locked') {
            $window.alert('Vous avez déjà enregistré un questionnaire sur ce compte.');
          } else {
            $window.alert(err);
          }
        });
      },

      saveStepState: function(request, step, state, next) {
        this.saveStepStateAndFiles(request, step, state, [], next);
      },

      saveStepStateAndFiles: function(request, step, state, files, next) {
        RequestResource.updateStep({shortId: request.shortId}, {step: step.id, state: state, files: files}, function() {
          _.find(request.steps, {name: step.id}).state = state;
          if (next) { next(); }
        });
      },

      saveNewStep: function(request, step, state, next) {
        this.saveNewStepAndFiles(request, step, state, [], next);
      },

      saveNewStepAndFiles: function(request, step, state, files, next) {
        $http.post('/api/requests/' + request.shortId + '/step', {step: step, state: state, files: files})
        .success(function(data) {
          request.steps.push(data);
          $state.go('^.' + step);
          if (next) { next(); }
        });
      },

      /**
      * Utilitaires
      */
      getUserRequests: function() {
        return User.queryRequests({}, function(requests) {
          if (requests && angular.isArray(requests)) {
            $sessionStorage.currentRequest = _.find(requests, 'opened');
          }
        });
      },

      getCurrent: function(next) {
        var current = $sessionStorage.currentRequest;
        if (next) {
          return next(current);
        }
        return current;
      },

      getCurrentStep: function(request) {
        if (!request || !request.steps) {
          return undefined;
        }
        return request.steps[request.steps.length - 1];
      },

      updatedAt: function(request) {
        return moment(request.updatedAt).fromNow();
      }
    };
  });
