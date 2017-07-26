'use strict';

angular.module('impactApp').controller('EvaluationSyntheseAddEmptyCtrl', function(SyntheseResource, $state) {

  this.addNewSynthese = () => {
    console.log('create new synthese');
    var newSynthese = new SyntheseResource();
    newSynthese.mdph = this.mdph._id;
    SyntheseResource.save(newSynthese, function() {
      $state.go('evaluation.detail', {syntheseId: newSynthese._id, sectionId: 'environnement'});
    });
  };
});
