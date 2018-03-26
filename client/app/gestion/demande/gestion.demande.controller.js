'use strict';

angular.module('impactApp')
  .controller('GestionDemandeCtrl', function($state, $http, currentMdph, currentUser, profil, demandes) {
    this.currentMdph = currentMdph;
    this.currentUser = currentUser;
    this.profil = profil;

    this.currentDemande = _.filter(demandes, function(demande) {
      return demande.hasOwnProperty('status') && (demande.status !== 'enregistree' && demande.status !== 'archive');
    })[0];

    this.archivedDemandes = [];

    // _.filter(demandes, function(demande) {
    //   return demande.hasOwnProperty('status') && (demande.status === 'enregistree' || demande.status === 'archive');
    // });

    this.createDemande = function() {
      if (!this.currentDemande) {

        $http.get(`/api/users/${currentUser._id}/profiles/${profil._id}/requests/current`).then(function() {
          $state.go('profil', {profileId: profil._id});
        });
      }
    };

    this.deleteCurrentDemande = function() {

    };

    this.goCurrentDemande = function() {
      $state.go('profil', {profileId: profil._id});
    };

    this.showStatus = function(demande) {
      switch (demande.status) {
        case 'en_cours':
          return 'En cours de création';
        case 'emise':
          return 'Emise';
        case 'enregistree':
          return 'Enregistrée';
        case 'en_attente_usager':
          return 'En attente';
        case 'archive':
          return 'Archivée';
        default:
          return 'Indéfinie';
      }
    };
  });
