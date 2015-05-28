'use strict';

var moment = require('moment');
var _ = require('lodash');
var Prestation = require('./prestation.constants');

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

function isAdult(identites) {
  var now = moment().startOf('day');
  if (!identites.beneficiaire || !identites.beneficiaire.dateNaissance) {
    return true;
  }
  return now.diff(identites.beneficiaire.dateNaissance, 'years') >= 20;
}

function isLessThan62(identites) {
  var now = moment().startOf('day');
  if (!identites.beneficiaire || !identites.beneficiaire.dateNaissance) {
    return true;
  }

  return now.diff(identites.beneficiaire.dateNaissance, 'years') < 62;
}


function getCallbacks(answers) {
  var identites = getSection(answers, 'identites');
  var aidant = getSection(answers, 'aidant');
  var vieQuotidienne = getSection(answers, 'vie_quotidienne');
  var prestations = getSection(answers, 'prestations');
  var situationsParticulieres = getSection(answers, 'situations_particulieres');
  var vieAuTravail = getSection(answers, 'vie_au_travail');


  var besoinsDeplacement = getValue(vieQuotidienne, 'besoinsDeplacement');
  var besoinsVie = getValue(vieQuotidienne, 'besoinsVie');
  var besoinsSocial = getValue(vieQuotidienne, 'besoinsSocial');
  var attentesTypeAide = getValue(vieQuotidienne, 'attentesTypeAide');
  var pensionInvalidite = getValue(vieQuotidienne, 'pensionInvalidite');
  var aideTechnique = getValue(vieQuotidienne, 'aideTechnique');
  var attentesAidant = getValue(aidant, 'typeAttente');
  var natureAideAidant = getValue(aidant, 'natureAide');
  var urgences = getValue(situationsParticulieres, 'urgences');

  var estAdulte = isAdult(identites);
  var estEnfant = !estAdulte;
  var aMoinsDe62Ans = isLessThan62(identites);

  var ou = _.some;
  var et = _.every;

  function estRenouvellement(presta) {
    return prestations && prestations[presta.id];
  }

  var estNonActif = et([
    aMoinsDe62Ans,
    ou([
      false === getValue(vieAuTravail, 'conditionTravail'),
      et([
        getValue(vieAuTravail, 'conditionTravail'),
        false === getValue(vieAuTravail, 'temps'),
        false === getValue(vieAuTravail, 'adapte')
      ])
    ])
  ]);

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
      if (estRenouvellement(droit)) {
        return true;
      }

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
      if (estRenouvellement(droit)) {
        return true;
      }

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
      return _.every([
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
    ac: function(droit) {
      if (estRenouvellement(droit)) {
        return true;
      } else {
        return false;
      }
    },
    pps: function(droit) {
      if (estRenouvellement(droit)) {
        return true;
      }
      return vieQuotidienne && vieQuotidienne.ecole;
    },
    orp: function(droit) {
      if (estRenouvellement(droit)) {
        return true;
      }
      return vieQuotidienne && _.some([vieQuotidienne.travail, vieQuotidienne.formation]);
    },
    pch: function(droit) {
      if (estRenouvellement(droit) || estRenouvellement({id: 'ac'})) {
        return true;
      }

      var auMoinsUneAttente = function() {
        return _.some([
          attentesTypeAide && _.some([
            attentesTypeAide.humain,
            attentesTypeAide.materiel,
            attentesTypeAide.amenagement,
            attentesTypeAide.financierHandicap]),
          besoinsDeplacement && besoinsDeplacement.vehicule,
          aidant && aidant.typeAttente && _.some([
            aidant.typeAttente.finance,
            aidant.typeAttente.imprevu,
            aidant.typeAttente.vacances,
            aidant.typeAttente.professionnel
          ])
        ]);
      };

      var auMoinsUnBesoin = function() {
        return _.some([
          besoinsVie && _.some([besoinsVie.hygiene, besoinsVie.habits, besoinsVie.repas]),
          besoinsDeplacement && _.some([besoinsDeplacement.intraDomicile, besoinsDeplacement.public, besoinsDeplacement.accesDomicile]),
          besoinsSocial && _.some([besoinsSocial.proches, besoinsSocial.securite, besoinsSocial.communication]),
        ]);
      };

      var pchEnfant = function() {
        return auMoinsUneAttente() && auMoinsUnBesoin();
      };

      var pchAdulte = function() {
        return auMoinsUneAttente() && auMoinsUnBesoin();
      };

      return estEnfant && pchEnfant() || estAdulte && pchAdulte();
    },
    sms: function(droit) {
      if (estRenouvellement(droit)) {
        return true;
      }

      var besoinAidant = function() {
        return aidant && _.every([
          aidant.typeAttente && _.some([aidant.typeAttente.repos, aidant.typeAttente.professionnel]),
          aidant.natureAide && _.some([
            aidant.natureAide.surveillance,
            aidant.natureAide.juridique,
            aidant.natureAide.deplacementExterieur,
            aidant.natureAide.finances,
            aidant.natureAide.logement,
            aidant.natureAide.loisirs,
            aidant.natureAide.social,
            aidant.natureAide.repasPreparation,
            aidant.natureAide.medical
          ])
        ]);
      };

      var besoinsVieQuotidienne = function() {
        return _.every([
          vieQuotidienne && vieQuotidienne.domicile,
          attentesTypeAide && _.every([attentesTypeAide.domicile, attentesTypeAide.humain]),
          _.some([
            besoinsSocial && _.some([besoinsSocial.loisirs, besoinsSocial.proches, besoinsSocial.citoyen]),
            besoinsVie && _.some([besoinsVie.sante, besoinsVie.budget])
          ])
        ]);
      };

      return _.every([
        estAdulte,
        _.some([
          besoinAidant(),
          besoinsVieQuotidienne()
        ])
      ]);
    },
    rqth: function(droit) {
      if (estRenouvellement(droit)) {
        return true;
      }
      return vieQuotidienne && _.some([vieQuotidienne.travail, vieQuotidienne.formation]);
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
