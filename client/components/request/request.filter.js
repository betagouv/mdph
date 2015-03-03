'use strict';

angular.module('impactApp')
  .filter('requestStatus', function () {
    return function (input) {
      if (!input) {
        return 'Nouvelle demande';
      }

      switch (input) {
        case 'en_cours':
          return 'En cours';
        case 'emise':
          return 'Émise';
        default:
          return 'TODO';
      }
    };
  });
