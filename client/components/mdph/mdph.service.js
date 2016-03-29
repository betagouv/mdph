'use strict';

(function() {

  function MdphService($http, $q, Util) {
    var safeCb = Util.safeCb;
    var fullMdphList = $http.get('/api/mdphs/list').then(result => {
      return result.data;
    });

    var MdphService = {
      getFullMdphList(callback) {
        var value = (fullMdphList.hasOwnProperty('$promise')) ?
          fullMdphList.$promise : fullMdphList;
        return $q.when(value)
          .then(json => {
            safeCb(callback)(json);
            return json;
          }, () => {
            safeCb(callback)([]);
            return [];
          });
      }
    };

    return MdphService;
  }

  angular.module('impactApp').factory('MdphService', MdphService);
})();
