'use strict';

angular.module('impactApp')
  .factory('ProfileService', function ProfileService(estAdulte, estMineur) {
    var getCompletion = function(profile) {
      if (!profile.identites || !profile.identites.beneficiaire) {
        // TODO verifier que s'il est enfant il a bien remplis une autorite parentale
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

      getCompletion: getCompletion
    };
  });
