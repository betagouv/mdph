'use strict';

var sections = require('./sections.json');

exports.index = function(req, res) {
  return res.json(sections);
};
