'use strict';

var _ = require('lodash');

var sectionsWithQuestions = require('./questions.json')

exports.show = function(req, res) {
  var section = _.find(sectionsWithQuestions, function(current) {
    return current.id === req.params.sectionId;
  });

  return res.json(section);
};

exports.index = function(req, res) {
  return res.json(sectionsWithQuestions);
}

exports.sectionsWithQuestions = sectionsWithQuestions;
