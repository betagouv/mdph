'use strict';

var _ = require('lodash');
var Utils = require('./utils');

var ou = Utils.ou;
var et = Utils.et;
var getValue = Utils.getValue;
var getValueList = Utils.getValueList;

exports.simulate = function(computed) {
  if (getValue(computed.aideFinancierePresent, 'aah')) {
    return true;
  }

  if (computed.estAdulte && getValue(computed.milieuTravail, 'etablissement')) {
    return true;
  }

  if (computed.estAdulte && getValue(computed.vieQuotidienne, 'logement') === 'etablissement') {
    return true;
  }

  return et([
    computed.estAdulte,
    ou([
      getValue(computed.besoinsVie, 'courant'),
      getValue(computed.attentesTypeAide, 'financierMinimum')
    ]),
    ou([
      getValue(computed.pensionInvalidite, 'mtp'),
      getValue(computed.pensionInvalidite, 'pcrtp'),
      et([
        getValue(computed.attentesTypeAide, 'humain'),
        ou([
          ou(getValueList(computed.besoinsVie, ['hygiene', 'habits', 'repas'])),
          getValue(computed.besoinsDeplacement, 'intraDomicile')
        ])
      ]),
      et([
        et(getValueList(computed.besoinsVie, ['habits', 'cuisine', 'repas', 'budget', 'courses', 'menage', 'sante'])),
        et(getValueList(computed.besoinsSocial, ['securite', 'proches', 'loisirs', 'citoyen'])),
        computed.estNonActif,
        computed.aMoinsDe62Ans
      ]),
      et([
        et(getValueList(computed.besoinsVie, ['hygiene', 'habits', 'repas'])),
        getValue(computed.besoinsDeplacement, 'public'),
        getValue(computed.attentesTypeAide, 'materiel')
      ])
    ])
  ]);
};
