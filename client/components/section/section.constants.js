'use strict';

/* jshint multistr: true */

angular.module('impactApp').constant('defaultSections', [
  {
    id: 0,
    sref: 'form.contexte',
    label: 'Pour commencer',
    isOptionnal: false,
    isEnabled: true
  },
  {
    id: 1,
    sref: 'form.vie_quotidienne',
    span: 'A',
    label: 'Vie quotidienne',
    isOptionnal: false
  },
  {
    id: 2,
    sref: 'form.votre_scolarite',
    span: 'B',
    label: 'Vie scolaire ou étudiante',
    isOptionnal: true
  },
  {
    id: 3,
    sref: 'form.votre_travail',
    span: 'C',
    label: 'Vie au travail',
    isOptionnal: true
  },
  {
    id: 4,
    sref: 'form.votre_aidant',
    span: 'D',
    label: 'Aidant familial',
    isOptionnal: true
  },
  {
    id: 5,
    sref: 'form.envoi',
    glyphicon: 'glyphicon-paperclip',
    label: 'Résultats',
    isOptionnal: false
  }
]);
