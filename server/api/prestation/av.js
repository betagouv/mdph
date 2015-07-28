'use strict';

var _ = require('lodash');
var Utils = require('./utils');

var ou = Utils.ou;
var et = Utils.et;
var getValue = Utils.getValue;

exports.simulate = function(computed) {
  if (computed.estRenouvellement) {
    if (_.contains(computed.prestations, 'av')) {
      return true;
    }
  }

  return ou([
    getValue(computed.attentesAidant, 'vieillesse'),
    et([
      getValue(computed.aidant, 'emploi') === 'reductionActivite',
      getValue(computed.aidant, 'vie')
    ])
  ]);
};
