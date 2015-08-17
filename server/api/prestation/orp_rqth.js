'use strict';

var _ = require('lodash');
var Utils = require('./utils');

var ou = Utils.ou;
var et = Utils.et;
var getValue = Utils.getValue;
var getValueList = Utils.getValueList;

exports.simulate = function(computed) {
  if (getValue(computed.vieAuTravail, 'rqth')) {
    return true;
  }

  return ou([
    getValue(computed.urgences, 'travail'),
    getValue(computed.urgences, 'formation'),
    getValue(computed.besoinSoutienAuTravail, 'precisions'),
    getValue(computed.conservationTravail, 'medecineTravail'),
    getValue(computed.conservationTravail, 'sameth'),
    getValue(computed.vieAuTravail, 'amenagement'),
    _.contains(computed.prestations, 'aah'),
    et([
      getValue(computed.aidePersonne, 'aidePersonne_medicoSociale'),
      getValue(computed.besoinSoutienAuTravail, 'precisions')
    ]),
    et([
      computed.aPlusDe15Ans,
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
          ]),
        ]),
        et([
          et(getValueList(computed.besoinsVie, ['habits', 'cuisine', 'repas', 'budget', 'courses', 'menage', 'sante'])),
          et(getValueList(computed.besoinsSocial, ['securite', 'proches', 'loisirs', 'citoyen'])),
          computed.estNonActif
        ]),
        et([
          et(getValueList(computed.besoinsVie, ['hygiene', 'habits', 'repas'])),
          getValue(computed.besoinsDeplacement, 'public'),
          getValue(computed.attentesTypeAide, 'materiel'),
          computed.estNonActif
        ])
      ])
    ])
  ]);
};
