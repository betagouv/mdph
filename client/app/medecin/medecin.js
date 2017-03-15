'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('medecin', {
        url: '/medecin',
        parent: 'layout',
        templateUrl: 'app/medecin/medecin.html',
        controller: 'PartenaireCtrl',
        resolve: {
          type: function() {
            return 'certificatMedical';
          }
        }
      });
  });
