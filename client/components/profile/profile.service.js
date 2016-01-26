'use strict';

angular.module('impactApp')
  .factory('ProfileService', function RequestService() {
    var estAdulte = function(profile) {
      if (profile.identites && profile.identites.beneficiaire) {
        var dateNaissance = profile.identites.beneficiaire.dateNaissance;
        return moment().diff(dateNaissance, 'years') >= 20;
      } else {
        return true;
      }
    };

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
      estAdulte: estAdulte,
      getCompletion: getCompletion
    };
  });
