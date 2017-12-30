'use strict';

angular.module('impactApp').component('trajectoire', {
  templateUrl: 'components/trajectoire/trajectoire.html',
  bindings: {
    sublevel: '=',
    questions: '=',
    request: '=',
    root: '=',
    readOnly: '=',
    newIssue: '='
  },
  controller: 'TrajectoireController',
  controllerAs: 'trjctrCtrl'
});
