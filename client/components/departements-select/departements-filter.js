'use strict';

angular.module('impactApp')
  .filter('filterDepartements', ($filter) => {
    return (list, search) => {
      if (!search) {
        return list;
      }

      let result = [];

      let lookupByName = $filter('filter')(list, {name: search});
      result = result.concat(lookupByName);

      return result;
    };
  });
