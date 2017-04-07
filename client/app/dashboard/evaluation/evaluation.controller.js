'use strict';

angular.module('impactApp')
  .controller('EvaluationCtrl', function(profiles) {
    this.profiles = profiles;

    this.getProfileTitle = (profile) => {
      return `${profile.identites.beneficiaire.prenom} ${profile.identites.beneficiaire.nom}`;
    };
  });
