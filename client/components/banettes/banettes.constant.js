'use strict';

angular.module('impactApp').constant('BanettesConstant', [
  {
    id: 'workflow',
    label: 'Bannettes',
    statuses: [
      {
        id: 'emise',
        label: 'Émise'
      },
      {
        id: 'enregistree',
        label: 'Enregistrée'
      },
      {
        id: 'en_attente_usager',
        label: 'En attente'
      },
      {
        id: 'archive',
        label: 'Archivée'
      }
    ]
  },
  {
    id: 'hidden',
    label: 'Cachées',
    statuses: [
      {
        id: 'en_cours',
        label: 'En cours'
      }
    ]
  }
]);
