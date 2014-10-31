'use strict';

angular.module('impactApp')
  .controller('CmSanitaireCtrl', function ($scope) {
    $scope.section = 'sanitaire';
    $scope.id = 'traitement_sanitaire_';
    $scope.inputLabel = 'Fréquence';

    $scope.options = [
      {
        id: 'ergotherapeute',
        label: 'Ergothérapeute',
        inputId: 'ergotherapeuteFreq'
      },
      {
        id: 'infirmiere',
        label: 'Infirmière',
        inputId: 'infirmiereFreq'
      },
      {
        id: 'kinesitherapeute',
        label: 'Kinésithérapeute',
        inputId: 'kinesitherapeuteFreq'
      },
      {
        id: 'orthophoniste',
        label: 'Orthophoniste',
        inputId: 'orthophonisteFreq'
      },
      {
        id: 'orthoptiste',
        label: 'Orthoptiste',
        inputId: 'orthoptisteFreq'
      },
      {
        id: 'psychologue',
        label: 'Psychologue',
        inputId: 'psychologueFreq'
      },
      {
        id: 'psychomotricien',
        label: 'Psychomotricien',
        inputId: 'psychomotricienFreq'
      },
      {
        id: 'autre',
        label: 'Autre',
        inputId: 'autreFreq'
      }
    ];
  });
