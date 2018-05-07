'use strict';

import { populateAndSortPrestations } from '../prestation/prestation.controller';
import { populateAndSortDocumentTypes } from '../document-type/document-type.controller';

import _ from 'lodash';
import moment from 'moment';
import shortid from 'shortid';
import async from 'async';
import Promise from 'bluebird';
import archiver from 'archiver';
import Joi from 'joi';
import recapitulatif from '../../components/recapitulatif';
import demandeBuilder from '../../components/DemandeBuilder';

import Request from './request.model';
import Mdph from '../mdph/mdph.model';
import Partenaire from '../partenaire/partenaire.model';
import * as MailActions from '../send-mail/send-mail-actions';

//import Dispatcher from '../../components/dispatcher';
import RequestActionModel from './action.model';
import { ACTIONS } from './actions';
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

function saveUpdates(req) {
  return new Promise(function(resolve, reject) {
    let filteredUpdates = _.omit(req.body, '_id', 'user', 'profile', '__v', 'createdAt');
    filteredUpdates.data = _.omit(filteredUpdates.data, 'documents', 'detailPrestations');
    req.request.set(filteredUpdates).save(function(err, updated) {
      if (err) {
        return reject(err);
      }

      updated.saveActionLog(ACTIONS.UPDATE_DATA, req.user, req.log);
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
    .select('shortId mdph createdAt data.identites.beneficiaire.nom data.identites.beneficiaire.prenom')
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(req, res));
}

// Deletes a request from the DB
export function destroy(req, res) {
  req.request
    .remove()
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

export function saveEvaluateurs(req, res) {
  const evaluators = req.body;

  req.request
    .set({evaluators})
    .save()
    .then(saved => {
      saved.saveActionLog(ACTIONS.ASSIGN_EVALUATORS, req.user, req.log);
      return res.send(saved);
    });
}

function fillRequestMdph(request) {
  return request.getFullMdph().then(mdph => {
    if (mdph) {
      request.fullMdph = mdph;
    }

    return request;
  });
}

function resolveSubmit(req, res) {
  return Request
    .findOne({shortId: req.body.request.shortId})
    .then(function(request){
      return request
        .set('status', 'emise')
        .set('mdph', req.body.mdph)
        .set('submittedAt', Date.now());
    })
    .then(function(request) {
      const beneficiaireSchema = Joi.object().keys({
        localite: Joi.string().required(),
        code_postal: Joi.string().required(),
        nomVoie: Joi.string().required(),
        dateNaissance: Joi.date().required(),
        nationalite: Joi.string().required(),
        sexe: Joi.string().required(),
        prenom: Joi.string().required(),
        nom: Joi.string().required(),
        email: Joi.string().required(),
        numero_secu: Joi.string().required(),
        assurance: Joi.string().required()
      });

      if(request.data.identites.beneficiaire){
        return Joi.validate(request.data.identites.beneficiaire, beneficiaireSchema, {allowUnknown: true}, (err) => {
          if(err !== null) {
            var error = err.details.reduce(function(prev, curr) {
              return [...prev, curr.message];
            }, []);
            res.status(406).json(error);
          } else {
            return request;
          }
        });
      } else {
        res.status(406).send('identitée du bénéficiaire non present');
      }
    })
    .then(function(request){
      return request
        .save()
        .then(saved => {
          saved.saveActionLog(ACTIONS.SUBMIT, req.user, req.log);
          return saved;
        });
    })
    .then(fillRequestMdph)
    .then(sendMailReceivedTransmission(req));
    //.then(Dispatcher.dispatch);
}

function getRequestMdphEmail(request) {
  const mainLocation = _.find(request.fullMdph.locations, {headquarters: true}) || request.fullMdph.locations[0];

  return mainLocation.email;
}

function sendMailReceivedTransmission(req) {
  return function(request) {
    Mdph
      .findOne({zipcode: req.request.mdph})
      .exec()
      .then(mdph => {
        const options = {
          request: request,
          host: req.headers.host,
          mdph: mdph,
          user: req.user,
          email: req.user.email,
          replyTo: getRequestMdphEmail(request),
          role: req.user.role,
          withSeparator: false,
          format: 'pdf'
        }

        MailActions.sendMailReceivedTransmission(options); // Service sends summary to user
      });

    return request;
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
    options.status = 'validee';
    options.validee = true;
  }

  if (host) {
    options.url = `${host}/mdph/${request.mdph}/profil/${request.profile}`;
  }

  return options;
}

function resolveEnregistrement(req) {
  const options = computeEnregistrementOptions(req.request, req.headers.host);

  return req.request
    .set('status', options.status)
    .save()
    .then(fillRequestMdph)
    .then(request => {
      options.replyTo = getRequestMdphEmail(request);
      MailActions.sendMailCompletude(request, options);
      request.saveActionLog(ACTIONS.ENREGISTREMENT, req.user, req.log);
      return request;
    });
}

function dispatchAction(req) {
  switch (req.body.id) {
    case ACTIONS.ENREGISTREMENT:
      return resolveEnregistrement(req);
    case ACTIONS.SUBMIT:
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

export function partialDelete(req, res) {
  req.request.unlinkDocuments();
  req.request.data = {};
  req.request.deletedAt = new Date();
  req.request.save()
    .then(respondWithResult(res, 200))
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
      askedDocumentTypes: req.body.askedDocumentTypes,
      data:{
        identites: req.profile.identites
      }
    })
    .then(request => {
      request.saveActionLog(ACTIONS.CREATION, req.user, req.log);
      return request;
    })
    .then(populateAndRespond(res))
    .catch(handleError(req, res));
}

function findActionHistory(req) {
  return RequestActionModel
    .find({
      request: req.request._id
    })
    .populate('user')
    .sort('-date')
    .exec();
}

export function getHistory(req, res) {
  findActionHistory(req)
    .then(respondWithResult(res))
    .catch(handleError(req, res));
}

export function getRecapitulatif(req, res) {
  Mdph
    .findOne({zipcode: req.request.mdph})
    .exec()
    .then(mdph => {
      recapitulatif({
        request: req.request,
        host: req.headers.host,
        mdph: mdph
      }, function(err, html) {
        if (err) {
          return handleError(req, res)(500, err);
        }
           return res.status(200).send(html);
      });
    })
}

export function getPdf(req, res) {
  var currentMdph = null;
  Mdph
    .findOne({zipcode: req.request.mdph})
    .exec()
    .then(mdph => {
      currentMdph = mdph;

      return demandeBuilder({
        request: req.request,
        host: req.headers.host,
        mdph: currentMdph,
        withSeparator: req.params.type !== "user",
        format: req.params.type !== 'user' ? currentMdph.requestExportFormat : 'pdf'
      });
    })
    .then(readStream => {
      const beneficiaire = req.request.data.identites.beneficiaire;
      const extension = req.params.type !== 'user' ? currentMdph.requestExportFormat : 'pdf';

      const filename = `${beneficiaire.nom.toLowerCase().replace(/\W/g, '')}_${beneficiaire.prenom.toLowerCase().replace(/\W/g, '')}_${req.request.shortId}.${extension}`;

      res.header('Content-Type', `application/octet-stream`);
      res.header('Content-Disposition', `attachment; filename="${filename}"`);

      readStream.pipe(res);
      return null;
    })
    .catch(handleError(req, res));
}

export function getDownload(req, res) {

  if(!req.query.short_ids || req.query.short_ids.length === 0 ){
    return res.sendStatus(404);
  }

  const demandeShortIds = JSON.parse(req.query.short_ids);

  var archive = archiver.create('zip', {});

  async.each(demandeShortIds,

    function(demandeShortId, callback){
      var currentDemande = null;

      Request.findOne({shortId: demandeShortId})
      .exec()
      .then(fillRequestMdph)
      .then(demande => {
        currentDemande = demande;
        return demandeBuilder({
          request: currentDemande,
          host: req.headers.host,
          mdph: currentDemande.fullMdph,
          withSeparator: true,
          format: currentDemande.fullMdph.requestExportFormat
        });
      })
      .then(readStream => {

        const beneficiaire = currentDemande.data.identites.beneficiaire;
        const extension = currentDemande.fullMdph.requestExportFormat;

        const filename = `${beneficiaire.nom.toLowerCase()}_${beneficiaire.prenom.toLowerCase()}_${currentDemande.shortId}.${extension}`;

        archive.append(readStream, { name: filename });

        callback();
      });
    },
    function(){
      archive.finalize();

      res.header('Content-Disposition', `attachment; filename="download.zip"`);
      archive.pipe(res);
      return null;
    }
  );
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
      request.data.documents.push(_document);
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

      _request.saveActionLog(ACTIONS.DOCUMENT_ADDED, _partenaire, req.log, {document: _document, partenaire: _partenaire});
      callback();
    }
  ], function(err) {
    if (err) {
      return handleError(req, res);
    }

    return res.json(_document);
  });
}
