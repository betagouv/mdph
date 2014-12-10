'use strict';

angular.module('impactApp')
  .factory('RequestService', function RequestService(isAdult, $sessionStorage, $http, $state, $window, Auth, User, RequestResource) {
    var currentRequest = null;
    if ($sessionStorage.currentRequest) {
      currentRequest = new RequestResource($sessionStorage.currentRequest);
    }

    return {
      createRequest: function(next) {
        var self = this;
        $http.post('/api/users/me/requests', {
          steps: [
            {
              name: 'questionnaire',
              state: 'en_cours'
            }
          ]})
        .success(function(data) {
          self.setCurrent(data);
          next(null, data);
        })
        .error(function(err) {
          next(err);
        });
      },

      saveCurrent: function(rootScope) {
        if (!currentRequest) {
          console.err('No current request');
          return;
        }

        currentRequest.steps = [{ name: 'questionnaire', state: 'en_cours' }];

        /**
        TODO Mettre dans le backoffice, valider l'etape questionnaire
        self.currentRequest.steps.push({
          name: 'obligatoire',
          state: 'en_cours',
          files: [
            { name: 'certificatMedical', state: 'demande' },
            { name: 'carteIdentite', state: 'demande' }
          ]
        });
        **/

        var success = function() {
          rootScope.broadCast('requestSaved');
        };

        var error = function(err) {
          $window.alert(err.data);
        };

        if (currentRequest._id) {
          currentRequest.$update(success, error);
        } else {
          currentRequest.$save(success, error);
        }
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

      saveNewStep: function(request, step, state, status, next) {
        this.saveNewStepAndFiles(request, step, state, [], status, next);
      },

      saveNewStepAndFiles: function(request, step, state, files, status, next) {
        this.saveStatus(request, status);
        $http.post('/api/requests/' + request.shortId + '/step', {step: step, state: state, files: files})
        .success(function(data) {
          request.steps.push(data);
          $state.go('^.' + step);
          if (next) { next(); }
        });
      },

      saveStatus: function(request, status) {
      	$http.post('/api/requests/' + request.shortId + '/status', {requestStatus: status})
        .success(function() {
        })
        .error(function(err) {
        	$window.alert(err);
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

      setCurrent: function(request) {
        currentRequest = $sessionStorage.currentRequest = request;
      },

      getCurrent: function(next) {
        return next ? next(currentRequest) : currentRequest;
      },

      resetCurrent: function() {
        this.setCurrent(null);
      },

      setCurrentMdph: function(mdph) {
        currentRequest.mdph = mdph;
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
