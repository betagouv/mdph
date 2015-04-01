'use strict';

var moment = require('moment');
var _ = require('lodash');

var sections = require('../sections/sections.constant').all;
var questions = require('./questions.json')

function linkSectionsQuestions(sections, questionsBySections) {
  sections.forEach(function(section) {
    section.questions =  _.indexBy(questions[section.id], 'model');
  });
  return sections;
}

exports.show = function(req, res) {
  var questions = _.indexBy(questions[req.params.sectionId], 'model');
  return res.json(questions);
};

exports.index = function(req, res) {
  var sectionsWithQuestions = linkSectionsQuestions(sections, questions);
  return res.json(sectionsWithQuestions);
}

exports.questionsBySections = questions;
