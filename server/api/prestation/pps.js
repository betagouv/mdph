'use strict';

var _ = require('lodash');
var Utils = require('./utils');

var ou = Utils.ou;
var getValueList = Utils.getValueList;

exports.simulate = function(computed) {
  if (computed.estRenouvellement) {
    if (_.contains(computed.prestations, 'pps')) {
      return true;
    }
  }

  return ou([
    ou(getValueList(computed.urgences, ['ecole', 'etablissement'])),
    ou(getValueList(computed.attentesVieScolaire, ['adaptation', 'orientation', 'readaptation', 'etablissementSansHebergement', 'etablissementAvecHebergement']))
  ]);
};
