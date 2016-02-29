'use strict';

angular.module('impactApp')
  .filter('prestationType', function() {
    return function(type) {
      switch (type) {
        case 'carte':
          return 'Demande de cartes';
        case 'compensation':
          return 'Demande de prestation de compensation';
        case 'enfant':
          return 'Demandes concernant votre enfant';
        case 'allocation':
          return 'Demande d\'AAH et de complément de ressources';
        case 'travail':
          return 'Demande relative au travail, à l\'emploi et à l\'orientation professionnelle';
        case 'accompagnement':
          return 'Demande d\'orientation vers un établissement ou service médico-social pour adultes';
        case 'aidant':
          return 'Pour votre aidant familial';
        default:
          return 'TODO';
      }
    };
  });
