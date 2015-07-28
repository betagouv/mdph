'use strict';

angular.module('impactApp')
  .filter('requestStatus', function() {
    return function(input) {
      if (!input) {
        return 'Nouvelle demande';
      }

      switch (input) {
        case 'en_cours':
          return 'En cours';
        case 'emise':
          return 'Émise';
        case 'a_completer':
          return 'À compléter';
        case 'evaluation':
          return 'En cours d\'évaluation';
        case 'reponse':
          return 'Réponse obtenue';
        default:
          return 'TODO';
      }
    };
  });
