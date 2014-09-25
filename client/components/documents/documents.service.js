'use strict';

angular.module('impactApp')
  .factory('DocumentService', function DocumentService(getDocuments, documents) {

    var documentsByType = _.groupBy(documents, 'type');

    var computeDocumentsForAnswers = function(answers, categories) {
      angular.forEach(answers, function(answer) {
        if (answer.answers) { // C'est une sous-section
          computeDocumentsForAnswers(answer.answers, categories);
        }
        if (answer.documents) {
          angular.forEach(answer.documents, function(document) {
            categories[document.category].show = true;
            categories[document.category].documents[document.id].show = true;
          });
        }
      });
    };

    return {
      computeDocuments: function(form) {
        var categories = getDocuments('TODO_RETRIEVE_USER_NAME'); // TODO
        angular.forEach(form.formAnswers, function(section) {
          computeDocumentsForAnswers(section.answers, categories);
        });

        return categories;
      },

      getDocumentByType: function(type) {
        return documentsByType[type];
      },

      getDocumentTypeForForm: function(form, type, next) {
        var documents = this.getDocumentByType(type);

        if (!form) {
          return documents;
        }

        var documentsById = _.indexBy(documents, 'id');
        angular.forEach(form.files, function(file) {
          documentsById[file.documentType].file = file;
        });

        var complete = true;
        angular.forEach(documents, function(document) {
          if (!document.file) {
            complete = false;
          }
        });

        next(documents, complete);
      }
    };
  });
