'use strict';

var moment = require('moment');
var _ = require('lodash');

var sections = require('../sections/sections.constant').all;

var vieQuotidienne = require('./vie_quotidienne.constant');
var vieScolaire = require('./vie_scolaire.constant');
var vieAuTravail = require('./vie_au_travail.constant');
var situationsParticulieres = require('./situations_particulieres.constant');
var renouvellement = require('./renouvellement.constant');
var aidant = require('./aidant.constant');

function index(questions) {
  return _.indexBy(questions, 'model');
}

function linkSectionsQuestions(sections, questionsBySections) {
  sections.forEach(function(section) {
    section.questions =  questionsBySections[section.id];
  });

  return sections;
}

var questionsBySections = {
  'vie_quotidienne': index(vieQuotidienne),
  'vie_scolaire': index(vieScolaire),
  'vie_au_travail': index(vieAuTravail),
  'situations_particulieres': index(situationsParticulieres),
  'renouvellement': index(renouvellement),
  'aidant': index(aidant)
};

var sectionsWithQuestions = linkSectionsQuestions(sections, questionsBySections);

exports.show = function(req, res) {
  var questions = questionsBySections[req.params.sectionId];
  return res.json(questions);
};

exports.index = function(req, res) {
  return res.json(sectionsWithQuestions);
}

exports.questionsBySections = questionsBySections;
