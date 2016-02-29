'use strict';

var async = require('async');

var DispatchRuleModel = require('../api/dispatch-rule/dispatch-rule.model');
var SecteurModel = require('../api/secteur/secteur.model');
var MdphModel = require('../api/mdph/mdph.model');

exports.findSecteur = function(request, callback) {
  var codePostal = request.getCodePostal();
  var type = request.getType();

  async.waterfall([
    function(cb) {
      MdphModel.findOne({zipcode: request.mdph}).exec(cb);
    },

    function(mdph, cb) {
      DispatchRuleModel.findOne({'commune.codePostal': codePostal, mdph: mdph}).exec(function(err, dispatchRule) {
        cb(err, dispatchRule, mdph);
      });
    },

    function(dispatchRule, mdph, cb) {
      if (!dispatchRule) {
        SecteurModel.findOne({default: true, mdph: mdph}).populate('evaluators.' + type).exec(function(err, defaultSecteur) {
          if (err || !defaultSecteur) {
            cb(true);
          } else {
            cb(null, defaultSecteur);
          }
        });
      } else {
        SecteurModel.findById(dispatchRule.secteur[type]).populate('evaluators.' + type).exec(function(err, secteur) {
          if (err || !secteur) {
            cb(true);
          } else {
            cb(null, secteur);
          }
        });
      }
    }

  ], function(err, secteur) {
    if (err) {
      return callback(404);
    } else {
      return callback(null, secteur);
    }
  });
};
