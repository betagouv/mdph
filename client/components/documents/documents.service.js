'use strict';

angular.module('impactApp')
  .factory('DocumentsService', function DocumentsService(DocumentResource) {
    return {
      groupByType: function(documents) {
        var groups = _.groupBy(documents, 'type');
        var detailedGroups = [];

        _.forEach(groups, function(files, group) {
          detailedGroups.push({
            documentType: DocumentResource.get({id: group}),
            files: files
          });
        });

        return detailedGroups;
      },

      filterMandatory: function(documents, mandatoryTypes) {
        if (!documents && documents.length === 0) {
          return documents;
        }

        return _.filter(documents, function(current) {
          return _.contains(mandatoryTypes, current.type);
        });
      },

      filterNonMandatory: function(documents, mandatoryTypes) {
        if (!documents && documents.length === 0) {
          return documents;
        }

        return _.filter(documents, function(current) {
          return !_.contains(mandatoryTypes, current.type);
        });
      }
    };
  });
