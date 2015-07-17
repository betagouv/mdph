'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('departement.demande.obligatoires', {
        url: '/obligatoires',
        templateUrl: 'app/demande/steps/section-list.html',
        controller: 'StepsCtrl',
        resolve: {
          stepSections: function(sections) {
            return _.filter(sections, {group: 'obligatoire'});
          }
        }
      });
  });
