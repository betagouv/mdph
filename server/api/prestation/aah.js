'use strict';

var Utils = require('./utils');

var ou = Utils.ou;
var et = Utils.et;
var getValue = Utils.getValue;
var getValueList = Utils.getValueList;

exports.simulate = function(computed) {
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
          ou( getValueList(computed.besoinsVie, ['hygiene', 'habits', 'repas']) ),
          getValue(computed.besoinsDeplacement, 'intraDomicile')
        ])
      ]),
      et([
        et( getValueList(computed.besoinsVie, ['habits', 'cuisine', 'repas', 'budget', 'courses', 'menage', 'sante']) ),
        et( getValueList(computed.besoinsSocial, ['securite', 'proches', 'loisirs', 'citoyen']) ),
        computed.estNonActif,
        computed.aMoinsDe62Ans
      ]),
      et([
        et( getValueList(computed.besoinsVie, ['hygiene', 'habits', 'repas']) ),
        getValue(computed.besoinsDeplacement, 'public'),
        getValue(computed.attentesTypeAide, 'materiel')
      ])
    ])
  ]);
}
