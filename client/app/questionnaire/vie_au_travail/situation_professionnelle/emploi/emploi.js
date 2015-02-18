'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    var index = 'departement.questionnaire.vie_au_travail.situation_professionnelle';
    $stateProvider.state(index + '.emploi', {
      url: '/emploi',
      template: '<ui-view/>',
      abstract: true
    })
    .state(index + '.emploi.nom_poste', {
      url: '/nom_poste',
      templateUrl: 'components/question/textinput.html',
      controller: 'NomPosteCtrl'
    })
    .state(index + '.emploi.temps', {
      url: '/temps',
      templateUrl: 'components/question/radio.html',
      controller: 'EmploiTempsCtrl'
    })
    .state(index + '.emploi.heures', {
      url: '/heures',
      templateUrl: 'components/question/textinput.html',
      controller: 'EmploiHeuresCtrl'
    })
    .state(index + '.emploi.adapte', {
      url: '/adapte',
      templateUrl: 'components/question/radio.html',
      controller: 'AdapteHandicapCtrl'
    })
    .state(index + '.emploi.difficultes', {
      url: '/difficultes',
      templateUrl: 'components/question/textarea.html',
      controller: 'EmploiDifficultesCtrl'
    })
    .state(index + '.emploi.amenagement', {
      url: '/amenagement',
      templateUrl: 'components/question/radio.html',
      controller: 'AmenagementCtrl'
    })
    .state(index + '.emploi.arret_de_travail', {
      url: '/arret_de_travail',
      templateUrl: 'components/question/radio.html',
      controller: 'ArretDeTravailCtrl'
    })
    .state(index + '.emploi.indemnite_journaliere', {
      url: '/indemnite_journaliere',
      templateUrl: 'components/question/radio.html',
      controller: 'IndemniteJournaliereCtrl'
    })
    .state(index + '.emploi.accident_de_travail', {
      url: '/accident_de_travail',
      templateUrl: 'components/question/radio.html',
      controller: 'AccidentDeTravailCtrl'
    })
    .state(index + '.emploi.conge_maternite', {
      url: '/conge_maternite',
      templateUrl: 'components/question/radio.html',
      controller: 'CongeMaterniteCtrl'
    })
    .state(index + '.emploi.professionnel_social', {
      url: '/professionnel_social',
      templateUrl: 'components/question/radio.html',
      controller: 'ProfessionnelSocialCtrl'
    })
    .state(index + '.emploi.medecin_travail', {
      url: '/medecin_travail',
      templateUrl: 'components/question/radio.html',
      controller: 'MedecinTravailCtrl'
    });
  });
