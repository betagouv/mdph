'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.users', {
        url: '/utilisateurs',
        templateUrl: 'app/dashboard/users/users.html',
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
            return User.get({id: $stateParams.id});
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
          partenaires: function($stateParams, Partenaire) {
            return Partenaire.query({status: $stateParams.status});
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
        url: '/:email',
        templateUrl: 'app/dashboard/users/partenaires/edit.html',
        controller: 'PartenairesEditCtrl',
        resolve: {
          partenaire: function($stateParams, Partenaire) {
            return Partenaire.get({email: $stateParams.email});
          }
        },
        authenticate: true
      });
  });
