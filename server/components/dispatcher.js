'use strict';

var DispatchRuleModel = require('../api/dispatch-rule/dispatch-rule.model');
var SecteurModel = require('../api/secteur/secteur.model');

exports.findSecteur = function(type, codePostal, callback) {
  var secteur = null;
  var query = DispatchRuleModel.where({'commune.codePostal': codePostal});

  query.findOne(function(err, rule) {
    if (err) {
      return callback(null);
    }

    if (!rule) {
      SecteurModel.findOne({default: true}).populate('evaluators.' + type).exec(function(err, secteur) {
        if (err || !secteur) {
          return callback(null);
        }
        return callback(secteur);
      });
    } else {
      SecteurModel.findById(rule.secteur[type]).populate('evaluators.' + type).exec(function(err, secteur) {
        if (err || !secteur) {
          return callback(null);
        }
        return callback(secteur);
      });
    }
  });
}
