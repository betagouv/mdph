'use strict';

angular.module('impactApp')
  .factory('RequestService', function RequestService($http) {
    function allMandatoryFilesPresent(request) {
      return request.documents && request.documents.obligatoires && Object.keys(request.documents.obligatoires).length === 3;
    }

    function noInvalidatedFiles(request) {
      var found = false;

      _.forEach(request.documents.obligatoires, function(category) {
        category.documentList.forEach(function(document) {
          if (document.validation === 'false') {
            found = true;
          }
        });
      });

      return found;
    }

    function getCompletion(request) {
      if (!request.documents) {
        return false;
      }

      return allMandatoryFilesPresent(request) && !noInvalidatedFiles(request);
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

    return {
      findRefusedDocuments,
      getAskedDocumentTypes,
      getCompletion,

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
      }
    };
  });
