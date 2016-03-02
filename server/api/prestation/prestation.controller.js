'use strict';

var _ = require('lodash');
var prestations = require('./prestations.json');
var prestationsById = _.indexBy(prestations, 'id');

let reducer = function(array) {
  var reducedArray = {};

  if (array && array.length > 0) {
    array = _.map(array, str => str.toLowerCase());

    _(array).reduce((result, current) => {
      result[current] = prestationsById[current];
      return result;
    }, reducedArray);
  }

  return reducedArray;
};

module.exports = {
  index: function(req, res) {
    return res.json(prestations);
  },

  populateAndSortPrestations: function(request, callback) {
    request.detailPrestations = reducer(request.prestations);
    request.detailRenouvellements = reducer(request.renouvellements);

    return callback(null, request);
  }
};
