'use strict';

var moment = require('moment');
var _ = require('lodash');
var DateUtils = require('../../components/dateUtils');
var Prestation = require('./prestation.constants');

var ou = _.some;
var et = _.every;

function getSection(answers, sectionModel) {
  var result = _.result(answers, sectionModel);
  return result ? result : {};
}

function getValue(question, answerModel) {
  var answer = _.result(question, answerModel);
  return answer ? answer : false;
}

function getValueList(question, answerModelList) {
  var resultList = [];
  _.forEach(answerModelList, function(model) {
    var answer = _.result(question, model);
    if (answer) {
      resultList.push(answer);
    } else {
      resultList.push(false);
    }
  });
  return resultList;
}

function getCallbacks(answers) {
  // Shortcuts to sections
  var identites = getSection(answers, 'identites');
  var aidant = getSection(answers, 'aidant');
  var vieQuotidienne = getSection(answers, 'vie_quotidienne');
  var prestations = getSection(answers, 'prestations');
  var situationsParticulieres = getSection(answers, 'situations_particulieres');
  var vieAuTravail = getSection(answers, 'vie_au_travail');
  var vieScolaire = getSection(answers, 'vie_scolaire');

  // Shortcuts to answers
  var besoinsDeplacement = getValue(vieQuotidienne, 'besoinsDeplacement');
  var besoinsVie = getValue(vieQuotidienne, 'besoinsVie');
  var besoinsSocial = getValue(vieQuotidienne, 'besoinsSocial');
  var attentesTypeAide = getValue(vieQuotidienne, 'attentesTypeAide');
  var pensionInvalidite = getValue(vieQuotidienne, 'pensionInvalidite');
  var aideTechnique = getValue(vieQuotidienne, 'aideTechnique');
  var aidePersonne = getValue(vieQuotidienne, 'aidePersonne');
  var attentesVieScolaire = getValue(vieScolaire, 'attentesVieScolaire');
  var attentesAidant = getValue(aidant, 'typeAttente');
  var natureAideAidant = getValue(aidant, 'natureAide');
  var urgences = getValue(situationsParticulieres, 'urgences');
  var besoinSoutienAuTravail = getValue(vieAuTravail, 'besoinSoutien');
  var conservationTravail = getValue(vieAuTravail, 'conservation');

  // Initialize age variables
  var estAdulte = DateUtils.isAdult(answers);
  var estEnfant = !estAdulte;
  var aMoinsDe62Ans = DateUtils.isLessThan(answers, 62);
  var aPlusDe15Ans = DateUtils.isMoreThan(answers, 15);
  var aMoinsDe76Ans = DateUtils.isLessThan(answers, 76);

  function estRenouvellement(presta) {
    return prestations && prestations[presta.id];
  }

  var estNonActif = ou([
    false === getValue(vieAuTravail, 'conditionTravail'),
    et([
      getValue(vieAuTravail, 'conditionTravail'),
      false === getValue(vieAuTravail, 'temps'),
      false === getValue(vieAuTravail, 'adapte')
    ])
  ]);

  function rqthOrOrp() {
    return ou([
      getValue(urgences, 'travail'),
      getValue(urgences, 'formation'),
      getValue(besoinSoutienAuTravail, 'precisions'),
      getValue(conservationTravail, 'medecineTravail'),
      getValue(conservationTravail, 'sameth'),
      getValue(vieAuTravail, 'amenagement'),
      // renouvellement aah,
      et([
        getValue(aidePersonne, 'aidePersonne_medicoSociale'),
        getValue(besoinSoutienAuTravail, 'precisions')
      ]),
      et([
        aPlusDe15Ans,
        ou([
          getValue(besoinsVie, 'courant'),
          getValue(attentesTypeAide, 'financierMinimum')
        ]),
        ou([
          getValue(pensionInvalidite, 'mtp'),
          getValue(pensionInvalidite, 'pcrtp'),
          et([
            getValue(attentesTypeAide, 'humain'),
            ou([
              ou( getValueList(besoinsVie, ['hygiene', 'habits', 'repas']) ),
              getValue(besoinsDeplacement, 'intraDomicile')
            ]),
          ]),
          et([
            et( getValueList(besoinsVie, ['habits', 'cuisine', 'repas', 'budget', 'courses', 'menage', 'sante']) ),
            et( getValueList(besoinsSocial, ['securite', 'proches', 'loisirs', 'citoyen']) ),
            estNonActif
          ]),
          et([
            et( getValueList(besoinsVie, ['hygiene', 'habits', 'repas']) ),
            getValue(besoinsDeplacement, 'public'),
            getValue(attentesTypeAide, 'materiel'),
            estNonActif
          ])
        ])
      ])
    ]);
  }

  return {
    aah: function(droit) {
      return et([
        estAdulte,
        ou([
          getValue(besoinsVie, 'courant'),
          getValue(attentesTypeAide, 'financierMinimum')
        ]),
        ou([
          getValue(pensionInvalidite, 'mtp'),
          getValue(pensionInvalidite, 'pcrtp'),
          et([
            getValue(attentesTypeAide, 'humain'),
            ou([
              ou( getValueList(besoinsVie, ['hygiene', 'habits', 'repas']) ),
              getValue(besoinsDeplacement, 'intraDomicile')
            ])
          ]),
          et([
            et( getValueList(besoinsVie, ['habits', 'cuisine', 'repas', 'budget', 'courses', 'menage', 'sante']) ),
            et( getValueList(besoinsSocial, ['securite', 'proches', 'loisirs', 'citoyen']) ),
            estNonActif,
            aMoinsDe62Ans
          ]),
          et([
            et( getValueList(besoinsVie, ['hygiene', 'habits', 'repas']) ),
            getValue(besoinsDeplacement, 'public'),
            getValue(attentesTypeAide, 'materiel')
          ])
        ])
      ]);
    },
    aeeh: function(droit) {
      return et([
        estEnfant,
        ou( getValueList(attentesTypeAide, ['financierMinimum', 'humain', 'materiel', 'amenagement']) ),
        ou([
          et([
            getValue(attentesTypeAide, 'humain'),
            ou([
              ou( getValueList(besoinsVie, ['hygiene', 'habits', 'repas']) ),
              getValue(besoinsDeplacement, 'intraDomicile')
            ]),
          ]),
          et([
            et( getValueList(besoinsSocial, ['securite', 'proches', 'loisirs', 'citoyen']) ),
            et( getValueList(besoinsVie, ['budget', 'courses', 'cuisine', 'menage', 'sante']) ),
          ]),
          et([
            getValue(attentesTypeAide, 'materiel'),
            et( getValueList(besoinsVie, ['hygiene', 'habits', 'repas']) ),
            getValue(besoinsDeplacement, 'public'),
          ])
        ])
      ]);
    },
    av: function(droit) {
      return ou([
        getValue(attentesAidant, 'vieillesse'),
        et([
          getValue(aidant, 'emploi') === 'reductionActivite',
          getValue(aidant, 'vie')
        ])
      ]);
    },
    carteInvalidite: function(droit) {
      return ou([
        et([
          getValue(attentesTypeAide, 'humain'),
          ou( getValueList(besoinsVie, ['hygiene', 'habits', 'repas']) ),
        ]),
        getValue(besoinsDeplacement, 'intraDomicile'),
        getValue(pensionInvalidite, 'mtp'),
        getValue(pensionInvalidite, 'pcrtp')
      ]);
    },
    carteStationnement: function(droit) {
      return ou([
        getValue(aideTechnique, 'aideTechnique_technique'),
        getValue(besoinsDeplacement, 'intraDomicile'),
        et([
          getValue(attentesTypeAide, 'humain'),
          getValue(besoinsDeplacement, 'public')
        ]),
        et([
          getValue(attentesTypeAide, 'humain'),
          getValue(attentesTypeAide, 'mobilite')
        ])
      ]);
    },
    ems: function(droit) {
      return et([
        estAdulte,
        ou([
          getValue(attentesTypeAide, 'etablissement'),
          et([
            getValue(urgences, 'domicile'),
            et( getValueList(besoinsSocial, ['securite', 'proches']) ),
            ou([
              getValue(besoinsSocial, 'loisirs'),
              et([
                getValue(attentesTypeAide, 'humain'),
                ou([
                  ou(getValueList(besoinsVie, ['hygiene', 'habits', 'repas'])),
                  getValue(besoinsDeplacement, 'intraDomicile')
                ])
              ])
            ])
          ]),
          et([
            ou(getValueList(attentesAidant, ['imprevu', 'vacances', 'professionnel'])),
            ou(getValueList(natureAideAidant, ['surveillance', 'deplacementExterieur', 'deplacementInterieur', 'loisirs', 'hygiene', 'social', 'repasPrise']))
          ])
        ])
      ]);
    },
    orp: function(droit) {
      return rqthOrOrp();
    },
    rqth: function(droit) {
      return rqthOrOrp();
    },
    pch: function(droit) {
      if (estEnfant) {
        return et([
          ou(getValueList(attentesTypeAide, ['humain', 'materiel', 'amenagement', 'financierHandicap'])),
          ou([
            et([
              getValue(besoinsVie, 'hygiene'),
              getValue(attentesTypeAide, 'humain'),
              ou([
                getValue(aideTechnique, 'aideTechnique_vehicule'),
                ou(
                  getValueList(attentesTypeAide, ['humain', 'materiel', 'amenagement', 'financierHandicap'])
                )
              ]),
              ou([
                ou( getValueList(besoinsVie, ['habits', 'repas']) ),
                ou( getValueList(besoinsSocial, ['securite', 'proches', 'communication']) ),
                ou( getValueList(besoinsDeplacement, ['intraDomicile', 'public', 'accesDomicile']) )
              ]),
            ]),
            et([
              getValue(attentesTypeAide, 'humain'),
              ou([
                ou( getValueList(besoinsVie, ['habits', 'repas']) ),
                getValue(besoinsDeplacement, 'intraDomicile')
              ]),
            ]),
            et([
              et( getValueList(besoinsVie, ['cuisine', 'budget', 'courses', 'menage', 'sante']) ),
              et( getValueList(besoinsSocial, ['securite', 'proches', 'loisirs', 'citoyen']) )
            ]),
            et([
              et( getValueList(besoinsVie, ['habits', 'repas', 'hygiene']) ),
              getValue(besoinsDeplacement, 'public' ),
              getValue(attentesTypeAide, 'materiel')
            ])
          ])
        ]);
      } else if (estAdulte && aMoinsDe76Ans) {
        return et([
          ou([
            getValue(aideTechnique, 'aideTechnique_vehicule'),
            ou(
              getValueList(attentesTypeAide, ['humain', 'materiel', 'amenagement', 'financierHandicap'])
            )
          ]),
          ou([
            getValue(pensionInvalidite, 'mtp'),
            getValue(pensionInvalidite, 'pcrtp'),
            ou([
              ou( getValueList(besoinsVie, ['hygiene', 'habits', 'repas']) ),
              ou( getValueList(besoinsSocial, ['securite', 'proches', 'communication']) ),
              ou( getValueList(besoinsDeplacement, ['intraDomicile', 'public', 'accesDomicile']) )
            ]),
          ])
        ]);
      } else {
        return ou([
          getValue(vieAuTravail, 'conditionTravail'),
          estRenouvellement({id: 'ac'})
        ]);
      }
    },
    pps: function(droit) {
      return ou([
        ou(getValueList(urgences, ['ecole', 'etablissement'])),
        ou(getValueList(attentesVieScolaire, ['adaptation', 'orientation', 'readaptation', 'etablissementSansHebergement', 'etablissementAvecHebergement']))
      ]);
    },
    sms: function(droit) {
      return et([
        estAdulte,
        ou([
          et([
            ou([
              getValue(urgences, 'domicile'),
              getValue(attentesTypeAide, 'domicile'),
              getValue(attentesTypeAide, 'humain')
            ]),
            ou([
              ou( getValueList(besoinsVie, ['budget', 'sante']) ),
              ou( getValueList(besoinsSocial, ['proches', 'loisirs', 'citoyen']) ),
            ])
          ]),
          et([
            ou( getValueList(attentesAidant, ['repos', 'professionnel']) ),
            et( getValueList(['surveillance', 'juridique', 'deplacementExterieur', 'finances', 'logement', 'loisirs', 'social',
              'repasPreparation', 'medical']) )
          ])
        ])
      ]);
    },
    ac: function(droit) {
      if (estRenouvellement(droit)) {
        return true;
      } else {
        return false;
      }
    }
  };
}

exports.simulate = function(answers) {
  var callbacks = getCallbacks(answers);

  var result = _.filter(Prestation.all, function(prestation) {
    var callback = callbacks[prestation.id];
    return callback && callback(prestation);
  });

  return result;
};

exports.index = function(req, res) {
  return res.json(Prestation.all);
};
