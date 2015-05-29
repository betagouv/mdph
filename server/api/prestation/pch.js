'use strict';

var Utils = require('./utils');

var ou = Utils.ou;
var et = Utils.et;
var getValue = Utils.getValue;
var getValueList = Utils.getValueList;

exports.simulate = function(computed) {
  if (computed.estEnfant) {
    return et([
      ou(getValueList(computed.attentesTypeAide, ['humain', 'materiel', 'amenagement', 'financierHandicap'])),
      ou([
        et([
          getValue(computed.besoinsVie, 'hygiene'),
          getValue(computed.attentesTypeAide, 'humain'),
          ou([
            getValue(computed.aideTechnique, 'aideTechnique_vehicule'),
            ou(
              getValueList(computed.attentesTypeAide, ['humain', 'materiel', 'amenagement', 'financierHandicap'])
            )
          ]),
          ou([
            ou( getValueList(computed.besoinsVie, ['habits', 'repas']) ),
            ou( getValueList(computed.besoinsSocial, ['securite', 'proches', 'communication']) ),
            ou( getValueList(computed.besoinsDeplacement, ['intraDomicile', 'public', 'accesDomicile']) )
          ]),
        ]),
        et([
          getValue(computed.attentesTypeAide, 'humain'),
          ou([
            ou( getValueList(computed.besoinsVie, ['habits', 'repas']) ),
            getValue(computed.besoinsDeplacement, 'intraDomicile')
          ]),
        ]),
        et([
          et( getValueList(computed.besoinsVie, ['cuisine', 'budget', 'courses', 'menage', 'sante']) ),
          et( getValueList(computed.besoinsSocial, ['securite', 'proches', 'loisirs', 'citoyen']) )
        ]),
        et([
          et( getValueList(computed.besoinsVie, ['habits', 'repas', 'hygiene']) ),
          getValue(computed.besoinsDeplacement, 'public' ),
          getValue(computed.attentesTypeAide, 'materiel')
        ])
      ])
    ]);
  } else if (computed.estAdulte && computed.aMoinsDe76Ans) {
    return et([
      ou([
        getValue(computed.aideTechnique, 'aideTechnique_vehicule'),
        ou(
          getValueList(computed.attentesTypeAide, ['humain', 'materiel', 'amenagement', 'financierHandicap'])
        )
      ]),
      ou([
        getValue(computed.pensionInvalidite, 'mtp'),
        getValue(computed.pensionInvalidite, 'pcrtp'),
        ou([
          ou( getValueList(computed.besoinsVie, ['hygiene', 'habits', 'repas']) ),
          ou( getValueList(computed.besoinsSocial, ['securite', 'proches', 'communication']) ),
          ou( getValueList(computed.besoinsDeplacement, ['intraDomicile', 'public', 'accesDomicile']) )
        ]),
      ])
    ]);
  } else {
    return ou([
      getValue(computed.vieAuTravail, 'conditionTravail'),
      // estRenouvellement({id: 'ac'})
    ]);
  }
}

