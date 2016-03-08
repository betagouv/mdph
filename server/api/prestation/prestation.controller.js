'use strict';

import Promise from 'bluebird';
import {indexBy, reduce} from 'lodash';

var prestations = require('./prestations.json');
var prestationsById = indexBy(prestations, 'id');

let reducer = function(array) {
  var reducedArray = {};

  if (array && array.length > 0) {
    array = array.map(str => str.toLowerCase());

    reduce(array, (result, current) => {
      result[current] = prestationsById[current];
      return result;
    }, reducedArray);
  }

  return reducedArray;
};

export default {
  index: function(req, res) {
    return res.json(prestations);
  },

  populateAndSortPrestations: function(request) {
    return new Promise(resolve => {
      if (!request) {
        return resolve(null);
      }

      let requestObj = request.toObject();

      requestObj.detailPrestations = reducer(request.prestations);
      requestObj.detailRenouvellements = reducer(request.renouvellements);

      resolve(requestObj);
    });
  }
};
