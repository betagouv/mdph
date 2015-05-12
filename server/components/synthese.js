'use strict';

/* jshint multistr: true */

var _ = require('lodash');
var fs = require('fs');
var path = require('path')
var async = require('async');
var moment = require('moment');
var mustache = require('mustache');

var questionsByDescription = require('../api/geva/geva.controller').questionsByDescription;
var getFlattenedAnswers = require('../api/geva/geva.controller').getFlattenedAnswers;

var readFile = function(name, callback) {
  fs.readFile(path.join(__dirname, 'templates', name), function (err, html) {
    callback(err, String(html));
  });
}

var formatDateNaissance = function(identite) {
  if (identite && identite.dateNaissance) {
    identite.dateNaissance = moment(identite.dateNaissance).format('DD/MM/YYYY');
  }
}

function getGevaAnswers (gevaSections) {
  var gevaAnswers = [];
  _.forEach (gevaSections, function (section) {
    _.forEach (section, function(n, key) {
      var question = questionsByDescription(key);
      var flattenedAnswers = getFlattenedAnswers(question.Reponses);
      flattenedAnswers = _.indexBy(flattenedAnswers, 'CodeValeur');
      if (n.length > 0) {
        var questionAnswers = [];
        n.forEach ( function (codeValeur) {
          questionAnswers.push(flattenedAnswers[codeValeur]);
        })
        gevaAnswers.push({
          label: question.Question,
          answers: questionAnswers
        })
      }
    });
  });
  return gevaAnswers;
}

exports.answersToHtml = function (request, path, output, next) {
  async.series({
    syntheseTemplate: function (callback) {
      readFile('pdfSynthese.html', callback);
    },
    identites: function (callback) {
      readFile('identites.html', callback);
    },
    identite: function (callback) {
      readFile('identite.html', callback);
    },
    autorite: function (callback) {
      readFile('autorite.html', callback);
    },
    aidantDemarche: function (callback) {
      readFile('aidantDemarche.html', callback);
    },
    geva: function(callback) {
      readFile('geva.html', callback);
    },
    propositions: function (callback) {
      readFile('propositions.html', callback);
    },
    prestaDemande: function (callback) {
      readFile('prestaDemande.html', callback);
    },
    prestaAutre: function (callback) {
      readFile('prestaAutre.html', callback);
    },
    gevaAnswers: function (callback) {
      readFile('gevaAnswers.html', callback);
    },
    syntheseGeva: function (callback) {
      if (!request.synthese.geva) {
        callback(null, []);
      }
      var synthese = {
        answers: getGevaAnswers(request.synthese.geva)
      };
      callback(null, synthese);
    },
    proposition: function (callback) {
      if (!request.synthese.proposition) {
        callback(null, []);
      }

      var proposition = request.synthese.proposition;
      callback(null, proposition);
    },
    requestIdentites: function (callback) {
      if (!request.formAnswers) {
        callback(null, []);
      }

      var identites = request.formAnswers.identites;
      formatDateNaissance(identites.beneficiaire);
      if(identites.autorite){
        formatDateNaissance(identites.autorite.parent1);
        formatDateNaissance(identites.autorite.parent2);
      }

      callback(null, identites);
    },
    informations: function (callback){
      readFile('informations.html', callback);
    },
    mdph: function (callback) {
      if (!request.mdph) {
        callback(null, []);
      }
      callback(null, request.mdph);
    }
  },
  function(err, results){
    if (err) { next(err); }
    var subTemplates = _.omit(results, 'syntheseTemplate', 'requestIdentites');
    var html = mustache.render(
      results.syntheseTemplate,
      {path: path, identites: results.requestIdentites, syntheseGeva: results.syntheseGeva, propositions: results.proposition, mdph: results.mdph},
      subTemplates
    );
    next(null, html);
  });
};
