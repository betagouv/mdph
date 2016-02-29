'use strict';

var _ = require('lodash');
var prestations = require('./prestations.json');
var prestationsById = _.indexBy(prestations, 'id');

module.exports = {
  index: function(req, res) {
    return res.json(prestations);
  },

  populateAndSortPrestations: function(request, callback) {
    if (request.prestations && request.prestations.length > 0) {
      request.prestations = _.map(request.prestations, str => str.toLowerCase());
      request.detailPrestations = {};

      _(request.prestations).reduce((result, current) => {
        result[current] = prestationsById[current];
        return result;
      }, request.detailPrestations);
    }

    return callback(null, request);
  }
};
