'use strict';

import SecteurModel from '../api/secteur/secteur.model';
import MdphModel from '../api/mdph/mdph.model';
import UserModel from '../api/user/user.model';
import * as MailActions from '../api/send-mail/send-mail-actions';

// TODO
function sendMailToEvaluators(request) {
  request.evaluators.forEach((evaluator) => MailActions.sendMailNotificationAgent(request, evaluator.email));
  return request;
}

function findRequestMdph(request) {
  return MdphModel.findOne({zipcode: request.mdph}).then(mdph => ({request, mdph}));
}

function hasIntersection(arrayA, arrayB) {
  let found = false;
  arrayA.forEach(a => {
    if (found) return;
    found = arrayB.includes(a);
  });

  return found;
}

function findEvaluators(options) {
  const {request, mdph, secteurs} = options;
  return UserModel
    .find({mdph: mdph._id, role: 'adminMdph'})
    .then(users => {
      const type = request.getType();
      const secteursId = secteurs.map(secteur => secteur._id.toString());

      const evaluators = users.filter((user) => {
        const userSecteursId = user.secteurs ? user.secteurs.map(secteur => secteur.toString()) : [];
        const isSpecialisedInRequestType = user.specialisation[type];

        return isSpecialisedInRequestType && hasIntersection(userSecteursId, secteursId)
      });

      options.evaluators = evaluators;
      return options;
    });
}

function linkRequestToEvaluators(options) {
  console.log("options : ", options);
  const {request, evaluators} = options;
  console.log("request : ", request);
  console.log("evaluators : ", evaluators);
  return request.set('evaluators', evaluators)
    .save()
    .then(sendMailToEvaluators);
}

function findSecteur({request, mdph}) {
  return SecteurModel.find({communes: request.getCodePostal()}).then(secteurs => ({secteurs, request, mdph}));
}

function dispatch(request) {
  return findRequestMdph(request)
    .then(findSecteur)
    .then(findEvaluators)
    .then(linkRequestToEvaluators);
}

module.exports = {
  dispatch,
  findSecteur,
  findRequestMdph,
  findEvaluators
};
