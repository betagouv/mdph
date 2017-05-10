'use strict';

import _ from 'lodash';
import path from 'path';
import fs from 'fs';

import config from '../../config/environment';

import Auth from '../../auth/auth.service';
import resizeAndMove from '../../components/resize-image';
import {actions as Actions} from '../../components/actions';

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

function handleStatusError(req) {
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
  if (path) {
    fs.exists(path, function(exists) {
      if (exists) {
        fs.unlink(path, () => {
          return Promise.resolve();
        });
      }
    });
  }

  return Promise.resolve();
}

function handleDeleteFile(req) {
  const file = req.request.documents.id(req.params.fileId);

  if (!file) {
    throw(304);
  }

  return removeFileFromFS(file.path)
    .then(() => {
      return file.remove({}, () => {
        req.request.saveActionLog(Actions.DOCUMENT_REMOVED, req.user, req.log, {document: file});
        return req.request.save();
      });
    });
}

function processDocument(file, fileData, done) {
  if (typeof file === 'undefined') {
    return done({status: 304});
  }

  var supportedFileTypes = ['application/pdf', 'image/jpeg', 'image/png'];
  if (supportedFileTypes.indexOf(file.mimetype) < 0) {
    return done({status: 403});
  }

  resizeAndMove(file, function() {
    var document = _.extend(file, {
      type: fileData.type,
      partenaire: fileData.partenaire
    });

    return done(null, document);
  });
}

export function saveFile(req, res) {
  processDocument(req.file, req.body, function(err, document) {
    if (err) {
      return res.sendStatus(err.status);
    }

    var request = req.request;
    request.documents.push(document);

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
  var filePath = path.join(config.uploadDir, req.params.fileName);

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
  var invalidReason = req.body.invalidReason;

  if (!file) {
    return res.sendStatus(404);
  }

  if (typeof isInvalid === 'undefined') {
    return res.sendStatus(400);
  }

  file.set('isInvalid', isInvalid);
  file.set('invalidReason', invalidReason);

  request.save(function(err) {
    if (err) return handleError(err);

    var action = isInvalid ? Actions.DOCUMENT_REFUSED : Actions.DOCUMENT_VALIDATED;
    var reason = isInvalid ? invalidReason : '';

    request.saveActionLog(action, req.user, req.log, {document: file, reason : reason});
    return res.json(file);
  });
}
