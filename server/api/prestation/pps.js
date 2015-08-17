'use strict';

var _ = require('lodash');
var Utils = require('./utils');

var ou = Utils.ou;
var getValueList = Utils.getValueList;

exports.simulate = function(computed) {
  return ou([
    ou(getValueList(computed.urgences, ['ecole', 'etablissement'])),
    ou(getValueList(computed.attentesVieScolaire, ['adaptation', 'orientation', 'readaptation', 'etablissementSansHebergement', 'etablissementAvecHebergement']))
  ]);
};
