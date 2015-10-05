'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard.users', {
        url: '/utilisateurs',
        templateUrl: 'app/dashboard/users/users.html',
        controller: function($scope, pending) {
          $scope.pending = pending;
        },

        resolve: {
          pending: function($http, currentMdph) {
            return $http({method: 'HEAD', url: '/api/partenaires', params: {status: 'en_attente', mdph: currentMdph._id}}).then(function(result) {
              return result.headers('count');
            });
          }
        },
        authenticate: true,
        abstract: true
      })
      .state('dashboard.users.agents', {
        url: '/agents',
        templateUrl: 'app/dashboard/users/agents/agents.html',
        controller: function($scope, users) {
          $scope.users = users;
        },

        resolve: {
          users: function(Auth) {
            return Auth.getAllUsers();
          }
        },
        authenticate: true
      })
      .state('dashboard.users.agents.edit', {
        url: '/:id',
        templateUrl: 'app/dashboard/users/agents/edit.html',
        controller: 'AgentsEditCtrl',
        resolve: {
          user: function(User, $stateParams) {
            if ($stateParams.id) {
              return User.get({id: $stateParams.id}).$promise;
            } else {
              return new User();
            }
          },

          currentUser: function(Auth) {
            return Auth.getCurrentUser();
          }
        },
        authenticate: true
      })
      .state('dashboard.users.partenaires', {
        url: '/:status',
        templateUrl: 'app/dashboard/users/partenaires/partenaires.html',
        controller: function($scope, partenaires, title) {
          $scope.partenaires = partenaires;
          $scope.title = title;
        },

        resolve: {
          partenaires: function($stateParams, Partenaire, currentMdph) {
            return Partenaire.query({status: $stateParams.status, mdph: currentMdph._id});
          },

          title: function($stateParams) {
            switch ($stateParams.status) {
              case 'certifie':
                return 'Certifiés';
              case 'refuse':
                return 'Refusés';
              default:
                return 'En attente';
            }
          }
        },
        authenticate: true
      })
      .state('dashboard.users.partenaires.edit', {
        url: '/:id',
        templateUrl: 'app/dashboard/users/partenaires/edit.html',
        controller: 'PartenairesEditCtrl',
        resolve: {
          partenaire: function($stateParams, Partenaire) {
            return Partenaire.get({id: $stateParams.id});
          }
        },
        authenticate: true
      });
  });
