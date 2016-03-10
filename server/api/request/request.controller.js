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

    return null;
  };
}

function unlinkRequestDocuments(req) {
  return new Promise(function(resolve, reject) {
    if (req.request.documents && Array.isArray(req.request.documents)) {
      req.request.documents.forEach(function(requestDoc) {
        if (requestDoc.path) {
          fs.unlink(requestDoc.path);
        }
      });
    }

    return resolve();
  });
}

function removeRequest() {
  return function(request) {
    return request.remove().exec();
  };
}

function saveUpdates(req) {
  return new Promise(function(resolve, reject) {
    let filteredUpdates = _.omit(req.body, '_id', 'user', '__v', 'documents', 'detailPrestations');

    req.request.set(filteredUpdates).save(function(err, updated) {
      if (err) {
        return reject(err);
      }

      updated.saveActionLog(actions.UPDATE_ANSWERS, req.user, req.log);
      return resolve(updated);
    });
  });
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
    if (req.query) {
      switch (req.query.id) {
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

// Get a single request
export function show(req, res, next) {
  populateAndSortPrestations(req.request)
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
    .then(respondWithResult(res))
    .catch(handleError(req, res));
}

// Deletes a request from the DB and FS
export function destroy(req, res) {
  unlinkRequestDocuments()
    .then(removeRequest())
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
  saveUpdates(req)
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

function findActionHistory(req) {
  return ActionModel
    .find({
      request: req.request._id
    })
    .populate('user')
    .sort('-date')
    .lean()
    .exec()
    .then(populateActionLabels);
}

function populateActionLabels(actions) {
  return new Promise(function(resolve) {
    actions.forEach(function(action) {
      action.label = actionsById[action.action].label;
    });

    return resolve(actions);
  });
}

export function getHistory(req, res) {
  findActionHistory(req)
    .then(respondWithResult(res))
    .catch(handleError(req, res));
}

function respondWithFile(res) {
  return function(pdfPath) {
    console.log(pdfPath);
    res.sendFile(pdfPath);
  };
}

function generateRecapitulatifPdf(req) {
  return new Promise(function(resolve, reject) {
    MakePdf.make({
      request: req.request,
      host: req.headers.host,
      user: req.user
    }, function(err, pdfPath) {
      if (err) {
        return reject(err);
      }

      return resolve(pdfPath);
    });
  });
}

export function getRecapitulatif(req, res) {
  Recapitulatif.answersToHtml({
    request: req.request,
    host: req.headers.host
  }, function(err, html) {
    if (err) {
      return handleError(req, res)(500, err);
    }

    return res.status(200).send(html);
  });
}

export function getPdf(req, res) {
  generateRecapitulatifPdf(req)
    .then(respondWithFile(res))
    .catch(handleError(req, res));
}

export function getSynthesePdf(req, res) {
  Synthese.answersToHtml(req.request, req.headers.host, 'pdf', function(err, html) {
    if (err) { throw(500, err); }

    pdf.create(html).toStream(function(err, stream) {
      stream.pipe(res);
    });
  });
}

function processDocument(file, fileData, done) {
  if (typeof file === 'undefined') {
    return done({status: 304});
  }

  resizeAndMove(file, function() {
    var document = _.extend(file, {
      type: fileData.type,
      partenaire: fileData.partenaire
    });

    return done(null, document);
  });
}

export function saveFilePartenaire(req, res) {
  var _document = null;
  var _request = null;
  var _partenaire = null;

  async.waterfall([
    function(callback) {
      processDocument(req.file, req.body, callback);
    },

    function(document, callback) {
      _document = document;
      Request.findOne({shortId: req.params.shortId}, callback);
    },

    function(request, callback) {
      _request = request;
      request.documents.push(_document);
      request.save();
      callback();
    },

    function(callback) {
      Partenaire.findById(_document.partenaire, callback);
    },

    function(partenaire, callback) {
      if (!partenaire) { res.sendStatus(404); }

      _partenaire = partenaire;
      partenaire.secret = shortid.generate();
      partenaire.save();
      callback();
    },

    function(callback) {
      const confirmationUrl = req.headers.host + '/api/partenaires/' + _partenaire._id + '/' + _partenaire.secret;
      MailActions.sendConfirmationMail(_partenaire.email, confirmationUrl);

      _request.saveActionLog(actions.DOCUMENT_ADDED, _partenaire, req.log, {document: _document, partenaire: _partenaire});
      callback();
    }
  ], function(err, result) {
    if (err) {
      return handleError(req, res, err);
    }

    return res.json(_document);
  });
}
