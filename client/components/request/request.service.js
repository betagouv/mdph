const REQUEST_SERVICE_NAME = 'RequestService';

class RequestService {
  constructor($http) {
    this.$http = $http;
  }

  allMandatoryFilesPresent(request) {
    // TODO Object.keys(request.documents.obligatoires).length === 3 doesn't seem strict enough
    return request.documents && request.documents.obligatoires && Object.keys(request.documents.obligatoires).length === 3;
  }

  allAskedFilesPresent(request) {
    let allAskedFilesComplete = true;

    _.forEach(request.askedDocumentTypes, (askedType) => {
      let askedDocs = _.get(request.documents, ['complementaires', askedType, 'documentList']);
      if (typeof askedDocs === 'undefined' || askedDocs.length === 0) {
        allAskedFilesComplete = false;
      }
    });

    return allAskedFilesComplete;
  }

  getPrestationCompletion(request) {
    return Array.isArray(request.prestations) && request.prestations.length > 0;
  }

  getDocumentCompletion(request) {
    if (!request.documents) {
      return false;
    }

    return this.allMandatoryFilesPresent(request) &&
      this.allAskedFilesPresent(request) &&
      this.hasRefusedDocuments(request) !== true;
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

  hasRefusedDocuments(request) {
    if (this.findInvalid(request.documents.obligatoires).length > 0) {
      return true;
    }

    if (this.findInvalid(request.documents.complementaires).length > 0) {
      return true;
    }

    return false;
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

  getMandatoryTypes(documentTypes) {
    return _.filter(documentTypes, {mandatory: true});
  }

  findExistingTypes(request) {
    return _.pluck(request.documents.complementaires, 'documentType');
  }

  findAskedTypes(request, documentTypes) {
    return _(documentTypes)
      .filter(function(documentType) {
        return !documentType.mandatory && request.askedDocumentTypes && request.askedDocumentTypes.indexOf(documentType.id) > -1;
      })
      .map(function(documentType) {
        documentType.asked = true;
        return documentType;
      })
      .value();
  }

  concatTypes(accumulator, type) {
    if (_.find(accumulator, {id: type.id})) {
      return accumulator;
    }

    accumulator.push(type);
    return accumulator;
  }

  computeSelectedDocumentTypes(request, documentTypes) {
    const selectedDocumentTypes = [];

    const mandatoryTypes = this.getMandatoryTypes(documentTypes);
    const existingTypes = this.findExistingTypes(request, documentTypes);
    const askedTypes = this.findAskedTypes(request, documentTypes);

    _.reduce(mandatoryTypes, this.concatTypes, selectedDocumentTypes);
    _.reduce(existingTypes, this.concatTypes, selectedDocumentTypes);
    _.reduce(askedTypes, this.concatTypes, selectedDocumentTypes);

    return selectedDocumentTypes;
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

  postAction(request, action) {
    return this.$http.post(`api/requests/${request.shortId}/action`, action);
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
