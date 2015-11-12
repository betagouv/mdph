'use strict';

angular.module('impactApp')
  .factory('RequestService', function RequestService(estAdulte, documentTypes, allSteps) {
    var documentsObligatoires = _.chain(documentTypes)
      .filter({mandatory: true})
      .pluck('id')
      .value();

    var stepObligatoire = _.find(allSteps, {id: 'obligatoire'});

    function checkStepObligatoireCompletion(request) {
      var nbSections = 0;
      stepObligatoire.sections.forEach(function(section) {
        if (request.formAnswers[section] && request.formAnswers[section].__completion) {
          nbSections += 1;
        }
      });

      return nbSections === stepObligatoire.sections.length;
    }

    function allMandatoryFilesPresent(request) {
      let nbDocuments = 0;
      documentsObligatoires.forEach(function(document) {
        const documentsOfType = _.find(request.documents, {type: document});
        if (typeof documentsOfType !== 'undefined') {
          nbDocuments += 1;
        }
      });

      return nbDocuments === documentsObligatoires.length;
    }

    function noInvalidatedFiles(request) {
      let found = false;
      request.documents.forEach(function(document) {
        if (document.validation === 'false') {
          found = true;
        }
      });

      return found;
    }

    function checkStepDocumentsCompletion(request) {
      if (!request.documents) {
        return false;
      }

      return allMandatoryFilesPresent(request) && !noInvalidatedFiles(request);
    }

    var isAdult = function(request) {
      if (request.formAnswers.identites && request.formAnswers.identites.beneficiaire) {
        return estAdulte(request.formAnswers.identites.beneficiaire.dateNaissance);
      } else {
        return true;
      }
    };

    var updatedAt = function(request) {
      return moment(request.updatedAt).fromNow();
    };

    var getCompletion = function(section, request) {
      if (!request.formAnswers) {
        return 0;
      }

      if (typeof request.formAnswers[section] === 'undefined' || _.keys(request.formAnswers[section]).length === 0) {
        return 0;
      } else if (request.formAnswers[section].__completion === true) {
        return 100;
      } else {
        return 50;
      }
    };

    var getStepCompletion = function(step, request) {
      switch (step.id) {
        case 'obligatoire':
          return checkStepObligatoireCompletion(request);
        case 'documents':
          return checkStepDocumentsCompletion(request);
        default:
          return undefined;
      }
    };

    var getRequestCompletion = function(request) {
      return _.reduce(allSteps, function(value, currentStep) {
        var completion;

        if (currentStep.mandatory) {
          completion = getStepCompletion(currentStep, request) === true;
        } else {
          completion = true;
        }

        return value && completion;
      });
    };

    return {
      estAdulte: isAdult,
      updatedAt: updatedAt,
      getCompletion: getCompletion,
      getStepCompletion: getStepCompletion,
      getRequestCompletion: getRequestCompletion
    };
  });
