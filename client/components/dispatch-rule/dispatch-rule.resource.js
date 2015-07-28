'use strict';

angular.module('impactApp')
  .factory('DispatchRuleResource', function($resource) {
    return $resource('/api/dispatch-rules/:id', {
      id: '@_id'
    });
  });
