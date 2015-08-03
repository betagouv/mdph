'use strict';

var _ = require('lodash');
var questions = require('./questions.json');

exports.index = function(req, res) {
  return res.json(questions);
};
