'use strict';

angular.module('impactApp')
  .factory('RequestService', function RequestService($timeout, $sessionStorage, $http, $state, $window, Auth, User, RequestResource) {
    var currentRequest = null;
    if ($sessionStorage.currentRequest) {
      currentRequest = new RequestResource($sessionStorage.currentRequest);
    }

    return {
      saveCurrent: function(scope, next) {
        if (!currentRequest) {
          console.err('No current request');
          return;
        }

        currentRequest.steps = [{ name: 'questionnaire', state: 'complet' }];

        currentRequest.steps.push({
          name: 'obligatoire',
          state: 'en_cours',
          files: [
            { name: 'certificatMedical', state: 'demande' },
            { name: 'carteIdentite', state: 'demande' }
          ]
        });

        var success = function() {
          if (next) {
            next();
          }

          $timeout(function() {
            scope.$broadcast('requestSaved');
          }, 100);
        };

        var error = function(err) {
          $window.alert(err.data.message);
        };

        if (currentRequest._id) {
          currentRequest.$update(success, error);
        } else {
          currentRequest.$save(success, error);
        }
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

      resetCurrent: function(cb) {
        this.setCurrent(null);
        if (cb) { cb(); }
      },

      getCurrentStep: function(request) {
        if (!request || !request.steps) {
          return undefined;
        }
        return request.steps[request.steps.length - 1];
      },

      updatedAt: function(request) {
        return moment(request.updatedAt).fromNow();
      },

      updatedAtAscending: function(request) {
        return moment(request.updatedAt);
      },

    };
  });
