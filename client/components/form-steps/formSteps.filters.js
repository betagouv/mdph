'use strict';

angular.module('impactApp')
  .filter('stepFilter', function (formSteps) {
    return function (input) {
      var step = _.find(formSteps, {'id': input.name});
      return step.label;
    };
  })
  .filter('stepSrefFilter', function (formSteps) {
    return function (input) {
      var step = _.find(formSteps, {'id': input.name});
      return '.' + step.sref;
    };
  })
  .filter('stateFilter', function () {
    return function (input) {
      switch (input) {
        case 'en_cours':
          return 'En cours';
        case 'complet':
          return 'Complet';
        case 'a_valider':
          return 'A valider';
        case 'valide':
          return 'Valide';
        case 'erreur':
          return 'En erreur';
        default:
          return '';
      }
    };
  });
