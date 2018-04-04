const REQUEST_SERVICE_NAME = 'RequestService';

class RequestService {
  constructor($http) {
    this.$http = $http;
  }

  findInvalid(categories) {
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

  findRefusedDocuments(request) {
    if (!request.documents) {
      return { obligatoires: [], complementaires: [] };
    }

    return {
      obligatoires: this.findInvalid(request.documents.obligatoires),
      complementaires: this.findInvalid(request.documents.complementaires)
    };
  }

  getAskedDocumentTypes(request) {
    return request.askedDocumentTypes || [];
  }

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
  }

  generateReceptionMail(request) {
    return this.$http.get(`api/requests/${request.shortId}/generate-reception-mail`);
  }

  static get $inject() {
    return [
      '$http'
    ];
  }
}

angular.module('impactApp')
  .service(REQUEST_SERVICE_NAME, RequestService);
