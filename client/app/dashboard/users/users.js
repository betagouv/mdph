'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard.users', {
        url: '/utilisateurs',
        template: '<div ui-view></div>',
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
        controller: function($scope, users, actions) {
          $scope.users = users;
          $scope.actions = actions;
        },

        resolve: {
          users: function(MdphResource, currentMdph) {
            return MdphResource.queryUsers({zipcode: currentMdph.zipcode}).$promise;
          },

          actions: function(MdphResource, currentMdph) {
            return MdphResource.queryUsersHistory({zipcode: currentMdph.zipcode}).$promise;
          },

          secteurs: function(SecteurResource, currentMdph) {
            return SecteurResource.query({mdph: currentMdph.zipcode}).$promise;
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
      .state('dashboard.users.agents.edit', {
        url: '/:id',
        templateUrl: 'app/dashboard/users/agents/edit.html',
        controller: 'AgentsEditCtrl',
        data: {
          forms: {}
        },
        resolve: {
          user: function(User, $stateParams) {
            var id = $stateParams.id;
            if (id && id !== 'nouvel_agent') {
              return User.get({id: $stateParams.id}).$promise;
            } else {
              return new User();
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
