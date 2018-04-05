'use strict';

angular.module('impactApp')
.factory('DemandeService', function DemandeService($http, estAdulte, estMineur, estEnfant) {
    function _estMineur(demande) {
      if (demande && demande.data && demande.data.identites && demande.data.identites.beneficiaire) {
        return estMineur(demande.data.identites.beneficiaire.dateNaissance);
      } else {
        return false;
      }
    }

    function _estAdulte(demande) {
      if (demande && demande.data && demande.data.identites && demande.data.identites.beneficiaire) {
        return estAdulte(demande.data.identites.beneficiaire.dateNaissance);
      } else {
        return true;
      }
    }

    function _estEnfant(demande) {
      if (demande && demande.data && demande.data.identites && demande.data.identites.beneficiaire) {
        return estEnfant(demande.data.identites.beneficiaire.dateNaissance);
      } else {
        return false;
      }
    }

    function representantObligatoire(demande) {
      return demande && demande.data && demande.data.identites && demande.data.identites.beneficiaire && demande.data.identites.beneficiaire.protection === 'true';
    }

    function autoriteObligatoire(demande) {
      return demande && demande.data && demande.data.identites && demande.data.identites.beneficiaire && demande.data.identites.beneficiaire.numero_secu_enfant;
    }

    function allMandatoryFilesPresent(demande) {
      // TODO Object.keys(request.data.documents.obligatoires).length === 3 doesn't seem strict enough
      return demande.data && demande.data.documents && demande.data.documents.obligatoires && Object.keys(demande.data.documents.obligatoires).length === 3;
    }

    function allAskedFilesPresent(demande) {
      let allAskedFilesComplete = true;
      _.forEach(demande.data.askedDocumentTypes, (askedType) => {
        let askedDocs = _.get(demande.data.documents, ['complementaires', askedType, 'documentList']);
        if (typeof askedDocs === 'undefined' || askedDocs.length === 0) {
          allAskedFilesComplete = false;
        }
      });

      return allAskedFilesComplete;
    }

    function findInvalid(categories) {
      var invalidDocuments = [];

      _.forEach(categories, category => {
        _.forEach(category.documentList, document => {
          if (document.isInvalid) {
            invalidDocuments.push(document);
          }
        });
      });

      return invalidDocuments;
    }

    function hasRefusedDocuments(demande) {
      if (findInvalid(demande.data.documents.obligatoires).length > 0) {
        return true;
      }

      if (findInvalid(demande.data.documents.complementaires).length > 0) {
        return true;
      }

      return false;
    }

    function getDocumentCompletion(demande) {
      if (!demande.data.documents) {
        return false;
      }

      return allMandatoryFilesPresent(demande) &&
        allAskedFilesPresent(demande) &&
        hasRefusedDocuments(demande) !== true;
    }

    function getMissingSection(demande, user) {
      const missingSections = [];

      if (user.unconfirmed) {
        missingSections.push('unconfirmed');
      }

      if (!demande || !demande.data || !demande.data.identites || !demande.data.identites.beneficiaire || !demande.data.identites.beneficiaire.localite || !demande.data.identites.beneficiaire.code_postal || !demande.data.identites.beneficiaire.nomVoie || !demande.data.identites.beneficiaire.dateNaissance || !demande.data.identites.beneficiaire.nationalite || !demande.data.identites.beneficiaire.sexe || !demande.data.identites.beneficiaire.prenom || !demande.data.identites.beneficiaire.nom || !demande.data.identites.beneficiaire.email || !demande.data.identites.beneficiaire.numero_secu || !demande.data.identites.beneficiaire.assurance || (demande.data.identites.beneficiaire.assurance === 'autre' && !demande.data.identites.beneficiaire.assurance_precisez)) {
        missingSections.push('beneficiaire');
      }

      if (autoriteObligatoire(demande) && !demande.data.identites.autorite) {
        missingSections.push('autorite');
      }

      if (representantObligatoire(demande) && !demande.data.identites.representant) {
        missingSections.push('representant');
      }

      if (!demande.data.vie_quotidienne || !demande.data.vie_quotidienne.__completion) {
        missingSections.push('vieQuotidienne');
      }

      if (!getDocumentCompletion(demande)) {
        missingSections.push('documents');
      }

      return missingSections.length > 0 ? missingSections : null;
    }

    function getCompletion(demande) {
      if (!demande.data || !demande.data.identites || !demande.data.identites.beneficiaire) {
        return false;
      }

      if (autoriteObligatoire(demande) && !demande.data.identites.autorite) {
        return false;
      }

      if (representantObligatoire(demande) && !demande.data.identites.representant) {
        return false;
      }

      if (!demande.data.vie_quotidienne || !demande.data.vie_quotidienne.__completion) {
        return false;
      }

      return true;
    }

    function needUploadCV(demande) {
      return demande.data.vie_au_travail && demande.data.vie_au_travail.needUploadCV;
    }

    function getAskedDocumentTypes(demande) {
      const askedDocumentTypes = [];

      if (needUploadCV(demande)) {
        askedDocumentTypes.push(['cv']);
      }

      return askedDocumentTypes;
    }

    function getPrestationCompletion(demande) {
      return Array.isArray(demande.data.prestations) && demande.data.prestations.length > 0;
    }

    function postAction(demande, action) {
      action.request = demande;
      return $http.post(`api/requests/${demande.shortId}/action`, action);
    }

    function getMandatoryTypes(documentTypes) {
      return _.filter(documentTypes, {mandatory: true});
    }

    function findExistingTypes(demande) {
      return _.pluck(demande.data.documents.complementaires, 'documentType');
    }

    function findAskedTypes(demande, documentTypes) {
      return _(documentTypes)
        .filter(function(documentType) {
          return !documentType.mandatory && demande.data.askedDocumentTypes && demande.data.askedDocumentTypes.indexOf(documentType.id) > -1;
        })
        .map(function(documentType) {
          documentType.asked = true;
          return documentType;
        })
        .value();
    }

    function concatTypes(accumulator, type) {
      if (_.find(accumulator, {id: type.id})) {
        return accumulator;
      }

      accumulator.push(type);
      return accumulator;
    }

    function computeSelectedDocumentTypes(demande, documentTypes) {
      const selectedDocumentTypes = [];

      const mandatoryTypes = getMandatoryTypes(documentTypes);
      const existingTypes = findExistingTypes(demande, documentTypes);
      const askedTypes = findAskedTypes(demande, documentTypes);

      _.reduce(mandatoryTypes, concatTypes, selectedDocumentTypes);
      _.reduce(existingTypes, concatTypes, selectedDocumentTypes);
      _.reduce(askedTypes, concatTypes, selectedDocumentTypes);

      return selectedDocumentTypes;
    }

    return {
      estHomme: function(demande) {
        if (demande.data.identites && demande.data.identites.beneficiaire) {
          return demande.data.identites.beneficiaire.sexe === 'homme';
        } else {
          return false;
        }
      },

      getPrenom: function(demande) {
        if (demande.data.identites && demande.data.identites.beneficiaire) {
          return demande.data.identites.beneficiaire.prenom;
        } else {
          return 'le bénéficiaire de la demande';
        }
      },

      estAdulte: _estAdulte,
      estMineur: _estMineur,
      estEnfant: _estEnfant,
      getCompletion,
      getMissingSection,
      needUploadCV,
      getAskedDocumentTypes,
      representantObligatoire,
      autoriteObligatoire,
      getDocumentCompletion,
      getPrestationCompletion,
      computeSelectedDocumentTypes,
      postAction
    };
  });
