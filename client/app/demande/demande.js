'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('demande', {
        url: '/demande',
        templateUrl: 'app/demande/demande.html',
        controller: 'DemandeCtrl',
        authenticate: true,
        resolve: {
          currentForm:  function(FormResource) {
            return FormResource.getMine().$promise;
          }
        }
      });
  });
