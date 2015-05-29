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
      et([
        ou([
          getValue(computed.urgences, 'domicile'),
          getValue(computed.attentesTypeAide, 'domicile'),
          getValue(computed.attentesTypeAide, 'humain')
        ]),
        ou([
          ou( getValueList(computed.besoinsVie, ['budget', 'sante']) ),
          ou( getValueList(computed.besoinsSocial, ['proches', 'loisirs', 'citoyen']) ),
        ])
      ]),
      et([
        ou( getValueList(computed.attentesAidant, ['repos', 'professionnel']) ),
        et( getValueList(computed.natureAideAidant, [
          'surveillance',
          'juridique',
          'deplacementExterieur',
          'finances',
          'logement',
          'loisirs',
          'social',
          'repasPreparation',
          'medical'
        ]) )
      ])
    ])
  ]);
}

