'use strict';

angular.module('impactApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/form/votre_travail/situation_professionnelle/emploi', '/form/votre_travail/situation_professionnelle/emploi/nom_poste');
    $stateProvider.state('form.votre_travail.situation_professionnelle.emploi', {
      url: '/emploi',
      template: '<ui-view/>',
      controller: 'EmploiCtrl'
    })
    .state('form.votre_travail.situation_professionnelle.emploi.nom_poste', {
      url: '/nom_poste',
      templateUrl: 'components/question/textinput.html',
      controller: 'NomPosteCtrl'
    })
    .state('form.votre_travail.situation_professionnelle.emploi.temps', {
      url: '/temps',
      templateUrl: 'components/question/radio.html',
      controller: 'EmploiTempsCtrl'
    })
    .state('form.votre_travail.situation_professionnelle.emploi.heures', {
      url: '/heures',
      templateUrl: 'components/question/textinput.html',
      controller: 'EmploiHeuresCtrl'
    })
    .state('form.votre_travail.situation_professionnelle.emploi.adapte', {
      url: '/adapte',
      templateUrl: 'components/question/radio.html',
      controller: 'AdapteHandicapCtrl'
    })
    .state('form.votre_travail.situation_professionnelle.emploi.difficultes', {
      url: '/difficultes',
      templateUrl: 'components/question/textarea.html',
      controller: 'EmploiDifficultesCtrl'
    })
    .state('form.votre_travail.situation_professionnelle.emploi.amenagement', {
      url: '/amenagement',
      templateUrl: 'components/question/radio.html',
      controller: 'AmenagementCtrl'
    })
    .state('form.votre_travail.situation_professionnelle.emploi.arret_de_travail', {
      url: '/arret_de_travail',
      templateUrl: 'components/question/radio.html',
      controller: 'ArretDeTravailCtrl'
    })
    .state('form.votre_travail.situation_professionnelle.emploi.indemnite_journaliere', {
      url: '/indemnite_journaliere',
      templateUrl: 'components/question/radio.html',
      controller: 'IndemniteJournaliereCtrl'
    })
    .state('form.votre_travail.situation_professionnelle.emploi.accident_de_travail', {
      url: '/accident_de_travail',
      templateUrl: 'components/question/radio.html',
      controller: 'AccidentDeTravailCtrl'
    })
    .state('form.votre_travail.situation_professionnelle.emploi.professionnel_social', {
      url: '/professionnel_social',
      templateUrl: 'components/question/radio.html',
      controller: 'ProfessionnelSocialCtrl'
    })
    .state('form.votre_travail.situation_professionnelle.emploi.medecin_travail', {
      url: '/medecin_travail',
      templateUrl: 'components/question/radio.html',
      controller: 'MedecinTravailCtrl'
    });
  });
