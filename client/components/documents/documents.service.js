'use strict';

angular.module('impactApp')
  .factory('DocumentsService', function DocumentsService(documentTypes) {
    var typesObligatoires = _.chain(documentTypes)
      .filter({mandatory: true})
      .pluck('id')
      .value();

    var documentTypesById = _.indexBy(documentTypes, 'id');

    return {
      typesObligatoires: typesObligatoires,
      documentTypesById: documentTypesById,

      groupByType: function(documents) {
        return _.groupBy(documents, 'type');
      },

      filterMandatory: function(documents) {
        if (!documents && documents.length === 0) {
          return documents;
        }

        return _.filter(documents, function(current) {
          return _.contains(typesObligatoires, current.type);
        });
      },

      filterNonMandatory: function(documents) {
        if (!documents && documents.length === 0) {
          return documents;
        }

        return _.filter(documents, function(current) {
          return !_.contains(typesObligatoires, current.type);
        });
      }
    };
  });
