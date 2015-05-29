'use strict';

var Utils = require('./utils');

var ou = Utils.ou;
var et = Utils.et;
var getValue = Utils.getValue;

exports.simulate = function(computed) {
  return ou([
    getValue(computed.attentesAidant, 'vieillesse'),
    et([
      getValue(computed.aidant, 'emploi') === 'reductionActivite',
      getValue(computed.aidant, 'vie')
    ])
  ]);
}
