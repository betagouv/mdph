'use strict';

import Promise from 'bluebird';
import {indexBy, reduce} from 'lodash';
import prestations from './prestations.json';

var prestationsById = indexBy(prestations, 'id');

let reducer = function(array) {
  var reducedArray = [];

  if (array && array.length > 0) {
    array = array.map(str => str.toLowerCase());

    reduce(array, (result, current) => {
      result.push(prestationsById[current]);
      return result;
    }, reducedArray);
  }

  return reducedArray;
};

export function index(req, res) {
  return res.json(prestations);
}

export function populateAndSortPrestations(request) {
  return new Promise(resolve => {
    if (!request) {
      return resolve(null);
    }

    if (request.constructor.name === 'model') {
      request = request.toObject();
    }

    request.detailPrestations = reducer(request.prestations);
    request.detailRenouvellements = reducer(request.renouvellements);

    resolve(request);
  });
}
