'use strict';

var Prestation = require('./prestation.constants');

exports.index = function(req, res) {
  return res.json(Prestation.all);
};