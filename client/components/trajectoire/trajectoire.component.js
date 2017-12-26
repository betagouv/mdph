'use strict';

angular.module('impactApp').component('trajectoire', {
  templateUrl: 'components/trajectoire/trajectoire.html',
  bindings: {
    sublevel: '=',
    questions: '=',
    request: '=',
    currentQuestionId: '=',
    currentSubQuestionId: '=',
    root: '=',
    readOnly: '=',
    newIssue: '='
  },
  controller: 'TrajectoireController',
  controllerAs: 'trjctrCtrl'
});
