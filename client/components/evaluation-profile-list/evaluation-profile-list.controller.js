'use strict';

angular.module('impactApp').controller('EvaluationProfileListCtrl', function(MdphResource) {

  this.profiles = MdphResource.queryBeneficiaires({zipcode: this.mdph.zipcode});

  this.getProfileTitle = (profile) => {
    if (profile && profile.recipient) {
      return `${profile.recipient.firstname} ${profile.recipient.lastname}`;

    }

    return `Profile N° ${profile._id}`;
  };
});
