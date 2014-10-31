'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('cm', {
        url: '/cm',
        templateUrl: 'app/cm/cm.html'
      })
      .state('cm_form', {
        url: '/cm/:id',
        templateUrl: 'app/cm/form/form.html',
        controller: 'CmFormController'
      })
      .state('cm_email', {
        url: '/cm/email/:email',
        templateUrl: 'app/cm/email/email.html',
        controller: 'CmEmailController'
      })
      .state('cm_secret', {
        url: '/cm/:id/:secret',
        templateUrl: 'app/cm/secret/secret.html',
        controller: 'CmSecretController'
      });
  });
