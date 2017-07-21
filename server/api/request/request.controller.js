'use strict';

import { populateAndSortPrestations } from '../prestation/prestation.controller';
import { populateAndSortDocumentTypes } from '../document-type/document-type.controller';
import mongoose from 'mongoose';

import _ from 'lodash';
import pdf from 'html-pdf';
import moment from 'moment';
import fs from 'fs';
import shortid from 'shortid';
import async from 'async';
import Promise from 'bluebird';
import Recapitulatif from '../../components/recapitulatif';
import SynthesePDF from '../../components/synthese';
import pdfMaker from '../../components/pdf-maker';

import Request from './request.model';
import Profile from '../profile/profile.model';
import Mdph from '../mdph/mdph.model';
import Partenaire from '../partenaire/partenaire.model';
import * as MailActions from '../send-mail/send-mail-actions';
import Synthese from '../synthese/synthese.model';

import Dispatcher from '../../components/dispatcher';
import ActionModel from './action.model';
import {actions, actionsById} from '../../components/actions';
import resizeAndMove from '../../components/resize-image';

function handleError(req, res) {
  return function(statusCode, err) {
    statusCode = statusCode || 500;

    if (err) {
      req.log.error(err);
      return res.status(statusCode).send(err);
    } else {
      return res.status(statusCode).send('Server error');
    }
  };
}

function unlinkRequestDocuments(req) {
  return new Promise(function(resolve) {
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

function populateAndRespond(res) {
  return function(request) {
    return populateAndSortPrestations(request)
      .then(populateAndSortDocumentTypes)
      .then(respondWithResult(res));
  };
}

// Get a single request
export function show(req, res) {
  populateAndRespond(res)(req.request)
    .catch(handleError(req, res));
}

// Get a single request
export function showPartenaire(req, res) {
  Request
    .findOne({
      shortId: req.params.shortId
    })
    .select('shortId mdph createdAt formAnswers.identites.beneficiaire.nom formAnswers.identites.beneficiaire.prenom')
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
export function showUserRequests(req, res) {
  Request.find({
    user: req.user._id
  })
  .select('shortId mdph updatedAt createdAt status')
  .populate('user', 'name')
  .sort('-updatedAt')
  .then(respondWithResult(res))
  .catch(handleError(req, res));
}

function fillRequestOnSubmit(request, body) {
  return function(profile) {
    let formAnswers = _.pick(
      profile,
      'identites',
      'vie_quotidienne',
      'vie_scolaire',
      'vie_au_travail',
      'aidant',
      'situations_particulieres'
    );

    return request
      .set('status', 'emise')
      .set('formAnswers', formAnswers)
      .set('mdph', body.mdph)
      .set('submittedAt', Date.now());
  };
}

function saveRequestOnSubmit(req) {
  return function(request) {
    return request
      .save()
      .then(saved => {
        saved.saveActionLog(actions.SUBMIT, req.user, req.log);
        return saved;
      });
  };
}

function fillRequestMdph(request) {
  return request.getFullMdph().then(mdph => {
    if (mdph) {
      request.fullMdph = mdph;
    }

    return request;
  });
}

function resolveSubmit(req) {
  return Profile
    .findById(req.request.profile)
    .exec()
    .then(fillRequestOnSubmit(req.request, req.body))
    .then(saveRequestOnSubmit(req))
    .then(fillRequestMdph)
    .then(sendMailReceivedTransmission(req))
    .then(dispatchSecteur(req));
}

function getRequestMdphEmail(request) {
  const mainLocation = _.find(request.fullMdph.locations, {headquarters: true}) || request.fullMdph.locations[0];

  return mainLocation.email;
}

function sendMailReceivedTransmission(req) {
  return function(request) {
    const options = {
      request: request,
      host: req.headers.host,
      user: req.user,
      email: req.user.email,
      replyTo: getRequestMdphEmail(request)
    };

    MailActions.sendMailReceivedTransmission(options); // Service sends summary to user
    return request;
  };
}

function dispatchSecteur(req) {
  return function(request) {
    return Dispatcher.dispatch(request)
      .then(secteur => { // Service disatches to agents
        return request.set('secteur', secteur).save().then(saved => {
          saved.saveActionLog(actions.ASSIGN_SECTOR, req.user, req.log, {secteur: secteur.name});
          return saved;
        });
      })
      .catch(() => {
        // Ignore no sector found
        return request;
      });
  };
}

function computeEnregistrementOptions(request, host) {
  const options = {};

  const invalidDocumentTypes = request.getInvalidDocumentTypes();
  const invalidDocuments = request.getInvalidDocuments();
  const nonPresentAskedDocumentTypes = request.getNonPresentAskedDocumentTypes();

  if (!request.receivedAt) {
    options.receivedAt = moment();
  } else {
    options.receivedAt = request.receivedAt;
  }

  if (invalidDocumentTypes.length > 0 || nonPresentAskedDocumentTypes.length > 0) {
    options.status = 'en_attente_usager';
    options.en_attente_usager = true;

    if (invalidDocumentTypes.length > 0) {
      options.invalidDocumentTypes = invalidDocumentTypes;
      options.invalidDocuments = invalidDocuments;
    }

    if (nonPresentAskedDocumentTypes.length > 0) {
      options.nonPresentAskedDocumentTypes = nonPresentAskedDocumentTypes;
    }
  } else {
    options.status = 'enregistree';
    options.enregistree = true;
  }

  if (host) {
    options.url = `${host}/mdph/${request.mdph}/profil/${request.profile}/demande/${request.shortId}`;
  }

  return options;
}

// create a snapshot of the current synthesis for a saved request
function snapshotSynthese(request) {
  Synthese
    .find({profile: request.profile})
    .exec(
      function(err, profileSyntheses) {
        if (err) return;

        var snapshotSynthese;
        var now = Date.now();

        var existingRequestSynthese = _.find(profileSyntheses, function(synthese) {
          return synthese.request === request._id;
        });

        var currentProfileSynthese = _.find(profileSyntheses, function(synthese) {
          return synthese.request === null;
        });

        if (!currentProfileSynthese) return;

        if (existingRequestSynthese) {
          snapshotSynthese = existingRequestSynthese;
          snapshotSynthese.geva = currentProfileSynthese.geva;
        } else {
          snapshotSynthese = new Synthese(currentProfileSynthese);
          snapshotSynthese._id = mongoose.Types.ObjectId();
          snapshotSynthese.request = request._id;
          snapshotSynthese.createdAt = now;
          snapshotSynthese.isNew = true;
        }

        snapshotSynthese.updatedAt = now;
        snapshotSynthese.save();
      }
    );
  return request;
}

function resolveEnregistrement(req) {
  const options = computeEnregistrementOptions(req.request, req.headers.host);

  return req.request
    .set('status', options.status)
    .save()
    .then(snapshotSynthese)
    .then(fillRequestMdph)
    .then(request => {
      options.replyTo = getRequestMdphEmail(request);
      MailActions.sendMailCompletude(request, options);
      request.saveActionLog(actions.ENREGISTREMENT, req.user, req.log);
      return request;
    });
}

function dispatchAction(req) {
  switch (req.body.id) {
    case actions.ENREGISTREMENT.id:
      return resolveEnregistrement(req);
    case actions.SUBMIT.id:
      return resolveSubmit(req);
    default:
      return Promise.reject('Action not found');
  }
}

export function saveAction(req, res) {
  dispatchAction(req)
    .then(populateAndRespond(res))
    .catch(handleError(req, res));
}

export function update(req, res) {
  saveUpdates(req)
    .then(populateAndRespond(res))
    .catch(handleError(req, res));
}

/**
 * Generates an html mail body to use as a preview
 */
export function generateReceptionMail(req, res) {
  const options = computeEnregistrementOptions(req.request);

  MailActions.generateReceptionMail(req.request, options)
    .then(html => res.send(html))
    .catch(handleError(req, res));
}

/**
 * Create request
 */
export function create(req, res) {
  Request
    .create({
      profile: req.profile,
      user: req.user,
      askedDocumentTypes: req.body.askedDocumentTypes
    })
    .then(request => {
      request.saveActionLog(actions.CREATION, req.user, req.log);
      return request;
    })
    .then(populateAndRespond(res))
    .catch(handleError(req, res));
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
      let fullAction = actionsById[action.action];

      if (fullAction) {
        action.label = fullAction.label;
      } else {
        action.label = action.action;
      }
    });

    return resolve(actions);
  });
}

export function getHistory(req, res) {
  findActionHistory(req)
    .then(respondWithResult(res))
    .catch(handleError(req, res));
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
  var currentMdph = null;
  Mdph
    .findOne({zipcode: req.request.mdph})
    .exec()
    .then(mdph => {
      currentMdph = mdph;
      return pdfMaker({
        request: req.request,
        host: req.headers.host,
        user: req.user,
        role: req.user.role,
        requestExportFormat: mdph.requestExportFormat
      });
    })
    .then(readStream => {
      const beneficiaire = req.request.formAnswers.identites.beneficiaire;
      const extension = currentMdph.requestExportFormat;

      const filename = `${beneficiaire.nom.toLowerCase()}_${beneficiaire.prenom.toLowerCase()}_${req.request.shortId}.${extension}`;

      res.header('Content-Disposition', `attachment; filename="${filename}"`);
      readStream.pipe(res);
      return null;
    })
    .catch(handleError(req, res));
}

export function getSynthesePdf(req, res) {
  SynthesePDF.answersToHtml(req.request, req.headers.host, 'pdf', function(err, html) {
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
      const confirmationUrl = `${req.headers.host}/api/partenaires/${_partenaire._id}/${_partenaire.secret}`;
      MailActions.sendConfirmationMail(_partenaire.email, confirmationUrl);

      _request.saveActionLog(actions.DOCUMENT_ADDED, _partenaire, req.log, {document: _document, partenaire: _partenaire});
      callback();
    }
  ], function(err) {
    if (err) {
      return handleError(req, res);
    }

    return res.json(_document);
  });
}
