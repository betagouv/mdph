'use strict';

angular.module('impactApp').controller('EvaluationSyntheseListCtrl', function(SyntheseResource, Auth) {

  this.syntheses = SyntheseResource.query({mdphId: Auth.getCurrentUser().mdph._id});

  this.getSyntheseTitle = (synthese) => {
    return `${synthese.firstname} ${synthese.lastname}`;
  };
});
