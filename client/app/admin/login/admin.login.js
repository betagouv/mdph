'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('admin.login', {
        parent: 'admin',
        url: '/login',
        templateUrl: 'app/admin/login/admin.login.html',
        controller: 'AdminLoginCtrl',
        controllerAs: 'adminLoginCtrl',
        data: {
          title: 'Connexion'
        }
      })
      .state('admin.logout', {
        parent: 'admin',
        url: '/logout',
        template: '',
        controller: function($state, Auth) {
          $state.go('admin.login');
          Auth.logout();
        }
      });
  });
