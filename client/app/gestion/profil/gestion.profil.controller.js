'use strict';

angular.module('impactApp')
  .controller('GestionProfilCtrl', function($state, currentMdph, profils) {
    this.currentMdph = currentMdph;

    this.init = () => {
      if (profils.length === 1) {
        return $state.go('gestion_demande', {profilId: profils[0]._id}, {reload: true});
      }
    };

  });
