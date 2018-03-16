'use strict';

angular.module('impactApp')
  .controller('GestionDemandeCtrl', function(currentMdph, currentUser, currentProfil) {
    this.currentMdph = currentMdph;
    this.currentUser = currentUser;
    this.currentProfil = currentProfil;

  });
