'use strict';

var DispatchRuleModel = require('../api/dispatch-rule/dispatch-rule.model');
var SecteurModel = require('../api/secteur/secteur.model');
var MdphModel = require('../api/mdph/mdph.model');

exports.findSecteur = function(type, codePostal, mdphZipcode, callback) {
  var secteur = null;
  var query = DispatchRuleModel.where({'commune.codePostal': codePostal});

  query.findOne(function(err, rule) {
    if (err) {
      return callback(null);
    }

    if (!rule) {
      MdphModel.findOne({zipcode: mdphZipcode}, function(err, mdph) {
        if (err || !mdph) {
          return callback(null);
        }
        console.log(mdph);

        SecteurModel.findOne({default: true, mdph: mdph}).populate('evaluators.' + type).exec(function(err, secteur) {
          console.log(secteur);
          if (err || !secteur) {
            return callback(null);
          }
          return callback(secteur);
        });
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
