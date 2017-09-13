'use strict';

angular.module('impactApp').component('evaluationSyntheseList', {
  templateUrl: 'components/evaluation-synthese-list/evaluation-synthese-list.html',
  controller: 'EvaluationSyntheseListCtrl',
  controllerAs: 'evaluationSyntheseListCtrl',
  bindings: {
    mdph: '<'
  }
});
