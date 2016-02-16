'use strict';

angular.module('impactApp')
  .factory('ProfileService', function ProfileService(estAdulte, estMineur) {
    var getMissingSection = function(profile) {
      var missingSections = [];

      if (!profile.identites || !profile.identites.beneficiaire) {
        missingSections.push('beneficiaire');
      }

      if (estMineur() && (!profile.identites || !profile.identites.autorite)) {
        missingSections.push('autorite');
      }

      if (!profile.vie_quotidienne || !profile.vie_quotidienne.__completion) {
        missingSections.push('vieQuotidienne');
      }

      return missingSections;
    };

    var getCompletion = function(profile) {
      if (!profile.identites || !profile.identites.beneficiaire) {
        return false;
      }

      if (estMineur() && !profile.identites.autorite) {
        return false;
      }

      if (!profile.vie_quotidienne || !profile.vie_quotidienne.__completion) {
        return false;
      }

      return true;
    };

    return {
      estAdulte: function(profile) {
        if (profile.identites && profile.identites.beneficiaire) {
          return estAdulte(profile.identites.beneficiaire.dateNaissance);
        } else {
          return true;
        }
      },

      estMineur: function(profile) {
        if (profile.identites && profile.identites.beneficiaire) {
          return estMineur(profile.identites.beneficiaire.dateNaissance);
        } else {
          return false;
        }
      },

      estMasculin: function(profile) {
        if (profile.identites && profile.identites.beneficiaire) {
          return profile.identites.beneficiaire.sexe === 'masculin';
        } else {
          return false;
        }
      },

      getPrenom: function(profile) {
        if (profile.identites && profile.identites.beneficiaire) {
          return profile.identites.beneficiaire.prenom;
        } else {
          return 'le bénéficiaire de la demande';
        }
      },

      getCompletion: getCompletion,
      getMissingSection: getMissingSection
    };
  });
