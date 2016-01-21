'use strict';

angular.module('impactApp')
  .factory('RequestService', function RequestService() {
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

    var getCompletion = function(request) {
      if (!request.documents) {
        return false;
      }

      return allMandatoryFilesPresent(request) && !noInvalidatedFiles(request);
    };

    return {
      getCompletion: getCompletion
    };
  });
