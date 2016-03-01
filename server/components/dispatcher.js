'use strict';

const async = require('async');

const DispatchRuleModel = require('../api/dispatch-rule/dispatch-rule.model');
const SecteurModel = require('../api/secteur/secteur.model');
const MdphModel = require('../api/mdph/mdph.model');
const MailActions = require('../api/send-mail/send-mail-actions');
const Bluebird = require('bluebird');

function sendMailToSecteur(request, secteur) {
  let type = request.getType();
  let evaluators = (secteur.evaluators && secteur.evaluators[type]) || [];

  evaluators.forEach(function(evaluator) {
    MailActions.sendMailNotificationAgent(request, evaluator.email);
  });

  return secteur;
}

function findRequestMdph(request) {
  return MdphModel.findOne({zipcode: request.mdph});
}

function findDispatchRule(mdph, request) {
  let codePostal = request.getCodePostal();
  return DispatchRuleModel.findOne({'commune.codePostal': codePostal, mdph: mdph});
}

function findSecteurOrDefault(request, dispatchRule, mdph) {
  let type = request.getType();

  if (!dispatchRule) {
    // Get default sector
    return SecteurModel.findOne({default: true, mdph: mdph}).populate('evaluators.' + type);
  } else {
    return SecteurModel.findById(dispatchRule.secteur[type]).populate('evaluators.' + type);
  }
}

function findSecteur(request) {
  return Bluebird.using(findRequestMdph(request), mdph => {
    return findDispatchRule(mdph, request)
      .then(dispatchRule => findSecteurOrDefault(request, dispatchRule, mdph));
  });
}

function dispatch(request, done) {
  findSecteur(request)
    .then(secteur => sendMailToSecteur(request, secteur))
    .then(secteur => done(null, secteur))
    .catch(err => done(err));
}

module.exports = {
  dispatch: dispatch
};
