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
      request.detailPrestations = _.reduce(request.prestations, function(result, current) {
        result[current] = prestationsById[current.toLowerCase()];
        return result;
      }, {});
    }

    return callback(null, request);
  }
};
