'use strict';

var moment = require('moment');
var _ = require('lodash');

var evalQuestions = require('./questions_preparation_evaluation.json');

exports.index = function(req, res) {
  return res.json(evalQuestions);
};

exports.evalQuestions = evalQuestions;
