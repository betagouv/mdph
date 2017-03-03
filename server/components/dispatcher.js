'use strict';

import Bluebird from 'bluebird';
import DispatchRuleModel from '../api/dispatch-rule/dispatch-rule.model';
import SecteurModel from '../api/secteur/secteur.model';
import MdphModel from '../api/mdph/mdph.model';
import * as MailActions from '../api/send-mail/send-mail-actions';

function sendMailToSecteur(request, secteur) {
  if (secteur) {
    let type = request.getType();
    let evaluators = (secteur.evaluators && secteur.evaluators[type]) || [];

    evaluators.forEach(function(evaluator) {
      MailActions.sendMailNotificationAgent(request, evaluator.email);
    });
  }

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

function handleSecteurNotFound(secteur) {
  if (!secteur) {
    throw new Error('Not found');
  }

  return secteur;
}

function dispatch(request) {
  return findSecteur(request)
    .then(handleSecteurNotFound)
    .then(secteur => sendMailToSecteur(request, secteur));
}

module.exports = {
  dispatch: dispatch
};
