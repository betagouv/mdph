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
            return $http.get('api/questions').then(function(result) {
              return result.data;
            });
          },
          request: function($stateParams, $sessionStorage, RequestResource, mdph) {
            if ($stateParams.shortId === 'nouvelle_demande') {
              var request = $sessionStorage.request;
              if (typeof request === 'undefined') {
                request = $sessionStorage.request = {
                  formAnswers: {},
                  documents: [ {type: 'certificatMedical'}, {type: 'carteIdentite'} ],
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

              if (request._id) {
                request.$update(onSuccess, onError);
              } else {
                $state.go('departement.demande');
              }
            };
          }
        }
      })
      // Modale de login/signup
      .state('departement.demande.modal', {
        abstract: true,
        onEnter: function($rootScope, $modal, $state) {
          $modal.open({
            template: '<div ui-view="modal"></div>',
            backdrop: true,
            windowClass: 'right fade',
            controller: 'ModalLoginCtrl'
          }).result.then(function() {
            $rootScope.$broadcast('logged-in-save-request');
            $state.go('departement.demande');
          }, function() {
            $state.go('departement.demande');
          });
        }
      })
      .state('departement.demande.modal.login', {
        url: '/login',
        views: {
          'modal@': {
            templateUrl: 'components/modal/login.html'
          }
        }
      })
      .state('departement.demande.modal.signup', {
        url: '/signup',
        views: {
          'modal@': {
            templateUrl: 'components/modal/signup.html'
          }
        }
      });
  });
