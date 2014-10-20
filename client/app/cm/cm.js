'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('cm', {
        url: '/cm',
        templateUrl: 'app/cm/cm.html'
      })
      .state('cm_identification', {
        url: '/cm/:id/identification',
        templateUrl: 'app/cm/identification/identification.html',
        controller: 'CmIdentificationCtrl'
      })
      .state('cm_form', {
        url: '/cm/:id',
        templateUrl: 'app/cm/form/form.html',
        controller: 'CmFormController'
      });
  });
