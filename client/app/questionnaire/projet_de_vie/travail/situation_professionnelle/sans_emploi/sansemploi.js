'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    var index = 'departement.questionnaire.projet_de_vie.travail.situation_professionnelle';
    $stateProvider.state(index + '.sans_emploi', {
      url: '/sans_emploi',
      template: '<ui-view/>'
    })
    .state(index + '.sans_emploi.passe', {
      url: '/passe',
      templateUrl: 'components/question/radio.html',
      controller: 'EmploiPasseCtrl'
    })
    .state(index + '.sans_emploi.pole_emploi', {
      url: '/pole_emploi',
      templateUrl: 'components/question/checkbox.html',
      controller: 'PoleEmploiCtrl'
    });
  });
