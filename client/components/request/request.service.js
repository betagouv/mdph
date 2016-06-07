'use strict';

angular.module('impactApp')
  .factory('RequestService', function RequestService($http) {
    function allMandatoryFilesPresent(request) {
      return request.documents && request.documents.obligatoires && Object.keys(request.documents.obligatoires).length === 3;
    }

    function hasInvalidFileInCategories(categories) {
      let found = false;
      _.forEach(categories, function(category) {
        category.documentList.forEach(function(document) {
          if (document.isInvalid === true) {
            found = true;
          }
        });
      });

      return found;
    }

    function hasInvalidFile(request) {
      return hasInvalidFileInCategories(request.documents.obligatoires) || hasInvalidFileInCategories(request.documents.complementaires);
    }

    function allAskedFilesPresent(request) {
      var allAskedFilesComplete = true;

      _.forEach(request.askedDocumentTypes, function(askedType) {
        let askedDocs = _.get(request.documents, ['complementaires', askedType, 'documentList']);
        if (typeof askedDocs === 'undefined' || askedDocs.length === 0) {
          allAskedFilesComplete = false;
        }
      });

      return allAskedFilesComplete;
    }

    function getCompletion(request) {
      if (!request.documents) {
        return false;
      }

      return allMandatoryFilesPresent(request) && !hasInvalidFile(request) && allAskedFilesPresent(request);
    }

    function findInvalid(categories) {
      var invalidDocuments = [];

      _.forEach(categories, function(category) {
        _.forEach(category.documentList, function(document) {
          if (document.isInvalid) {
            invalidDocuments.push(document);
          }
        });
      });

      return invalidDocuments;
    }

    function findRefusedDocuments(request) {
      if (!request.documents) {
        return {
          obligatoires: [],
          complementaires: []
        };
      }

      var obligatoires = findInvalid(request.documents.obligatoires);
      var complementaires = findInvalid(request.documents.complementaires);

      return {
        obligatoires: obligatoires,
        complementaires: complementaires
      };
    }

    function getAskedDocumentTypes(request) {
      if (!request.askedDocumentTypes) {
        return [];
      }

      return request.askedDocumentTypes;
    }

    function getMandatoryTypes(documentTypes) {
      return _.filter(documentTypes, {mandatory: true});
    }

    function findExistingTypes(request) {
      return _.pluck(request.documents.complementaires, 'documentType');
    }

    function findAskedTypes(request, documentTypes) {
      return _(documentTypes)
        .filter(function(documentType) {
          return !documentType.mandatory && request.askedDocumentTypes.indexOf(documentType.id) > -1;
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

    function computeSelectedDocumentTypes(request, documentTypes) {
      var selectedDocumentTypes = [];

      var mandatoryTypes = getMandatoryTypes(documentTypes);
      var existingTypes = findExistingTypes(request, documentTypes);
      var askedTypes = findAskedTypes(request, documentTypes);

      _.reduce(mandatoryTypes, concatTypes, selectedDocumentTypes);
      _.reduce(existingTypes, concatTypes, selectedDocumentTypes);
      _.reduce(askedTypes, concatTypes, selectedDocumentTypes);

      return selectedDocumentTypes;
    }

    return {
      findRefusedDocuments,
      getAskedDocumentTypes,
      getCompletion,
      computeSelectedDocumentTypes,

      groupByAge(requests) {
        if (typeof requests === 'undefined' || requests.length === 0) {
          return null;
        }

        var currentMoment = moment();
        var groupedByAge = {
          new: [],
          standard: [],
          old: []
        };

        _.reduce(requests, function(result, request) {
          var submissionMoment = moment(request.submittedAt);
          var deltaMonths = currentMoment.diff(submissionMoment, 'months');

          if (deltaMonths <= 1) {
            result.new.push(request);
          } else if (deltaMonths > 1 && deltaMonths < 3) {
            result.standard.push(request);
          } else {
            result.old.push(request);
          }

          return result;
        }, groupedByAge);

        return groupedByAge;
      },

      postAction(request, action) {
        return $http.post(`api/requests/${request.shortId}/action`, action);
      },

      generateReceptionMail(request) {
        return $http.get(`api/requests/${request.shortId}/generate-reception-mail`);
      },

      generateMedicMail(request, emailMedic) {
        return $http.post(`api/requests/${request.shortId}/generate-medic-mail`, {emailMedic});
      }
    };
  });
