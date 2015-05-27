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
  var vieAuTravail = getSection(answers, 'vie_au_travail');

  var besoinsDeplacement = getValue(vieQuotidienne, 'besoinsDeplacement');
  var besoinsVie = getValue(vieQuotidienne, 'besoinsVie');
  var besoinsLieuDeVie = getValue(vieQuotidienne, 'besoinsLieuDeVie');
  var besoinsSocial = getValue(vieQuotidienne, 'besoinsSocial');
  var attentesTypeAide = getValue(vieQuotidienne, 'attentesTypeAide');
  var pensionInvalidite = getValue(vieQuotidienne, 'pensionInvalidite');

  var attentesAidant = getValue(aidant, 'typeAttente');
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
        false === getValue(vieAuTravail, 'temps'),
        false === getValue(vieAuTravail, 'adapte')
      ])
    ])
  ]);

  return {
    aah: function(droit) {
      return et([
        estAdulte,
        ou( [besoinsVie && besoinsVie.courant, attentesTypeAide && attentesTypeAide.financierMinimum] ),
        ou([
          pensionInvalidite && pensionInvalidite.mtp,
          pensionInvalidite && pensionInvalidite.pcrtp,
          et( [besoinsVie && besoinsVie.hygiene, attentesTypeAide && attentesTypeAide.humain] ),
          et( [besoinsVie && besoinsVie.habits, attentesTypeAide && attentesTypeAide.humain] ),
          et( [besoinsVie && besoinsVie.repas, attentesTypeAide && attentesTypeAide.humain] ),
          et( [besoinsDeplacement && besoinsDeplacement.intraDomicile, attentesTypeAide && attentesTypeAide.humain] ),
          et([
            et( getValueList(besoinsVie, ["habits","cuisine","repas","budget","courses","menage","sante"]) ),
            et( getValueList(besoinsSocial, ["securite","proches","loisirs","citoyen"]) ),
            aMoinsDe62Ans,
            ou([
              vieAuTravail && vieAuTravail.conditionTravail === false,
              vieAuTravail && vieAuTravail.conditionTravail && vieAuTravail.temps === false && vieAuTravail.adapte === false
            ])
          ]),
          et([
            besoinsVie && besoinsVie.hygiene && besoinsVie.habits && besoinsVie.repas,
            besoinsDeplacement && besoinsDeplacement.deplacementExterieur,
            attentesTypeAide && attentesTypeAide.materiel,
            aMoinsDe62Ans,
            ou([
              vieAuTravail && vieAuTravail.conditionTravail === false,
              vieAuTravail && vieAuTravail.conditionTravail && vieAuTravail.temps === false && vieAuTravail.adapte === false
            ])
          ])
        ])
      ]);
    },
    aeeh: function(droit) {
      if (estRenouvellement(droit)) {
        return true;
      }

      return et([
        estEnfant,
        ou( getValueList(attentesTypeAide, ['financierMinimum', 'financierHandicap', 'humain', 'materiel', 'amenagement']) ),
        ou([
          et([
            getValue(attentesTypeAide, 'humain'),
            ou([
              ou( getValueList(besoinsVie, ['hygiene', 'habits', 'repas']) ),
              getValue(besoinsDeplacement, 'intraDomicile')
            ]),
          ]),
          et([
            getValue(besoinsSocial, 'securite'),
            et([
              et( getValueList(besoinsSocial, ['proches', 'loisirs', 'citoyen']) ),
              et( getValueList(besoinsVie, ['budget', 'courses', 'cuisine', 'menage', 'sante']) ),
              estNonActif
            ])
          ]),
          et([
            getValue(besoinsLieuDeVie, 'materiel'),
            et([
              et( getValueList(besoinsVie, ['hygiene', 'habits', 'repas']) ),
              getValue(besoinsDeplacement, 'public'),
              estNonActif
            ])
          ])
        ])
      ]);
    },
    av: function(droit) {
      // Assurance vieillesse
      if (estRenouvellement(droit)) {
        return true;
      }

      return ou([
        getValue(attentesAidant, 'vieillesse'),
        et([
          getValue(aidant, 'emploiDetail'),
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
        getValue(besoinsDeplacement, 'intraDomicile')
      ]);
    },
    carteStationnement: function(droit) {
      if (estRenouvellement(droit)) {
        return true;
      }

      return ou([
        getValue(besoinsDeplacement, 'intraDomicile'),
        et([
          getValue(attentesTypeAide, 'humain'),
          getValue(besoinsDeplacement, 'public')
        ]),
        et([
          getValue(attentesTypeAide, 'humain'),
          getValue(attentesTypeAide, 'mobilite')
        ]),
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
    ems: function(droit) {
      if (estRenouvellement(droit)) {
        return true;
      }

      var besoinAidant = function() {
        return aidant && _.every([
          aidant.typeAttente && _.some([aidant.typeAttente.imprevu, aidant.typeAttente.vacances, aidant.typeAttente.professionnel]),
          aidant.natureAide && _.some([
            aidant.natureAide.surveillance,
            aidant.natureAide.deplacementInterieur,
            aidant.natureAide.deplacementExterieur,
            aidant.natureAide.loisirs,
            aidant.natureAide.hygiene,
            aidant.natureAide.social,
            aidant.natureAide.repasPrise
          ])
        ]);
      };

      var besoinsVieQuotidienne = function() {
        return _.every([
          besoinsSocial && _.every([besoinsSocial.loisirs, besoinsSocial.securite, besoinsSocial.proches]),
          _.some([
            besoinsVie && _.some(besoinsVie.hygiene, besoinsVie.habits, besoinsVie.repas),
            besoinsDeplacement && besoinsDeplacement.intraDomicile
          ])
        ]);
      };

      return _.every([
        estAdulte,
        _.some([
          attentesTypeAide && attentesTypeAide.etablissement,
          vieQuotidienne && _.some([vieQuotidienne.domicile, vieQuotidienne.etablissement]),
          besoinAidant(),
          besoinsVieQuotidienne()
        ])
      ]);
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
