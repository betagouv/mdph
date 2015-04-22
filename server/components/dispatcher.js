'use strict';

var _ = require('lodash');
var moment = require('moment');
var DispatchRuleModel = require('../api/dispatch-rule/dispatch-rule.model');
var SecteurModel = require('../api/secteur/secteur.model');

exports.findSecteur = function(identites, callback) {
  var dateNaissance = identites.beneficiaire.dateNaissance;
  var codePostal = identites.beneficiaire.code_postal;
  var estAdulte = moment().diff(dateNaissance, 'years') >= 18;
  var type = estAdulte ? 'adulte' : 'enfant';

  var secteur = null;
  var query = DispatchRuleModel.where({'commune.codePostal': codePostal});

  query.findOne(function(err, rule) {
    if (err || !rule) {
      return callback(null);
    }

    var secteur = SecteurModel.findById(rule.secteur[type], function(err, secteur) {
      if (err || !secteur) {
        return callback(null);
      }
      return callback(secteur);
    });
  });
}
