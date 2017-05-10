'use strict';

angular.module('impactApp')
  .filter('filterDepartements', ($filter) => {
    return (list, search) => {
      if (!search) {
        return list;
      }

      let result = [];
      const fields = ['name', 'zipcode'];

      fields.map(field => {
        const _search = {};
        _search[field] = search;
        let lookupByName = $filter('filter')(list, _search);
        result = result.concat(lookupByName);
      });

      return result;
    };
  });
