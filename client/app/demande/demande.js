'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('departement.demande', {
        url: '/:shortId',
        resolve: {
          sections: function($http) {
            return $http.get('/api/sections').then(function(result) {
              return result.data;
            });
          },
          request: function($stateParams, $sessionStorage, RequestResource, mdph, sections) {
            if ($stateParams.shortId === 'nouvelle_demande') {
              var request = $sessionStorage.request;
              if (typeof request === 'undefined') {
                request = $sessionStorage.request = {
                  formAnswers: {},
                  status: 'en_cours',
                  documents: [],
                  createdAt: Date.now()
                };

                sections.forEach(function(section) {
                  request.formAnswers[section.id] = {};
                });
              }

              request.mdph = mdph.zipcode;
              return new RequestResource(request);
            } else {
              return RequestResource.get({shortId: $stateParams.shortId}, function(request) {
                if (!request.formAnswers) {
                  request.formAnswers = {};
                }
              }).$promise;
            }
          },
          mainUpdateRequest: function($state, $window, $timeout, $rootScope, user, request) {
            return function(parent) {

              var onError = function(err) {
                $rootScope.$broadcast('saving', 'error');
                $window.alert(err.data.message);
              };

              var onSuccess = function() {
                $rootScope.$broadcast('saving', 'success');
                $timeout(function() {
                  $state.go(parent, {shortId: request.shortId});
                }, 100);
              };

              if (user) {
                if (request._id) {
                  if (request.status === 'en_cours') {
                    $rootScope.$broadcast('saving', 'pending');
                    request.$update(onSuccess, onError);
                  } else {
                    $window.alert('Vos modifications ne seront pas prises en compte car cette demande à déjà été transmise.');
                    $state.go(parent);
                  }
                } else {
                  $rootScope.$broadcast('saving', 'pending');
                  request.$save(onSuccess, onError);
                }
              } else {
                $state.go(parent);
              }
            }
          }
        },
        views: {
          '@': {
            templateUrl: 'app/demande/demande.html',
            controller: 'DemandeCtrl'
          },
          'header@departement.demande': {
            templateUrl: 'app/demande/header/header.html',
            controller: 'HeaderCtrl'
          },
          'steps@departement.demande': {
            templateUrl: 'app/demande/steps/steps.html',
            controller: function ($scope, allSteps) {
              $scope.steps = allSteps;
              $scope.isStepComplete = function(step) {

              }
            }
          },
          'body@departement.demande': {
            templateUrl: 'app/demande/body/body.html'
          }
        }
      });
  });
