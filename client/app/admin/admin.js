'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        resolve: {
          currentUser: function(Auth) {
            return Auth.getCurrentUser().$promise;
          }
        },
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl',
        controllerAs: 'adminCtrl',
        abstract: true,
        data: {
          title: 'Admin'
        }
      });
  })
  .config(function($stateProvider) {
    $stateProvider
      .state('admin.main', {
        url: '',
        parent: 'admin',
        authenticate: true,
        template: '<div><ui-view /></div>',
        redirectTo: 'admin.mdph'
      });
  });
