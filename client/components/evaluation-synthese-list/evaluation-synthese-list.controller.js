'use strict';

angular.module('impactApp').controller('EvaluationSyntheseListCtrl', function(SyntheseResource) {

  this.syntheses = SyntheseResource.query({mdphId: this.mdph._id});

  this.getSyntheseTitle = (synthese) => {
    if (typeof synthese.firstname === 'undefined' && typeof synthese.lastname === 'undefined') {

      return `Synthese N° ${synthese._id}`;
    }

    return `${typeof synthese.firstname === 'undefined' ? '' : synthese.firstname} ${ typeof synthese.lastname === 'undefined' ? '' : synthese.lastname}`;
  };
});
