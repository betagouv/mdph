'use strict';

angular.module('impactApp').controller('EvaluationProfileListCtrl', function(MdphResource) {

  this.profiles = MdphResource.queryBeneficiaires({zipcode: this.mdph.zipcode});

  this.getProfileTitle = (profile) => {
    if (profile && profile.identites && profile.identites.beneficiaire && profile.identites.beneficiaire.prenom && profile.identites.beneficiaire.nom) {
      return `${profile.identites.beneficiaire.prenom} ${profile.identites.beneficiaire.nom}`;

    }

    return `Profile N° ${profile._id}`;
  };
});
