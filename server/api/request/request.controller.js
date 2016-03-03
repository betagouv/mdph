'use strict';

import { populateAndSortPrestations } from '../prestation/prestation.controller';

const _ = require('lodash');
const path = require('path');
const pdf = require('html-pdf');
const fs = require('fs');
const shortid = require('shortid');
const async = require('async');

const Auth = require('../../auth/auth.service');
const config = require('../../config/environment');
const Recapitulatif = require('../../components/recapitulatif');
const Synthese = require('../../components/synthese');
const MakePdf = require('../../components/make-pdf');

const DocumentsController = require('../document/documents.controller');
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

function handleError(req, res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    req.log.error(err);
    res.status(statusCode).send(err);
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      throw(404);
    }

    return entity;
  };
}

function handleUserNotAuthorized(user, res) {
  return function(entity) {
    if (Auth.meetsRequirements(user.role, 'adminMdph')) {
      return entity;
    }

    if (user._id.equals(entity.user._id)) {
      return entity;
    }

    throw(403);
  };
}

function saveUpdates(req) {
  return function(entity) {
    let filteredUpdates = _.omit(req.body, '_id', 'user', '__v', 'documents', 'detailPrestations');
    return entity.set(filteredUpdates).save().then(updated => {
      updated.saveActionLog(Actions.UPDATE_ANSWERS, req.user, req.log);

      return updated;
    });
  };
}

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    res.status(statusCode).json(entity);
  };
}

function saveUserAction(req) {
  return function(entity) {
    if (req.action) {
      ActionModel.create({
        action: req.action.id,
        request: entity._id,
        user: req.user._id,
        date: Date.now(),
        params: req.action
      });
    }

    return entity;
  };
}

function processUserAction(req) {
  return function(entity) {
    if (req.action) {
      switch (req.action.id) {
        case Actions.SUCCES_ENREGISTREMENT.id:
          MailActions.sendMailCompletude(entity, req.user); // Agent sends KO to user
          break;
        case Actions.ERREUR_ENREGISTREMENT.id:
          MailActions.sendMailDemandeDocuments(entity, req.user); // Agent sends OK to user
          break;
        case Actions.SUBMIT.id:
          let options = {
            request: entity,
            host: req.headers.host,
            user: req.user,
            email: req.user.email
          };

          MailActions.sendMailReceivedTransmission(options); // Service sends summary to user

          Dispatcher.dispatch(entity)
            .then(secteur => { // Service disatches to agents
              entity.saveActionLog(Actions.ASSIGN_SECTOR, req.user, req.log, {secteur: secteur.name});
              entity.set('secteur', secteur).save();
            })
            .catch(err => {
              req.log.err(err);
            });

          break;
        default:
          console.log('Action not found');
      }
    }

    return entity;
  };
}

function findAndPopulate(shortId) {
  return Request
    .findOne({shortId: shortId})
    .populate('user')
    .populate('evaluator')
    .exec();
}

// function getPopulatedRequest(resolve, reject) {
//   DocumentsController.populateAndSortDocumentTypes(request, callback);
// }

// Get a single request
exports.show = function(req, res, next) {
  findAndPopulate(req.params.shortId)
    .then(handleEntityNotFound(res))
    .then(handleUserNotAuthorized(req.user, res))
    .then(populateAndSortPrestations)
    .then(respondWithResult(res))
    .catch(handleError(req, res));
};

// Get a single request
exports.showPartenaire = function(req, res, next) {
  Request.findOne({
    shortId: req.params.shortId
  })
  .populate('user', 'name')
  .select('shortId user name mdph createdAt')
  .exec(function(err, request) {
    if (err) return handleError(req, res, err);
    if (!request) { return res.sendStatus(404); }

    return res.json(request);
  });
};

// Deletes a request from the DB and FS
exports.destroy = function(req, res) {
  if (req.request.documents && req.request.documents.length > 0) {
    req.request.documents.forEach(function(requestDoc) {
      fs.unlink(requestDoc.path, function(err) {
        if (err) req.log.error(err);
      });
    });
  }

  req.request.remove(function(err) {
    if (err) { return handleError(req, res, err); }

    return res.sendStatus(204);
  });
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
  .exec(function(err, requests) {
    if (err) return handleError(req, res, err);
    if (!requests) return res.status(401);
    res.json(requests);
  });
};

exports.update = function(req, res, next) {
  findAndPopulate(req.params.shortId)
    .then(handleEntityNotFound(res))
    .then(handleUserNotAuthorized(req.user, res))
    .then(saveUpdates(req))
    .then(processUserAction(req))
    .then(saveUserAction(req))
    .then(populateAndSortPrestations)
    .then(respondWithResult(res))
    .catch(handleError(req, res));
};

/**
 * Resend mail notification
 */
exports.resendMail = function(req, res, next) {
  MailActions.sendMailNotification(req.request, req.headers.host, req.log, function() {
    res.sendStatus(200);
  });
};

/**
 * Save request
 */
exports.save = function(req, res, next) {
  var now = Date.now();

  var newRequest = _.assign(
    _.omit(req.body, 'html'), { user: req.user._id }
  );

  Request.create(newRequest, function(err, request) {
    if (err) return handleError(req, res, err);

    request.saveActionLog(Actions.CREATION, req.user, req.log);
    return res.status(201).send(request);
  });
};

/**
 * File upload
 */
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

exports.saveFile = function(req, res, next) {
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
      return res.json(savedDocument);
    });
  });
};

exports.saveFilePartenaire = function(req, res) {
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

      _request.saveActionLog(Actions.DOCUMENT_ADDED, _partenaire, req.log, {document: _document, partenaire: _partenaire});
      callback();
    }
  ], function(err, result) {
    if (err) {
      return handleError(req, res, err);
    }

    return res.json(_document);
  });
};

exports.downloadFile = function(req, res) {
  var filePath = path.join(config.root + '/server/uploads/', req.params.fileName);
  var stat = fs.statSync(filePath);

  res.writeHead(200, {
    'Content-Length': stat.size
  });

  var readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
};

exports.deleteFile = function(req, res) {
  var request = req.request;
  var file = request.documents.id(req.params.fileId);
  if (!file) {
    return res.sendStatus(304);
  }

  fs.unlink(file.path, function(err) {
    if (err) {
      req.log.info(req.user + ', not deleted, not found: ' + file.path);
    } else {
      req.log.info(req.user + ', successfully deleted: ' + file.path);
    }

    file.remove();

    request.save(function(err, saved) {
      if (err) { return handleError(req, res, err); }

      request.saveActionLog(Actions.DOCUMENT_REMOVED, req.user, req.log, {document: file});
      return res.send(file).status(200);
    });
  });
};

exports.updateFile = function(req, res) {
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

exports.simulate = function(req, res) {
  var prestations = Prestation.simulate(req.request.formAnswers);
  return res.json(prestations);
};
