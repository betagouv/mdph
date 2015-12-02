'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        resolve: {
          mdph: function($rootScope) {
            $rootScope.mdph = null;
            return null;
          },

          user: function(Auth) {
            return Auth.getCurrentUser().$promise;
          }
        }
      })
      .state('departement', {
        url: '/mdph/:codeDepartement',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        resolve: {
          mdph: function(MdphResource, $stateParams, $rootScope) {
            return MdphResource.get({zipcode: $stateParams.codeDepartement}).$promise.then(function(mdph) {
              $rootScope.mdph = mdph;
              return mdph;
            });
          },

          user: function(Auth) {
            return Auth.getCurrentUser().$promise;
          }
        }
      });
  });
