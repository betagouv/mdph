'use strict';

angular.module('impactApp')
  .factory('ProfileService', function ProfileService(estAdulte, estMineur, RequestService) {
    function _estMineur(profile) {
      if (profile.identites && profile.identites.beneficiaire) {
        return estMineur(profile.identites.beneficiaire.dateNaissance);
      } else {
        return false;
      }
    }

    function _estAdulte(profile) {
      if (profile.identites && profile.identites.beneficiaire) {
        return estAdulte(profile.identites.beneficiaire.dateNaissance);
      } else {
        return true;
      }
    }

    function getMissingSection(profile, request, user) {
      const missingSections = [];

      if (user.unconfirmed) {
        missingSections.push('unconfirmed');
      }

      if (!profile.identites || !profile.identites.beneficiaire || !profile.identites.beneficiaire.localite || !profile.identites.beneficiaire.code_postal || !profile.identites.beneficiaire.nomVoie || !profile.identites.beneficiaire.dateNaissance || !profile.identites.beneficiaire.nationalite || !profile.identites.beneficiaire.sexe || !profile.identites.beneficiaire.prenom || !profile.identites.beneficiaire.nom || !profile.identites.beneficiaire.email || !profile.identites.beneficiaire.numero_secu || !profile.identites.beneficiaire.assurance || (profile.identites.beneficiaire.assurance === 'autre' && !profile.identites.beneficiaire.assurance_precisez)) {
        missingSections.push('beneficiaire');
      }

      if (_estMineur(profile) && (!profile.identites || !profile.identites.autorite)) {
        missingSections.push('autorite');
      }

      if (!profile.vie_quotidienne || !profile.vie_quotidienne.__completion) {
        missingSections.push('vieQuotidienne');
      }

      if (!RequestService.getDocumentCompletion(request)) {
        missingSections.push('documents');
      }

      return missingSections.length > 0 ? missingSections : null;
    }

    function getCompletion(profile) {
      if (!profile.identites || !profile.identites.beneficiaire) {
        return false;
      }

      if (_estMineur(profile) && !profile.identites.autorite) {
        return false;
      }

      if (!profile.vie_quotidienne || !profile.vie_quotidienne.__completion) {
        return false;
      }

      return true;
    }

    function needUploadCV(profile) {
      return profile.vie_au_travail && profile.vie_au_travail.needUploadCV;
    }

    function getAskedDocumentTypes(profile) {
      const askedDocumentTypes = [];

      if (needUploadCV(profile)) {
        askedDocumentTypes.push(['cv']);
      }

      return askedDocumentTypes;
    }

    return {
      estHomme: function(profile) {
        if (profile.identites && profile.identites.beneficiaire) {
          return profile.identites.beneficiaire.sexe === 'homme';
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

      estAdulte: _estAdulte,
      estMineur: _estMineur,
      getCompletion,
      getMissingSection,
      needUploadCV,
      getAskedDocumentTypes
    };
  });
