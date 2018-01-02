'use strict';

angular.module('impactApp').component('trajectoire', {
  templateUrl: 'components/trajectoire/trajectoire.html',
  bindings: {
    sublevel: '=',
    questions: '=',
    request: '=',
    currentQuestionId: '=',
    deficienceQuestionId: '=',
    root: '=',
    readOnly: '=',
    newIssue: '='
  },
  controller: 'TrajectoireController',
  controllerAs: 'trjctrCtrl'
});
