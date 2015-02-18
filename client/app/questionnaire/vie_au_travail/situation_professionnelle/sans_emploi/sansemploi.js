'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    var index = 'departement.questionnaire.vie_au_travail.situation_professionnelle';
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
    })
    .state(index + '.sans_emploi.stage', {
      url: '/stage',
      templateUrl: 'components/question/textinput.html',
      controller: 'StageCtrl'
    });
  });
