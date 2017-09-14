'use strict';

angular.module('impactApp').component('evaluationSyntheseAddPrefilled', {
  templateUrl: 'components/evaluation-synthese-add-prefilled/evaluation-synthese-add-prefilled.html',
  controller: 'EvaluationSyntheseAddPrefilledCtrl',
  controllerAs: 'evaluationSyntheseAddPrefilledCtrl',
  bindings: {
    mdph: '<'
  }
});
