'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard.requests', {
        url: '/demandes',
        templateUrl: 'app/dashboard/requests/requests.html',
        controller: 'RequestsCtrl',
        resolve: {
          users: function(Auth) {
            return Auth.getAllUsers();
          },

          secteurs: function(SecteurResource) {
            return SecteurResource.query().$promise;
          },

          currentUser: function(Auth) {
            return Auth.getCurrentUser();
          },

          incomplete: function(RequestResource) {
            return RequestResource.query().$promise;
          }
        },
        authenticate: true
      })
      .state('dashboard.requests.pending', {
        url: '/en_attente/:secteurId',
        templateUrl: 'app/dashboard/requests/pending/pending.html',
        controller: 'PendingRequestsCtrl',
        resolve: {
          requests: function($http, $stateParams) {
            var secteurId = $stateParams.secteurId;
            if (secteurId === 'en_cours') {
              return $http.get('/api/secteurs/null/requests?status=en_cours').then(function(result) {
                return result.data;
              });
            } else {
              if (secteurId === 'autres') {
                secteurId = 'null';
              }

              return $http.get('/api/secteurs/' + secteurId + '/requests').then(function(result) {
                return result.data;
              });
            }
          }
        },
        authenticate: true
      })
      .state('dashboard.requests.user', {
        url: '/utilisateur/:userId',
        templateUrl: 'app/dashboard/requests/list/list.html',
        controller: 'RequestListCtrl',
        resolve: {
          requests: function(RequestResource, currentUser, user) {
            if (currentUser._id === user._id) {
              return RequestResource.query({evaluator: user._id, status: 'emise'}).$promise;
            }

            return RequestResource.query({evaluator: user._id}).$promise;
          },

          user: function($http, $stateParams) {
            return $http.get('/api/users/' + $stateParams.userId).then(function(user) {
              return user.data;
            });
          },

          showArchiveAction: function() {
            return true;
          }
        },
        authenticate: true
      })
      .state('dashboard.requests.userArchive', {
        url: '/utilisateur/:userId/archive',
        templateUrl: 'app/dashboard/requests/list/list.html',
        controller: 'RequestListCtrl',
        resolve: {
          requests: function(RequestResource, user) {
            return RequestResource.query({evaluator: user._id, status: 'evaluation'}).$promise;
          },

          user: function($http, $stateParams) {
            return $http.get('/api/users/' + $stateParams.userId).then(function(user) {
              return user.data;
            });
          },

          showArchiveAction: function() {
            return false;
          }
        },
        authenticate: true
      })
      .state('dashboard.requests.userIncomplete', {
        url: '/utilisateur/:userId/incomplete',
        templateUrl: 'app/dashboard/requests/list/list.html',
        controller: 'RequestListCtrl',
        resolve: {
          requests: function(RequestResource, user) {
            return RequestResource.query({evaluator: user._id, status: 'en_cours'}).$promise;
          },

          user: function($http, $stateParams) {
            return $http.get('/api/users/' + $stateParams.userId).then(function(user) {
              return user.data;
            });
          },

          showArchiveAction: function() {
            return false;
          }
        },
        authenticate: true
      })
      .state('dashboard.requests.detail', {
        url: '/detail/:shortId',
        templateUrl: 'app/dashboard/requests/detail/detail.html',
        controller: function($scope, $state, $cookieStore, $window, request, user) {
          $scope.request = request;
          $scope.user = user;
          $scope.token = $cookieStore.get('token');

          $scope.back = function() {
            $window.history.back();
          };

          $scope.archive = function(request) {
            request.status = 'evaluation';
            request.$save(function() {
              $state.go('dashboard.requests', {}, {reload: true});
            });
          };

          $scope.supprimer = function(request) {
            request.$delete(function() {
              $state.go('dashboard.requests', {}, {reload: true});
            });
          };
        },

        resolve: {
          request: function($http, $stateParams, RequestResource) {
            return RequestResource.get({shortId: $stateParams.shortId}).$promise;
          },

          user: function($http, request) {
            return $http.get('api/users/' + request.user).then(function(result) {
              return result.data;
            });
          },

          prestations: function($http) {
            return $http.get('api/prestations').then(function(result) {
              return result.data;
            });
          },

          prestationsQuitus: function($http, $stateParams) {
            return $http.get('api/requests/' + $stateParams.shortId + '/simulation').then(function(result) {
              return result.data;
            });
          }
        },
        abstract: true,
        authenticate: true
      })
      .state('dashboard.requests.detail.pre_evaluation', {
        url: '/pre_evaluation',
        templateUrl: 'app/dashboard/requests/detail/pre_evaluation/pre_evaluation.html',
        controller: 'RequestPreEvaluationCtrl',
        resolve: {
          recapitulatif: function($http, $stateParams) {
            return $http.get('/api/requests/' + $stateParams.shortId + '/recapitulatif').then(function(request) {
              return request.data;
            });
          }
        },
        authenticate: true
      })
      .state('dashboard.requests.detail.evaluation', {
        url: '/evaluation',
        templateUrl: 'app/dashboard/requests/detail/evaluation/evaluation.html',
        controller: 'RequestEvaluationCtrl',
        resolve: {
          sections: function(GevaService, request) {
            return GevaService.getSections(request);
          }
        },
        authenticate: true
      })
      .state('dashboard.requests.detail.evaluation.section', {
        url: '/:sectionId',
        templateUrl: 'app/dashboard/requests/detail/evaluation/section/section.html',
        controller: 'RequestSectionCtrl',
        authenticate: true
      });
  });
