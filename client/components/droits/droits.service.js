'use strict';

angular.module('impactApp')
  .factory('DroitService', function DroitService($http) {

    return {
      compute: function(answers) {
        return $http.post('api/prestations/simulation', answers);
      }
    };
  });
