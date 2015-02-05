'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('espace_perso.liste_demandes.demande.questionnaire', {
        url: '/questionnaire',
        templateUrl: 'app/demande/formulaire/formulaire.html',
        controller: 'FormulaireCtrl',
        authenticate: true
      });
  });
