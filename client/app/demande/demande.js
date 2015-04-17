'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('departement.demande', {
        url: '/:shortId',
        templateUrl: 'app/demande/demande.html',
        controller: 'DemandeCtrl',
        data: {
          hideBack: false,
          isLastQuestion: false
        },
        resolve: {
          sections: function($http) {
            return $http.get('/api/sections').then(function(result) {
              return result.data;
            });
          },
          request: function($stateParams, $sessionStorage, RequestResource, mdph) {
            if ($stateParams.shortId === 'nouvelle_demande') {
              var request = $sessionStorage.request;
              if (typeof request === 'undefined') {
                request = $sessionStorage.request = {
                  formAnswers: {},
                  status: 'en_cours',
                  documents: [],
                  createdAt: Date.now()
                };
              }

              request.mdph = mdph.zipcode;
              return new RequestResource(request);
            }

            return RequestResource.get({shortId: $stateParams.shortId}, function(request) {
              if (!request.formAnswers) {
                request.formAnswers = {};
              }
            }).$promise;
          },
          updateRequest: function($state, $window, $timeout, request) {
            return function() {
              var onError = function(err) {
                $window.alert(err.data.message);
              };

              var onSuccess = function() {
                $timeout(function() {
                  $window.alert('Votre progression à été sauvegardée');
                  $state.go('departement.demande', {shortId: request.shortId});
                }, 100);
              };

              if (request._id && request.status === 'en_cours') {
                request.$update(onSuccess, onError);
              } else if (request._id) {
                $window.alert('Vos modifications ne seront pas pris en compte car cette demande à déjà été transmise.');
                $state.go('departement.demande');
              }else {
                $state.go('departement.demande');
              }
            };
          }
        }
      });
  });
