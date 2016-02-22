'use strict';

angular.module('impactApp')
  .factory('ProfileService', function ProfileService(estAdulte, estMineur) {
    var estMineurProfile = function(profile) {
      if (profile.identites && profile.identites.beneficiaire) {
        return estMineur(profile.identites.beneficiaire.dateNaissance);
      } else {
        return false;
      }
    };

    var estAdulteProfile = function(profile) {
      if (profile.identites && profile.identites.beneficiaire) {
        return estAdulte(profile.identites.beneficiaire.dateNaissance);
      } else {
        return true;
      }
    };

    var getMissingSection = function(profile) {
      var missingSections = [];

      if (!profile.identites || !profile.identites.beneficiaire) {
        missingSections.push('beneficiaire');
      }

      if (estMineurProfile(profile) && (!profile.identites || !profile.identites.autorite)) {
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

      if (estMineurProfile() && !profile.identites.autorite) {
        return false;
      }

      if (!profile.vie_quotidienne || !profile.vie_quotidienne.__completion) {
        return false;
      }

      return true;
    };

    return {
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

      estAdulte: estAdulteProfile,
      estMineur: estMineurProfile,
      getCompletion: getCompletion,
      getMissingSection: getMissingSection
    };
  });
