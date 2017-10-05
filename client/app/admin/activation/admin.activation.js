'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('admin.activation', {
        url: '/activation',
        parent: 'admin',
        authenticate: true,
        templateUrl: 'app/admin/activation/admin.activation.html',
        controller: 'AdminActivationCtrl',
        controllerAs: 'adminActivationCtrl',
      });
  });
