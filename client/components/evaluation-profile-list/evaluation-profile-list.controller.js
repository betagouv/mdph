'use strict';

angular.module('impactApp').controller('EvaluationProfileListCtrl', function(MdphResource) {

  this.profiles = MdphResource.queryBeneficiaires({zipcode: this.mdph.zipcode});

  this.getProfileTitle = (profile) => {
    return `${profile.identites.beneficiaire.prenom} ${profile.identites.beneficiaire.nom}`;
  };
});
