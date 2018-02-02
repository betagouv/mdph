'use strict';

angular.module('impactApp').controller('EvaluationSyntheseAddEmptyCtrl', function(SyntheseResource, $state) {

  this.addNewSynthese = () => {

        // Désormais la création est fait lors de la saisie d'au moins un champ

        $state.go('evaluation.detail', {sectionId: 'profil'});

      };
});
