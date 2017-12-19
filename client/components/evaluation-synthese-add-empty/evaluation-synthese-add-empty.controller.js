'use strict';

angular.module('impactApp').controller('EvaluationSyntheseAddEmptyCtrl', function(SyntheseResource, $state) {

  this.addNewSynthese = () => {

  // Désormais la création est fait lors de la saisie d'au moins un champ
  //var newSynthese = new SyntheseResource();
  //newSynthese.mdph = this.mdph._id;

  //  SyntheseResource.save(newSynthese, function(synthese) {
      $state.go('evaluation.detail', {sectionId: 'profil'});
 //   });
  };
});
