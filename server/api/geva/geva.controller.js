'use strict';

var _ = require('lodash');
var Geva = require('./geva.constants');

exports.index = function(req, res) {
  return res.json(Geva.all);
};

exports.questionsByDescription = function (description) {
  var allQuestions = Geva.all;
  allQuestions = _.indexBy(allQuestions, 'Description');
  return allQuestions[description];
}

exports.getFlattenedAnswers = function (reponses) {
  var flattenedAnswers = [];
  if (reponses) {
    reponses.forEach (function (reponse) {
      if (!reponse.Details ) {
        flattenedAnswers.push(reponse);
      } else {
        addFlattenedAnswer (flattenedAnswers, reponse, 'Reponse');
        reponse.Details.forEach (function (detail) {
          addFlattenedAnswer (flattenedAnswers, detail, 'Detail');
          if (detail.SousDetails ) {
            detail.SousDetails.forEach (function (sousDetail) {
              addFlattenedAnswer (flattenedAnswers, sousDetail, 'SousDetail');
            });
          }
        });
      }
    })
  }
  return flattenedAnswers;
}

function addFlattenedAnswer (answers, answer, type) {
  answers.push({
    'Reponse': answer[type],
    'Tri': answer.Tri,
    'CodeValeur': answer.CodeValeur
  });
}
