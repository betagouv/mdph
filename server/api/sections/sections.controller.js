'use strict';

var sections = require('./sections.constant');

exports.index = function(req, res) {
  return res.json(sections.all);
}
