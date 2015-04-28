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
      var queryDefaultRule = DispatchRuleModel.where({'commune.codePostal': '*'});
      query.findOne(function(err, defaultRule) {
        if (err || !rule) {
          return callback(null);
        }

        var secteur = SecteurModel.findById(defaultRule.secteur[type], function(err, secteur) {
          if (err || !secteur) {
            return callback(null);
          }
          return callback(secteur);
        });
      });
    } else {
      var secteur = SecteurModel.findById(rule.secteur[type], function(err, secteur) {
        if (err || !secteur) {
          return callback(null);
        }
        return callback(secteur);
      });
    }
  });
}
