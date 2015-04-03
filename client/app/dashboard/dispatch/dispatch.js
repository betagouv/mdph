'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.dispatch', {
        url: '/dispatch',
        templateUrl: 'app/dashboard/dispatch/dispatch.html',
        controller: function($scope, dispatchRules) {
          $scope.dispatchRules = dispatchRules;
        },
        resolve: {
          dispatchRules: function(DispatchRuleResource) {
            return DispatchRuleResource.query().$promise;
          }
        },
        authenticate: true
      })
      .state('dashboard.dispatch.edit', {
        url: '/edit/:id',
        templateUrl: 'app/dashboard/dispatch/edit/edit.html',
        controller: 'DispatchRuleEditCtrl',
        resolve: {
          dispatchRule: function(DispatchRuleResource, $stateParams) {
            if ($stateParams.id) {
              return DispatchRuleResource.get({id: $stateParams.id}).$promise;
            } else {
              return new DispatchRuleResource();
            }
          },
          evaluators: function(Auth) {
            return Auth.getAllUsers();
          },
          zipcodes: function() {
            // TODO recuperer liste des codes postaux
            return ['14000', '14001', '14002', '14003', '14004', '14005', '14006', '14007'];
          }
        },
        authenticate: true
      });
  });
