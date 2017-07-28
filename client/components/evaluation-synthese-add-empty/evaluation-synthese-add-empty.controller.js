'use strict';

angular.module('impactApp').controller('EvaluationSyntheseAddEmptyCtrl', function(SyntheseResource, $state) {

  this.addNewSynthese = () => {

    var newSynthese = new SyntheseResource();
    newSynthese.mdph = this.mdph._id;

    SyntheseResource.save(newSynthese, function(synthese) {
      $state.go('evaluation.detail', {syntheseId: synthese._id, sectionId: 'profil'});
    });
  };
});
