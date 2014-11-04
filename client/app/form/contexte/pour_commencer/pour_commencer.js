'use strict';

angular.module('impactApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/form/contexte/pour_commencer', '/form/contexte/pour_commencer/representant');
    $stateProvider.state('form.contexte.pour_commencer', {
      url: '/pour_commencer',
      template: '<ui-view/>'
    }).state('form.contexte.pour_commencer.representant', {
      url: '/representant',
      templateUrl: 'components/question/radio.html',
      controller: 'RepresentantCtrl'
    }).state('form.contexte.pour_commencer.code_postal', {
      url: '/code_postal',
      templateUrl: 'components/question/code_postal.html',
      controller: 'CodePostalCtrl',
      resolve: {
        mdphs: function(Mdph) {
          return Mdph.queryAll();
        }
      }
    }).state('form.contexte.pour_commencer.dossier', {
      url: '/dossier',
      templateUrl: 'components/question/radio.html',
      controller: 'DossierCtrl'
    }).state('form.contexte.pour_commencer.date_naissance', {
      url: '/date_naissance',
      templateUrl: 'components/question/date_naissance.html',
      controller: 'DateNaissanceCtrl'
    }).state('form.contexte.pour_commencer.num_dossier', {
      url: '/num_dossier',
      templateUrl: 'components/question/radio.html',
      controller: 'NumDossierCtrl'
    }).state('form.contexte.pour_commencer.renouvellement', {
      url: '/renouvellement',
      templateUrl: 'components/question/radio.html',
      controller: 'RenouvellementCtrl'
    }).state('form.contexte.pour_commencer.liste_droits', {
      url: '/liste_droits',
      resolve: {
        prestations: function($http) {
          return $http.get('/api/prestations').then(function(prestations) {
            return prestations.data;
          });
        }
      },
      templateUrl: 'components/question/droits.html',
      controller: 'RenouvellementListeDroitsCtrl'
    })
    .state('form.contexte.pour_commencer.taux', {
      url: '/taux',
      templateUrl: 'components/question/radio.html',
      controller: 'TauxCtrl'
    }).state('form.contexte.pour_commencer.contestationTaux', {
      url: '/votre_avis',
      templateUrl: 'components/question/radio.html',
      controller: 'ContestationTauxCtrl'
    });
  });
