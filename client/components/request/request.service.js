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
      getCompletion: getCompletion,
      groupByAge: function(requests) {
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

          if (deltaMonths === 1) {
            result.new.push(request);
          } else if (deltaMonths > 1 && deltaMonths < 3) {
            result.standard.push(request);
          } else {
            result.old.push(request);
          }

          return result;
        }, groupedByAge);

        return groupedByAge;
      }
    };
  });
