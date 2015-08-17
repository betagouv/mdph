'use strict';

var _ = require('lodash');
var Utils = require('./utils');

var ou = Utils.ou;
var et = Utils.et;
var getValue = Utils.getValue;
var getValueList = Utils.getValueList;

exports.simulate = function(computed) {
  return et([
    computed.estAdulte,
    ou([
      getValue(computed.attentesTypeAide, 'etablissement'),
      et([
        getValue(computed.urgences, 'domicile'),
        et(getValueList(computed.besoinsSocial, ['securite', 'proches'])),
        ou([
          getValue(computed.besoinsSocial, 'loisirs'),
          et([
            getValue(computed.attentesTypeAide, 'humain'),
            ou([
              ou(getValueList(computed.besoinsVie, ['hygiene', 'habits', 'repas'])),
              getValue(computed.besoinsDeplacement, 'intraDomicile')
            ])
          ])
        ])
      ]),
      et([
        ou(getValueList(computed.attentesAidant, ['imprevu', 'vacances', 'professionnel'])),
        ou(getValueList(computed.natureAideAidant, ['surveillance', 'deplacementExterieur', 'deplacementInterieur', 'loisirs', 'hygiene', 'social', 'repasPrise']))
      ])
    ])
  ]);
};
