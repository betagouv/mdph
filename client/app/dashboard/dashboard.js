'use strict';

angular.module('impactApp')
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/dashboard', '/dashboard/demandes');
    $stateProvider
      .state('dashboard', {
        url: '/dashboard/:zipcode',
        templateUrl: 'app/dashboard/dashboard.html',
        authenticate: true,
        controller: function($scope, SectionBackConstants) {
          $scope.sections = SectionBackConstants;
        },

        resolve: {
          currentUser: function(Auth) {
            return Auth.getCurrentUser().$promise;
          },

          currentMdph: function($stateParams, $state, MdphResource) {
            return MdphResource.get({zipcode: $stateParams.zipcode}).$promise;
          }
        }
      });
  });
