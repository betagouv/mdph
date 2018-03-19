'use strict';

angular.module('impactApp')
  .controller('GestionProfilCtrl', function($state, currentMdph, currentUser, profils, ProfileResource) {
    this.currentMdph = currentMdph;
    this.currentUser = currentUser;
    this.profils = profils;
    this.deletedProfils = profils;

    this.createProfil = function() {
      new ProfileResource().$save({userId: this.currentUser._id}, function(result) {
        $state.go('profil', {profileId: result._id});
      });
    };

    this.deleteProfil = function() {

    };

    this.goProfil = function(profil) {
      $state.go('gestion_demande', {profilId: profil._id});
    };
  });
