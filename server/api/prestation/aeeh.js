'use strict';

var _ = require('lodash');
var Utils = require('./utils');

var ou = Utils.ou;
var et = Utils.et;
var getValue = Utils.getValue;
var getValueList = Utils.getValueList;

exports.simulate = function(computed) {
  if (computed.estRenouvellement) {
    if (_.contains(computed.prestations, 'aeeh')) {
      return true;
    }

    if (computed.estAdulte && getValue(computed.logement, 'etablissement')) {
      return true;
    }
  }

  return et([
    computed.estEnfant,
    ou(getValueList(computed.attentesTypeAide, ['financierMinimum', 'humain', 'materiel', 'amenagement'])),
    ou([
      et([
        getValue(computed.attentesTypeAide, 'humain'),
        ou([
          ou(getValueList(computed.besoinsVie, ['hygiene', 'habits', 'repas'])),
          getValue(computed.besoinsDeplacement, 'intraDomicile')
        ]),
      ]),
      et([
        et(getValueList(computed.besoinsSocial, ['securite', 'proches', 'loisirs', 'citoyen'])),
        et(getValueList(computed.besoinsVie, ['budget', 'courses', 'cuisine', 'menage', 'sante'])),
      ]),
      et([
        getValue(computed.attentesTypeAide, 'materiel'),
        et(getValueList(computed.besoinsVie, ['hygiene', 'habits', 'repas'])),
        getValue(computed.besoinsDeplacement, 'public'),
      ])
    ])
  ]);
};
