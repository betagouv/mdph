'use strict';

/* jshint multistr: true */

angular.module('impactApp').constant('renouvellement', [
  {
    titleRep: 'Comment la situation a-t-elle évolué depuis sa dernière demande ?',
    titleDefault: 'Comment votre situation a-t-elle évolué depuis votre dernière demande ?',
    model: 'evolution',
    type: 'radio',
    answers:
    [
      {
        labelRep: 'Son état de santé à changé',
        label: 'Votre état de santé à changé',
        value: 'sante'
      },
      {
        labelRep: 'Son handicap est stable mais à de nouvelles répercussions sur sa vie quotidienne',
        label: 'Votre handicap est stable mais à de nouvelles répercussions sur votre vie quotidienne',
        value: 'repercussions'
      },
      {
        labelRep: 'Sa situation est stable',
        label: 'Votre situation est stable',
        value: 'stable'
      }
    ]
  },
  {
    model: 'finDroits',
    titleDefault: 'De quelles prestations bénéficiez-vous actuellement ?',
    titleRep: 'De quelles prestations bénéficie-t-<%= pronoun %> actuellement ?',
    type: 'checkbox'
  },
  {
    model: 'preciserProjet',
    titleDefault: 'Souhaitez-vous préciser votre projet de vie ?',
    type: 'radio',
    answers: [
      {
        label: 'Oui',
        value: true
      },
      {
        label: 'Non',
        value: false
      }
    ]
  }
]);
