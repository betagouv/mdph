'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        resolve: {
          mdph: function() {
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
          mdph: function(MdphResource, $stateParams) {
            return MdphResource.get({zipcode: $stateParams.codeDepartement}).$promise;
          },

          user: function(Auth) {
            return Auth.getCurrentUser().$promise;
          }
        }
      });
  });
