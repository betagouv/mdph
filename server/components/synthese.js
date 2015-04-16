'use strict';

/* jshint multistr: true */

var _ = require('lodash');
var os = require('os');
var fs = require('fs');
var path = require('path')
var async = require('async');
var moment = require('moment');
var mustache = require('mustache');

var Sections = require('../api/sections/sections.constant');
var QuestionsBySections = require('../api/question/question.controller').questionsBySections;

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
    propositions: function (callback) {
      readFile('propositions.html', callback);
    },
    prestaDemande: function (callback) {
      readFile('prestaDemande.html', callback);
    },
    prestaAutre: function (callback) {
      readFile('prestaAutre.html', callback);
    },
    proposition: function (callback) {
      if (!request.synthese.proposition) {
        callback(null, []);
      }

      var proposition = request.synthese.proposition;
      callback(null, proposition);
    },
    requestInformations: function (callback) {
      if (!request.formAnswers) {
        callback(null, []);
      }

      var logementAnswers = request.formAnswers.vie_quotidienne.logement;
      var informations = [];
      var vieQuotidienneQuestions = _.indexBy(QuestionsBySections['vie_quotidienne'], 'model');
      vieQuotidienneQuestions.logement.answers.forEach(function (answer) {
        if (logementAnswers === answer.model) {
          if (answer.labelRecap) {
            informations.push(
              {
                label: 'Vit',
                answer: answer.labelRecap
              }
            );
          }
          else {
            informations.push(
              {
                label: 'Vit',
                answer: answer.label
              }
            );
          }
        }
      });

      callback(null, informations);
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
    var ansersTemplate = results.syntheseTemplate;
    var subTemplates = _.omit(results, 'syntheseTemplate', 'requestIdentites', 'requestInformations');
    var html = mustache.render(
      results.syntheseTemplate,
      {path: path, identites: results.requestIdentites, informations: results.requestInformations, propositions: results.proposition, mdph: results.mdph},
      subTemplates
    );
    next(null, html);
  });
};
