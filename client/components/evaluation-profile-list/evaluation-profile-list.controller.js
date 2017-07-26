'use strict';

angular.module('impactApp').controller('EvaluationProfileListCtrl', function(MdphResource, Auth) {

  this.profiles = MdphResource.queryBeneficiaires({zipcode: Auth.getCurrentUser().mdph.zipcode});

  this.getProfileTitle = (profile) => {
    return `${profile.identites.beneficiaire.prenom} ${profile.identites.beneficiaire.nom}`;
  };
});
