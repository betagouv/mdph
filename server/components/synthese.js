'use strict';

/* jshint multistr: true */

var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var async = require('async');
var moment = require('moment');
var mustache = require('mustache');

var questions = require('../api/geva/questions.json');

// Using the label as ID... TODO: Set id for each question
var questionsByLabel = _.indexBy(questions, 'Question');

var readFile = function(name, callback) {
  fs.readFile(path.join(__dirname, 'templates', name), function(err, html) {
    callback(err, String(html));
  });
};

var formatDateNaissance = function(identite) {
  if (identite && identite.dateNaissance) {
    identite.dateNaissance = moment(identite.dateNaissance).format('DD/MM/YYYY');
  }
}

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

function getGevaAnswers(questions) {
  var gevaAnswers = [];

  _.forEach(questions, function(answers, label) {
    var questionConstant = questionsByLabel[label];
    var gevaAnswer = {
      label: questionConstant.Description,
      answers: []
    };

    if (questionConstant.Type === 'CU') {
      var answerConstant = _.find(questionConstant.Reponses, {id: answers.reponse});

      if (answerConstant) {
        var cleanAnswer = getCleanAnswer(answerConstant, answers);
        gevaAnswer.answers.push(cleanAnswer);
      }
    } else {
      _.forEach(answers, function(isSelected, id) {
        if (isSelected) {
          var answerConstant = _.find(questionConstant.Reponses, {id: id});
          if (answerConstant) {
            var cleanAnswer = getCleanAnswer(answerConstant, answers);
            gevaAnswer.answers.push(cleanAnswer);
          }
        }
      });
    }

    gevaAnswers.push(gevaAnswer);
  });

  return gevaAnswers;
}

exports.answersToHtml = function(request, path, output, next) {
  async.series({
    syntheseTemplate: function(callback) {
      readFile('pdfSynthese.html', callback);
    },

    identites: function(callback) {
      readFile('identites.html', callback);
    },

    identite: function(callback) {
      readFile('identite.html', callback);
    },

    autorite: function(callback) {
      readFile('autorite.html', callback);
    },

    aidantDemarche: function(callback) {
      readFile('aidantDemarche.html', callback);
    },

    geva: function(callback) {
      readFile('geva.html', callback);
    },

    propositions: function(callback) {
      readFile('propositions.html', callback);
    },

    prestaDemande: function(callback) {
      readFile('prestaDemande.html', callback);
    },

    prestaAutre: function(callback) {
      readFile('prestaAutre.html', callback);
    },

    gevaAnswers: function(callback) {
      readFile('gevaAnswers.html', callback);
    },

    syntheseGeva: function(callback) {
      if (!request.synthese || !request.synthese.geva) {
        return callback(null, []);
      }

      var synthese = {
        answers: getGevaAnswers(request.synthese.geva)
      };

      callback(null, synthese);
    },

    proposition: function(callback) {

      if (!request.synthese || !request.synthese.proposition) {
        return callback(null, []);
      }

      var proposition = request.synthese.proposition;
      callback(null, proposition);
    },

    requestIdentites: function(callback) {
      if (!request.formAnswers) {
        return callback(null, []);
      }

      var identites = request.formAnswers.identites;
      formatDateNaissance(identites.beneficiaire);
      if (identites.autorite) {
        formatDateNaissance(identites.autorite.parent1);
        formatDateNaissance(identites.autorite.parent2);
      }

      callback(null, identites);
    },

    mdph: function(callback) {
      if (!request.mdph) {
        return callback(null, []);
      }

      callback(null, request.mdph);
    }
  },
  function(err, results) {
    if (err) { next(err); }

    var subTemplates = _.omit(results, 'syntheseTemplate', 'requestIdentites', 'syntheseGeva', 'proposition', 'mdph');
    var html = mustache.render(
      results.syntheseTemplate,
      {path: path, identites: results.requestIdentites, syntheseGeva: results.syntheseGeva, proposition: results.proposition, mdph: results.mdph},
      subTemplates
    );
    next(null, html);
  });
};
