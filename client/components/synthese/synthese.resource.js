'use strict';

angular.module('impactApp')
  .factory('SyntheseResource', function($resource) {
    return $resource('/api/mdphs/:zipcode/syntheses/:profileId/:controller/:controllerId', {},
      {
        update: {
          method: 'PUT',
          params: {
            controller: 'syntheses'
          }
        }
      }
    );
  });
