'use strict';

angular.module('impactApp').controller('EvaluationSyntheseListCtrl', function(SyntheseResource) {

  this.syntheses = SyntheseResource.query({mdphId: this.mdph._id});

  this.getSyntheseTitle = (synthese) => {
    return `${synthese.firstname} ${synthese.lastname}`;
  };
});
