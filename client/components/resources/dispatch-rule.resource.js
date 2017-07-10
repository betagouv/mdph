'use strict';

angular.module('impactApp')
  .factory('DispatchRuleResource', function($resource) {
    return $resource('/api/mdphs/:mdph/dispatch-rules/:id', {
      id: '@_id',
    });
  });
