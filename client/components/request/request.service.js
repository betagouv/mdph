'use strict';

angular.module('impactApp')
  .factory('RequestService', function RequestService() {
    return {
      updatedAt: function(request) {
        return moment(request.updatedAt).fromNow();
      }
    };
  });
