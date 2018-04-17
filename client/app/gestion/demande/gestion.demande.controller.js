'use strict';

angular.module('impactApp')
  .controller('GestionDemandeCtrl', function($state, $http, currentMdph, currentUser, profil, demandes) {
    this.currentMdph = currentMdph;
    this.currentUser = currentUser;
    this.profil = profil;

    this.currentDemande = _.filter(demandes, function(demande) {
      return demande.hasOwnProperty('status') && (demande.status !== 'validee' && demande.status !== 'irrecevable');
    })[0];

    this.archivedDemandes = _.filter(demandes, function(demande) {
      return demande.hasOwnProperty('status') && (demande.status === 'validee' || demande.status === 'irrecevable');
    });

    this.createDemande = function() {
      if (!this.currentDemande || this.currentDemande.status === 'emise') {

        $http.post(`/api/users/${currentUser._id}/profiles/${profil._id}/requests/new`).then(function(result) {
          $state.go('demande', {shortId: result.data.shortId});
        });
      }
    };

    this.deleteCurrentDemande = function() {

    };

    this.goCurrentDemande = function() {
      $state.go('demande', {shortId: this.currentDemande.shortId});
    };

    this.showStatus = function(demande) {
      switch (demande.status) {
        case 'en_cours':
          return 'En cours de création';
        case 'emise':
          return 'Emise';
        case 'validee':
          return 'validée';
        case 'en_attente_usager':
          return 'En attente';
        case 'irrecevable':
          return 'Irrecevable';
        default:
          return 'Indéfinie';
      }
    };
  });
