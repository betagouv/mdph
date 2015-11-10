'use strict';

var _ = require('lodash');
var async = require('async');

var questions = require('../api/geva/questions.json');
var synthese = require('./register-handlebars').synthese;

var sections = _.groupBy(questions, 'Section');

// TODO: Refactor
/*
var cleanModel = {};
_.forEach(sections, function(toutesQuestions, section) {
  cleanModel[section] = {};

  var trajectoires = _.groupBy(toutesQuestions, 'Trajectoire');
  _.forEach(trajectoires, function(sectionQuestions, trajectoire) {
    cleanModel[section][trajectoire] = sectionQuestions;
  });
});

function getSousDetailsFromAnswer(detailConstant, answers) {
  if (!detailConstant.SousDetails) {
    return null;
  }

  var sousDetails = [];
  _.forEach(answers, function(isSelected, id) {
    var sousDetailConstant = _.find(detailConstant.SousDetails, {id: id});
    if (sousDetailConstant) {
      var cleanSousDetail = _.pick(sousDetailConstant, 'CodeValeur', 'SousDetail');
      sousDetails.push(cleanSousDetail);
    }
  });

  return sousDetails;
}

function getDetailsFromAnswer(answerConstant, answers) {
  if (!answerConstant.Details) {
    return null;
  }

  var details = [];
  _.forEach(answers, function(isSelected, id) {
    var detailConstant = _.find(answerConstant.Details, {id: id});
    if (detailConstant) {
      var cleanDetail = _.pick(detailConstant, 'CodeValeur', 'Detail');
      cleanDetail.sousDetails = getSousDetailsFromAnswer(detailConstant, answers);
      details.push(cleanDetail);
    }
  });

  return details;
}

function getCleanAnswer(answerConstant, answers) {
  var cleanAnswer = _.pick(answerConstant, 'CodeValeur', 'Reponse');
  cleanAnswer.details = getDetailsFromAnswer(answerConstant, answers);
  return cleanAnswer;
}

function findDeep(array, id) {
  var question = _.find(array, {id: id});
  if (question) {
    return question;
  } else {
    var found = null;
    array.forEach(function(question) {
      if (question.Reponses && !found) {
        found = findDeep(question.Reponses, id);
      }
    });

    return found;
  }
}

function applyModelToSection(request, section) {
  _.forEach(cleanModel, function(section) {
    var model = request.synthese.geva[section.id];

    _.forEach(section.trajectoires, function(trajectoire) {
      _.forEach(model, function(id) {
        var question = findDeep(trajectoire, id);
        if (question) {
          question.isSelected = true;
        }
      });
    });
  });
}
*/

exports.answersToHtml = function(request, path, output, next) {
  async.series({
    // TODO: Refactor
    // syntheseGeva: function(callback) {
    //   var synthese = applyModelToSection(request, questions);
    //   callback(null, synthese);
    // },

    proposition: function(callback) {
      callback(null, request.synthese.proposition);
    },

    identites: function(callback) {
      callback(null, request.formAnswers.identites);
    },

    mdph: function(callback) {
      callback(null, request.mdph);
    },

    path: function(callback) {
      callback(null, path);
    }
  },
  function(err, results) {
    if (err) { next(err); }

    var html = synthese(results);

    next(null, html);
  });
};
