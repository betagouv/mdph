'use strict';

var moment = require('moment');
var _ = require('lodash');
var DateUtils = require('../../components/dateUtils');
var Utils = require('./utils');
var prestations = require('./prestations.json');

var AAH = require('./aah');
var AEEH = require('./aeeh');
var AV = require('./av');
var CarteInvalidite = require('./carteInvalidite');
var CarteStationnement = require('./carteStationnement');
var EMS = require('./ems');
var ORP_RQTH = require('./orp_rqth');
var PCH = require('./pch');
var PPS = require('./pps');
var SMS = require('./sms');

var ou = Utils.ou;
var et = Utils.et;
var getValue = Utils.getValue;
var getValueList = Utils.getValueList;
var getSection = Utils.getSection;

var isAdult = DateUtils.isAdult;
var isLessThan = DateUtils.isLessThan;
var isMoreThan = DateUtils.isMoreThan;

function computeAnswers(answers) {
  // Shortcuts to sections
  var identites =                 getSection(answers, 'identites');
  var aidant =                    getSection(answers, 'aidant');
  var vieQuotidienne =            getSection(answers, 'vie_quotidienne');
  var situationsParticulieres =   getSection(answers, 'situations_particulieres');
  var vieAuTravail =              getSection(answers, 'vie_au_travail');
  var vieScolaire =               getSection(answers, 'vie_scolaire');

  // Shortcuts to answers
  var besoinsDeplacement =        getValue(vieQuotidienne, 'besoinsDeplacement');
  var besoinsVie =                getValue(vieQuotidienne, 'besoinsVie');
  var besoinsSocial =             getValue(vieQuotidienne, 'besoinsSocial');
  var attentesTypeAide =          getValue(vieQuotidienne, 'attentesTypeAide');
  var aideFinancierePresent =     getValue(vieQuotidienne, 'aideFinancierePresent');
  var pensionInvalidite =         getValue(vieQuotidienne, 'pensionInvalidite');
  var aideTechnique =             getValue(vieQuotidienne, 'aideTechnique');
  var aidePersonne =              getValue(vieQuotidienne, 'aidePersonne');
  var attentesVieScolaire =       getValue(vieScolaire, 'attentesVieScolaire');
  var attentesAidant =            getValue(aidant, 'typeAttente');
  var natureAideAidant =          getValue(aidant, 'natureAide');
  var urgences =                  getValue(situationsParticulieres, 'urgences');
  var besoinSoutienAuTravail =    getValue(vieAuTravail, 'besoinSoutien');
  var conservationTravail =       getValue(vieAuTravail, 'conservation');
  var milieuTravail =             getValue(vieAuTravail, 'milieuTravail');

  // Initialize age variables
  var estAdulte =       isAdult(answers);
  var aMoinsDe62Ans =   isLessThan(answers, 62);
  var aPlusDe15Ans =    isMoreThan(answers, 15);
  var aMoinsDe76Ans =   isLessThan(answers, 76);
  var estEnfant =       !estAdulte;

  var estNonActif = ou([
    getValue(vieAuTravail, 'conditionTravail') === false,
    et([
      getValue(vieAuTravail, 'conditionTravail'),
      getValue(vieAuTravail, 'temps') === false,
      getValue(vieAuTravail, 'adapte') === false
    ])
  ]);

  var computed = {
    estAdulte: estAdulte,
    estEnfant: estEnfant,
    aMoinsDe62Ans: aMoinsDe62Ans,
    aPlusDe15Ans: aPlusDe15Ans,
    aMoinsDe76Ans: aMoinsDe76Ans,

    estNonActif: estNonActif,

    identites: identites,
    aidant: aidant,
    vieQuotidienne: vieQuotidienne,
    situationsParticulieres: situationsParticulieres,
    vieAuTravail: vieAuTravail,
    vieScolaire: vieScolaire,

    besoinsDeplacement: besoinsDeplacement,
    besoinsVie: besoinsVie,
    besoinsSocial: besoinsSocial,
    attentesTypeAide: attentesTypeAide,
    pensionInvalidite: pensionInvalidite,
    aideTechnique: aideTechnique,
    aidePersonne: aidePersonne,
    attentesVieScolaire: attentesVieScolaire,
    attentesAidant: attentesAidant,
    natureAideAidant: natureAideAidant,
    urgences: urgences,
    besoinSoutienAuTravail: besoinSoutienAuTravail,
    conservationTravail: conservationTravail,
    milieuTravail: milieuTravail,
    aideFinancierePresent: aideFinancierePresent
  };

  return computed;
}

function getCallbacks(answers) {

  var computed = computeAnswers(answers);

  return {
    aah: function() {
      return AAH.simulate(computed);
    },

    aeeh: function() {
      return AEEH.simulate(computed);
    },

    av: function() {
      return AV.simulate(computed);
    },

    carteInvalidite: function() {
      return CarteInvalidite.simulate(computed);
    },

    carteStationnement: function() {
      return CarteStationnement.simulate(computed);
    },

    ems: function() {
      return EMS.simulate(computed);
    },

    orp: function() {
      return ORP_RQTH.simulate(computed);
    },

    rqth: function() {
      return ORP_RQTH.simulate(computed);
    },

    pch: function() {
      return PCH.simulate(computed);
    },

    pps: function() {
      return PPS.simulate(computed);
    },

    sms: function() {
      return SMS.simulate(computed);
    }
  };
}

exports.simulate = function(answers) {
  var callbacks = getCallbacks(answers);

  var result = _.filter(prestations, function(prestation) {
    var callback = callbacks[prestation.id];
    return callback && callback();
  });

  return result;
};

exports.index = function(req, res) {
  return res.json(prestations);
};
