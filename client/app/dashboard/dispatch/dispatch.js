'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard.dispatch', {
        url: '/dispatch',
        templateUrl: 'app/dashboard/dispatch/dispatch.html',
        authenticate: true,
        abstract: true
      })
      .state('dashboard.dispatch.secteurs', {
        url: '/secteurs',
        templateUrl: 'app/dashboard/dispatch/secteurs/secteurs.html',
        controller: function($scope, secteurs, currentMdph) {
          $scope.secteurs = secteurs;

          $scope.delete = function(secteur, idx) {
            secteur.$delete({mdph: currentMdph.zipcode}, function() {
              $scope.secteurs.splice(idx, 1);
            });
          };
        },

        resolve: {
          secteurs: function(SecteurResource, currentMdph) {
            return SecteurResource.query({mdph: currentMdph.zipcode}).$promise;
          }
        },
        authenticate: true
      })
      .state('dashboard.dispatch.secteurs.edit', {
        url: '/edit/:id',
        templateUrl: 'app/dashboard/dispatch/secteurs/edit/edit.html',
        controller: 'SecteurEditCtrl',
        resolve: {
          secteur: function(SecteurResource, $stateParams, currentMdph) {
            if ($stateParams.id) {
              return SecteurResource.get({mdph: currentMdph.zipcode, id: $stateParams.id}).$promise;
            } else {
              return new SecteurResource();
            }
          },

          evaluators: function(MdphResource, currentMdph) {
            return MdphResource.queryUsers({zipcode: currentMdph.zipcode}).$promise;
          }
        },
        authenticate: true
      });
  });
