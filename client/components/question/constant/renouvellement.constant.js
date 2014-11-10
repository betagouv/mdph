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
        labelDefault: 'Votre état de santé à changé',
        value: 'sante'
      },
      {
        labelRep: 'Son handicap est stable mais à de nouvelles répercussions sur sa vie quotidienne',
        labelDefault: 'Votre handicap est stable mais à de nouvelles répercussions sur votre vie quotidienne',
        value: 'repercussions'
      },
      {
        labelRep: 'Son état est stable',
        labelDefault: 'Votre état est stable',
        value: 'stable'
      }
    ]
  },
  {
    model: 'finDroits',
    titleDefault: 'De quelles prestations bénéficiez-vous actuellement ?',
    titleRep: 'De quelles prestations bénéficie-t-<%= pronoun %> actuellement ?',
    type: 'checkbox'
  }
]);
