'use strict';

angular.module('impactApp').controller('EvaluationSyntheseAddPrefilledCtrl', function($state, $modal) {

  this.openRequestSelectorModal = (currentMdph) => {
    $modal.open({
      templateUrl: 'components/evaluation-synthese-add-prefilled/evaluation-synthese-add-prefilled-modal.html',
      controllerAs: 'evaluationSyntheseAddPrefilledModalCtrl',
      size: 'lg',
      controller($modalInstance, MdphResource, SyntheseResource) {

        this.profiles = MdphResource.queryBeneficiaires({zipcode: currentMdph.zipcode});

        this.getProfileTitle = (profile) => {
          return `${profile.recipient.firstname} ${profile.recipient.lastname}`;
        };

        this.addNewSynthese = (profile) => {

          $modalInstance.dismiss();

          var newSynthese = new SyntheseResource();
          newSynthese.mdph = currentMdph._id;
          newSynthese.firstname = profile.recipient.firstname;
          newSynthese.lastname = profile.recipient.lastname;
          newSynthese.birthdate = profile.identites.beneficiaire.dateNaissance;

          SyntheseResource.save(newSynthese, function(synthese) {
            $state.go('evaluation.detail', {syntheseId: synthese._id, sectionId: 'profil'});
          });
        };

        this.cancel = function() {
          $modalInstance.dismiss();
        };
      },

      resolve: {
        currentMdph: function() {
          return currentMdph;
        }
      }
    });
  };
});
