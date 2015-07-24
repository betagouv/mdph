'use strict';

angular.module('impactApp')
  .factory('SectionUtils', function SectionUtils() {
    return {
      resolveSaveSection: function(sectionModel, updateRequest) {
        return function() {
          sectionModel.__completion = true;
          updateRequest();
        };
      },
      resolveSectionModel: function(request, section) {
        if (typeof request.formAnswers[section.id] === 'undefined') {
          request.formAnswers[section.id] = {};
        }
        return request.formAnswers[section.id];
      }
    };
  });
