'use strict';

angular.module('impactApp')
  .filter('role', function () {
    return function (input) {
      switch (input) {
        case 'admin':
          return 'Administrateur';
        case 'adminMdph':
          return 'Gestionnaire MDPH';
        case 'user':
          return 'Utilisateur';
        default:
          return '';
      }
    };
  });
