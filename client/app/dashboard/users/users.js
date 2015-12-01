'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard.users', {
        url: '/utilisateurs',
        templateUrl: 'app/dashboard/users/users.html',
        controller: function($scope, pending, nonValid) {
          $scope.pending = pending;
          $scope.nonValid = nonValid;
        },

        resolve: {
          nonValid: function(MdphResource, currentMdph) {
            return MdphResource.queryPartenaires({zipcode: currentMdph.zipcode, status: 'mail_non_valide'}).$promise;
          },

          pending: function(MdphResource, currentMdph) {
            return MdphResource.queryPartenaires({zipcode: currentMdph.zipcode, status: 'en_attente'}).$promise;
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
          users: function(MdphResource, currentMdph) {
            return MdphResource.queryUsers({zipcode: currentMdph.zipcode}).$promise;
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
          partenaires: function($stateParams, MdphResource, currentMdph) {
            return MdphResource.queryPartenaires({zipcode: currentMdph.zipcode, status: $stateParams.status}).$promise;
          },

          title: function($stateParams) {
            switch ($stateParams.status) {
              case 'certifie':
                return 'Certifiés';
              case 'refuse':
                return 'Refusés';
              case 'mail_non_valide':
                return 'Mail envoyé, en attente de validation';
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
