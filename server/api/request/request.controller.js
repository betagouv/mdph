'use strict';

import { populateAndSortPrestations } from '../prestation/prestation.controller';
import { populateAndSortDocumentTypes } from '../document-type/document-type.controller';

import _ from 'lodash';
import path from 'path';
import pdf from 'html-pdf';
import fs from 'fs';
import shortid from 'shortid';
import async from 'async';
import * as Auth from '../../auth/auth.service';
import config from '../../config/environment';
import Recapitulatif from '../../components/recapitulatif';
import Synthese from '../../components/synthese';
import MakePdf from '../../components/make-pdf';

import Prestation from '../prestation/prestation.controller';
import Request from './request.model';
import User from '../user/user.model';
import Partenaire from '../partenaire/partenaire.model';
import Mdph from '../mdph/mdph.model';
import MailActions from '../send-mail/send-mail-actions';

import Dispatcher from '../../components/dispatcher';
import ActionModel from './action.model';
import {actions, actionsById} from '../../components/actions';
import resizeAndMove from '../../components/resize-image';

const domain = process.env.DOMAIN || config.DOMAIN;

function handleError(req, res) {
  return function(statusCode, err) {
    statusCode = statusCode || 500;

    if (err) {
      req.log.error(err);
      res.status(statusCode).send(err);
    } else {
      res.status(statusCode).send('Server error');
    }
  };
}

function handleEntityNotFound(res) {
  return function(request) {
    if (!request) {
      throw(404);
    }

    return request;
  };
}

function handleUserNotAuthorized(req, res) {
  return function(request) {

    if (Auth.meetsRequirements(req.user.role, 'adminMdph')) {
      return request;
    }

    if (req.user._id.equals(request.user._id)) {
      return request;
    }

    throw(403);
  };
}

function unlinkRequestDocuments() {
  return function(request) {
    if (request.documents && Array.isArray(request.documents)) {
      request.documents.forEach(function(requestDoc) {
        fs.unlink(requestDoc.path);
      });
    }
  };
}

function removeRequest() {
  return function(request) {
    return request.remove().exec();
  };
}

function saveUpdates(req) {
  return function(request) {
    let filteredUpdates = _.omit(req.body, '_id', 'user', '__v', 'documents', 'detailPrestations');
    return request.set(filteredUpdates).save().then(updated => {
      updated.saveActionLog(actions.UPDATE_ANSWERS, req.user, req.log);

      return updated;
    });
  };
}

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(request) {
    res.status(statusCode).json(request);
    return null;
  };
}

function saveUserAction(req) {
  return function(request) {
    if (req.action) {
      ActionModel.create({
        action: req.action.id,
        request: request._id,
        user: req.user._id,
        date: Date.now(),
        params: req.action
      });
    }

    return request;
  };
}

function processUserAction(req) {
  return function(request) {
    if (req.action) {
      switch (req.action.id) {
        case actions.SUCCES_ENREGISTREMENT.id:
          MailActions.sendMailCompletude(request, req.user); // Agent sends KO to user
          break;
        case actions.ERREUR_ENREGISTREMENT.id:
          MailActions.sendMailDemandeDocuments(request, req.user); // Agent sends OK to user
          break;
        case actions.SUBMIT.id:
          let options = {
            request: request,
            host: req.headers.host,
            user: req.user,
            email: req.user.email
          };

          MailActions.sendMailReceivedTransmission(options); // Service sends summary to user

          Dispatcher.dispatch(request)
            .then(secteur => { // Service disatches to agents
              request.saveActionLog(actions.ASSIGN_SECTOR, req.user, req.log, {secteur: secteur.name});
              request.set('secteur', secteur).save();
            })
            .catch(err => {
              req.log.err(err);
            });

          break;
        default:
          console.log('Action not found');
      }
    }

    return request;
  };
}

function saveActionLog(action, req) {
  return function(request) {
    request.saveActionLog(action, req.user, req.log);
  };
}

function findAndPopulate(shortId) {
  return Request
    .findOne({shortId: shortId})
    .populate('user')
    .populate('evaluator')
    .exec();
}

// Get a single request
export function show(req, res, next) {
  findAndPopulate(req.params.shortId)
    .then(handleEntityNotFound(res))
    .then(handleUserNotAuthorized(req, res))
    .then(populateAndSortPrestations)
    .then(populateAndSortDocumentTypes)
    .then(respondWithResult(res))
    .catch(handleError(req, res));
}

// Get a single request
export function showPartenaire(req, res, next) {
  Request
    .findOne({
      shortId: req.params.shortId
    })
    .populate('user', 'name')
    .select('shortId user name mdph createdAt')
    .exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(req, res));
}

// Deletes a request from the DB and FS
export function destroy(req, res) {
  Request
    .findOne({
      shortId: req.params.shortId
    })
    .then(handleEntityNotFound(res))
    .then(handleUserNotAuthorized(req, res))
    .then(unlinkRequestDocuments)
    .then(removeRequest)
    .then(respondWithResult(res, 204))
    .catch(handleError(req, res));
}

/**
 * Get user requests
 */
export function showUserRequests(req, res, next) {
  Request.find({
    user: req.user._id
  })
  .select('shortId mdph updatedAt createdAt status')
  .populate('user', 'name')
  .sort('-updatedAt')
  .then(respondWithResult(res))
  .catch(handleError(req, res));
}

export function update(req, res, next) {
  findAndPopulate(req.params.shortId)
    .then(handleEntityNotFound(res))
    .then(handleUserNotAuthorized(req, res))
    .then(saveUpdates(req))
    .then(processUserAction(req))
    .then(saveUserAction(req))
    .then(populateAndSortPrestations)
    .then(populateAndSortDocumentTypes)
    .then(respondWithResult(res))
    .catch(handleError(req, res));
}

/**
 * Create request
 */
export function create(req, res, next) {
  Request.create(req.body)
    .then(respondWithResult(res, 201))
    .then(saveActionLog(actions.CREATION, req))
    .catch(handleError(res));
}

function findActionHistory() {
  return function(request) {
    return ActionModel
      .find({
        request: request._id
      })
      .populate('user')
      .sort('-date')
      .lean()
      .exec()
      .then(populateActionLabels());
  };
}

function populateActionLabels() {
  return function(actionHistory) {
    actions.forEach(function(action) {
      action.label = actionsById[action.action].label;
    });

    return actions;
  };
}

export function getHistory(req, res) {
  Request
    .findOne({
      shortId: req.params.shortId
    })
    .then(handleEntityNotFound(res))
    .then(handleUserNotAuthorized(req, res))
    .then(findActionHistory())
    .then(respondWithResult(res))
    .catch(handleError(req, res));
}

function generateRecapitulatifHtml(req) {
  return function(request) {
    Recapitulatif.answersToHtml({
      request: req.request,
      host: req.headers.host
    });
  };
}

function respondWithFile(res) {
  return function(pdfPath) {
    res.sendFile(pdfPath);
  };
}

function generateRecapitulatifPdf(req) {
  return function(request) {
    MakePdf.make({
      request: req.request,
      host: req.headers.host,
      user: req.user
    }, function(err, html) {
      if (err) { throw(500, err); }

      return html;
    });
  };
}

export function getRecapitulatif(req, res) {
  Request
    .findOne({
      shortId: req.params.shortId
    })
    .then(handleEntityNotFound(res))
    .then(handleUserNotAuthorized(req, res))
    .then(generateRecapitulatifHtml(req))
    .then(respondWithResult(res))
    .catch(handleError(req, res));
}

export function getPdf(req, res) {
  Request
    .findOne({
      shortId: req.params.shortId
    })
    .then(handleEntityNotFound(res))
    .then(handleUserNotAuthorized(req, res))
    .then(generateRecapitulatifPdf(req))
    .then(respondWithFile(res))
    .catch(handleError(req, res));
}

function generateSynthesePdf(req, res) {
  return function(request) {
    Synthese.answersToHtml(request, req.headers.host, 'pdf', function(err, html) {
        if (err) { throw(500, err); }

        pdf.create(html).toStream(function(err, stream) {
          stream.pipe(res);
        });
      });
  };
}

export function getSynthesePdf(req, res) {
  Request
    .findOne({
      shortId: req.params.shortId
    })
    .then(handleEntityNotFound(res))
    .then(handleUserNotAuthorized(req, res))
    .then(generateSynthesePdf(req, res))
    .catch(handleError(req, res));
}
