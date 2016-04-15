'use strict';

import _ from 'lodash';
import async from 'async';
import shortid from 'shortid';
import path from 'path';
import fs from 'fs';

import config from '../../config/environment';
import Request from '../request/request.model';

import User from '../user/user.model';
import Partenaire from '../partenaire/partenaire.model';
import Auth from '../../auth/auth.service';
import resizeAndMove from '../../components/resize-image';
import {actions as Actions} from '../../components/actions';
import * as MailActions from '../send-mail/send-mail-actions';

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

function handleStatusError(req, res) {
  return new Promise(function(resolve, reject) {
    if (Auth.meetsRequirements(req.user.role, 'adminMdph')) {
      return resolve();
    }

    if (req.request.status === 'en_cours' || req.request.status === 'en_attente_usager') {
      return resolve();
    }

    reject(403);
  });
}

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    } else {
      res.sendStatus(statusCode);
    }

    return null;
  };
}

function removeFileFromFS(path) {
  return new Promise(function(resolve, reject) {
    if (!path) {
      return resolve();
    }

    fs.exists(path, function(exists) {
      if (exists) {
        fs.unlink(path, resolve);
      } else {
        resolve();
      }
    });
  });
}

function handleDeleteFile(req) {
  const file = req.request.documents.id(req.params.fileId);

  if (!file) {
    throw(304);
  }

  return removeFileFromFS(file.path)
    .then(() => {
      return file.remove(updated => {
        req.request.saveActionLog(Actions.DOCUMENT_REMOVED, req.user, req.log, {document: file});
        return req.request.save();
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

export function saveFile(req, res, next) {
  processDocument(req.file, req.body, function(err, document) {
    if (err) {
      return res.sendStatus(err.status);
    }

    var request = req.request;
    request.documents.push(document);

    if (request.status === 'enregistree') {
      MailActions.sendMailNewDocument('toto@toto.com', request);
    }

    request.save(function(err, saved) {
      if (err) { return handleError(req, res, err); }

      request.saveActionLog(Actions.DOCUMENT_ADDED, req.user, req.log, {document: document});

      var savedDocument = _.find(saved.documents, {filename: document.filename});
      return res
        .status(201)
        .json(savedDocument);
    });
  });
}

export function downloadFile(req, res) {
  var filePath = path.join(config.root + '/server/uploads/', req.params.fileName);

  var stat = fs.statSync(filePath);

  res.writeHead(200, {
    'Content-Length': stat.size
  });

  var readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
}

export function deleteFile(req, res) {
  handleStatusError(req, res)
    .then(handleDeleteFile(req))
    .then(respondWithResult(res, 204))
    .catch(handleError(req, res));
}

export function updateFile(req, res) {
  var request = req.request;
  var file = request.documents.id(req.params.fileId);
  var isInvalid = req.body.isInvalid;

  if (!file) {
    return res.sendStatus(404);
  }

  if (typeof isInvalid === 'undefined') {
    return res.sendStatus(400);
  }

  file.set('isInvalid', isInvalid);

  request.save(function(err) {
    if (err) return handleError(err);

    var action = isInvalid ? Actions.DOCUMENT_REFUSED : Actions.DOCUMENT_VALIDATED;

    request.saveActionLog(action, req.user, req.log, {document: file});
    return res.json(file);
  });
}
