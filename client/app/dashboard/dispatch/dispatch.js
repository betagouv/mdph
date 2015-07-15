'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.dispatch', {
        url: '/dispatch',
        templateUrl: 'app/dashboard/dispatch/dispatch.html',
        authenticate: true,
        abstract: true
      })
      .state('dashboard.dispatch.regles', {
        url: '/regles',
        templateUrl: 'app/dashboard/dispatch/regles/regles.html',
        controller: function($scope, DispatchRuleResource) {
          $scope.dispatchRules = DispatchRuleResource.query();
        },
        authenticate: true
      })
      .state('dashboard.dispatch.regles.edit', {
        url: '/edit/:id',
        templateUrl: 'app/dashboard/dispatch/regles/edit/edit.html',
        controller: 'DispatchRuleEditCtrl',
        resolve: {
          dispatchRule: function(DispatchRuleResource, $stateParams) {
            if ($stateParams.id) {
              return DispatchRuleResource.get({id: $stateParams.id}).$promise;
            } else {
              return new DispatchRuleResource();
            }
          },
          secteurs: function(SecteurResource) {
            return SecteurResource.query().$promise;
          },
          zipcodes: function() {
            // TODO recuperer liste des codes postaux
            return ['14000', '14001', '14002', '14003', '14004', '14005', '14006', '14007'];
          }
        },
        authenticate: true
      })
      .state('dashboard.dispatch.secteurs', {
        url: '/secteurs',
        templateUrl: 'app/dashboard/dispatch/secteurs/secteurs.html',
        controller: function($scope, secteurs) {
          $scope.secteurs = secteurs;
        },
        resolve: {
          secteurs: function(SecteurResource) {
            return SecteurResource.query().$promise;
          }
        },
        authenticate: true
      })
      .state('dashboard.dispatch.secteurs.edit', {
        url: '/edit/:id',
        templateUrl: 'app/dashboard/dispatch/secteurs/edit/edit.html',
        controller: 'SecteurEditCtrl',
        resolve: {
          secteur: function(SecteurResource, $stateParams) {
            if ($stateParams.id) {
              return SecteurResource.get({id: $stateParams.id}).$promise;
            } else {
              return new SecteurResource();
            }
          },
          evaluators: function(Auth) {
            return Auth.getAllUsers();
          }
        },
        authenticate: true
      });
  });
