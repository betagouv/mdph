'use strict';

angular.module('impactApp').component('evaluationSyntheseAddEmpty', {
  templateUrl: 'components/evaluation-synthese-add-empty/evaluation-synthese-add-empty.html',
  controller: 'EvaluationSyntheseAddEmptyCtrl',
  controllerAs: 'evaluationSyntheseAddEmptyCtrl',
  bindings: {
    mdph: '<'
  }
});
