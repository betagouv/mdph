'use strict';

var _ = require('lodash');
var Utils = require('./utils');

var ou = Utils.ou;
var et = Utils.et;
var getValue = Utils.getValue;

exports.simulate = function(computed) {
  if (computed.estRenouvellement) {
    if (_.contains(computed.prestations, 'carteStationnement')) {
      return true;
    }
  }

  return ou([
    getValue(computed.aideTechnique, 'aideTechnique_technique'),
    getValue(computed.besoinsDeplacement, 'intraDomicile'),
    et([
      getValue(computed.attentesTypeAide, 'humain'),
      getValue(computed.besoinsDeplacement, 'public')
    ]),
    et([
      getValue(computed.attentesTypeAide, 'humain'),
      getValue(computed.attentesTypeAide, 'mobilite')
    ])
  ]);
};
