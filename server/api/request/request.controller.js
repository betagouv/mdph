'use strict';

import { populateAndSortPrestations } from '../prestation/prestation.controller';
import { populateAndSortDocumentTypes } from '../document/documents.controller';

import _ from 'lodash';
import path from 'path';
import pdf from 'html-pdf';
import fs from 'fs';
import shortid from 'shortid';
import async from 'async';

const Auth = require('../../auth/auth.service');
const config = require('../../config/environment');
const Recapitulatif = require('../../components/recapitulatif');
const Synthese = require('../../components/synthese');
const MakePdf = require('../../components/make-pdf');

const Prestation = require('../prestation/prestation.controller');
const Request = require('./request.model');
const User = require('../user/user.model');
const Partenaire = require('../partenaire/partenaire.model');
const Mdph = require('../mdph/mdph.model');
const MailActions = require('../send-mail/send-mail-actions');

const Dispatcher = require('../../components/dispatcher');
const ActionModel = require('./action.model');
const Actions = require('../../components/actions').actions;
const ActionsById = require('../../components/actions').actionsById;
const resizeAndMove = require('../../components/resize-image');

const domain = process.env.DOMAIN || config.DOMAIN;

function handleError(req, res) {
  return function(statusCode, err) {
    statusCode = statusCode || 500;

    if (err) {
      req.log.error(err);
      res.status(statusCode).send(err);
    } else {
      res.sendStatus(statusCode);
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

function handleUserNotAuthorized(user, res) {
  return function(request) {
    if (Auth.meetsRequirements(user.role, 'adminMdph')) {
      return request;
    }

    if (user._id.equals(request.user._id)) {
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
      updated.saveActionLog(Actions.UPDATE_ANSWERS, req.user, req.log);

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
        case Actions.SUCCES_ENREGISTREMENT.id:
          MailActions.sendMailCompletude(request, req.user); // Agent sends KO to user
          break;
        case Actions.ERREUR_ENREGISTREMENT.id:
          MailActions.sendMailDemandeDocuments(request, req.user); // Agent sends OK to user
          break;
        case Actions.SUBMIT.id:
          let options = {
            request: request,
            host: req.headers.host,
            user: req.user,
            email: req.user.email
          };

          MailActions.sendMailReceivedTransmission(options); // Service sends summary to user

          Dispatcher.dispatch(request)
            .then(secteur => { // Service disatches to agents
              request.saveActionLog(Actions.ASSIGN_SECTOR, req.user, req.log, {secteur: secteur.name});
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
exports.show = function(req, res, next) {
  findAndPopulate(req.params.shortId)
    .then(handleEntityNotFound(res))
    .then(handleUserNotAuthorized(req.user, res))
    .then(populateAndSortPrestations)
    .then(populateAndSortDocumentTypes)
    .then(respondWithResult(res))
    .catch(handleError(req, res));
};

// Get a single request
exports.showPartenaire = function(req, res, next) {
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
};

// Deletes a request from the DB and FS
exports.destroy = function(req, res) {
  Request
    .findOne({
      shortId: req.params.shortId
    })
    .then(handleEntityNotFound(res))
    .then(handleUserNotAuthorized(req.user, res))
    .then(unlinkRequestDocuments)
    .then(removeRequest)
    .then(respondWithResult(res, 204))
    .catch(handleError(req, res));
};

/**
 * Get user requests
 */
exports.showUserRequests = function(req, res, next) {
  Request.find({
    user: req.user._id
  })
  .select('shortId mdph updatedAt createdAt status')
  .populate('user', 'name')
  .sort('-updatedAt')
  .then(respondWithResult(res))
  .catch(handleError(req, res));
};

exports.update = function(req, res, next) {
  findAndPopulate(req.params.shortId)
    .then(handleEntityNotFound(res))
    .then(handleUserNotAuthorized(req.user, res))
    .then(saveUpdates(req))
    .then(processUserAction(req))
    .then(saveUserAction(req))
    .then(populateAndSortPrestations)
    .then(populateAndSortDocumentTypes)
    .then(respondWithResult(res))
    .catch(handleError(req, res));
};

/**
 * Create request
 */
exports.create = function(req, res, next) {
  Request.create(req.body)
    .then(respondWithResult(res, 201))
    .then(saveActionLog(Actions.CREATION, req))
    .catch(handleError(res));
};

exports.getHistory = function(req, res) {
  ActionModel
    .find({
      request: req.request._id
    })
    .populate('user')
    .sort('-date')
    .lean()
    .exec(function(err, actions) {
      if (err) return handleError(err);

      actions.forEach(function(action) {
        action.label = ActionsById[action.action].label;
      });

      return res.json(actions);
    });
};

exports.getRecapitulatif = function(req, res) {
  let options = {
    request: req.request,
    host: req.headers.host
  };

  Recapitulatif.answersToHtml(options, function(err, html) {
    if (err) { return handleError(req, res, err); }

    res.send(html).status(200);
  });
};

exports.getPdf = function(req, res) {
  let options = {
    request: req.request,
    host: req.headers.host,
    user: req.user
  };

  MakePdf.make(options, function(err, pdfPath) {
    if (err) { return handleError(req, res, err); }

    res.sendFile(pdfPath);
  });
};

exports.getSynthesePdf = function(req, res) {
  Synthese.answersToHtml(req.request, req.headers.host, 'pdf', function(err, html) {
    if (err) { return handleError(req, res, err); }

    pdf.create(html).toStream(function(err, stream) {
      stream.pipe(res);
    });
  });
};
