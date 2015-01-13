'use strict';

var Geva = require('./geva.constants');

exports.index = function(req, res) {
  return res.json(Geva.all);
};
