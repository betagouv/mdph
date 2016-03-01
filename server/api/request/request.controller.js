'use strict';

const _ = require('lodash');
const path = require('path');
const pdf = require('html-pdf');
const fs = require('fs');
const shortid = require('shortid');
const async = require('async');

const auth = require('../../auth/auth.service');
const config = require('../../config/environment');
const Recapitulatif = require('../../components/recapitulatif');
const Synthese = require('../../components/synthese');
const MakePdf = require('../../components/make-pdf');

const PrestationsController = require('../prestation/prestation.controller');
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

function getPopulatedRequest(user, shortId, done) {
  Request
    .findOne({
      shortId: shortId
    })
    .lean()
    .populate('user', '_id name role email mdph')
    .populate('evaluator')
    .exec(function(err, request) {
      if (!request) {
        done({status: 404});
      }

      if (err) {
        done(err);
      }

      if (!auth.canAccessResource(user, request)) {
        return done({status: 403});
      }

      async.waterfall([
        function(callback) {
          DocumentsController.populateAndSortDocumentTypes(request, callback);
        },

        function(request, callback) {
          PrestationsController.populateAndSortPrestations(request, callback);
        }
      ], function(err, request) {
        if (err) return done(err);

        return done(null, request);
      });
    });
}

function generatePdf(request, user, host, done) {
  Recapitulatif.answersToHtml(request, host, 'pdf', function(err, html) {
    if (err) return done(err);

    return MakePdf.make(request, user, html, done);
  });
}

// Get a single request
exports.show = function(req, res, next) {
  getPopulatedRequest(req.user, req.params.shortId, function(err, request) {
    if (err) {
      req.log.error(err);
      return res.status(err.status || 500).send(err);
    }

    return res.json(request);
  });
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
  req.request
    .set(_.omit(req.body, '_id', 'user', '__v', 'documents', 'detailPrestations'))
    .save()
    .then(request => {
      var actionDetail = req.query;
      var action = ActionsById[actionDetail.id];

      if (action) {
        switch (action) {
          case Actions.SUCCES_ENREGISTREMENT:
            MailActions.sendMailCompletude(request, req.user);
            break;
          case Actions.ERREUR_ENREGISTREMENT:
            MailActions.sendMailDemandeDocuments(request, req.user);
            break;
          case Actions.SUBMIT:
            Dispatcher.dispatch(request, req.user);
            request.set('submittedAt', Date.now()).save();
            generatePdf(request, req.user, req.headers.host, function(err, pdfPath) {
              if (err) { req.log.error(err); }

              MailActions.sendMailReceivedTransmission(request, req.user.email, pdfPath);
            });

            break;
          default:
            console.log('Action not found');
        }

        request.saveActionLog(action, req.user, req.log, actionDetail);
      }

      getPopulatedRequest(req.user, request.shortId, function(err, populated) {
        if (err) {
          req.log.error(err);
          return res.status(err.status || 500).send(err);
        }

        return res.json(populated);
      });
    })
    .catch(err => handleError(req, res, err));
};

// /**
//  * Update request / user side
//  */
// exports.update = function(req, res, next) {
//   req.request
//     .set(_.omit(req.body, '_id', 'user', '__v', 'documents', 'detailPrestations'))
//     .save(function(err, request) {
//       if (err) return handleError(req, res, err);
//
//       switch (action) {
//         default:
//           console.err('Action process not found');
//       }
//
//       request.saveActionLog(action, req.user, req.log, actionDetail);
//     });
//
//   if (req.query.isSendingRequest) {
//     // Find and notify evaluator through dispatcher
//     Dispatcher.findSecteur(request, function(err, secteur) {
//       if (secteur) {
//         var type = request.getType();
//         var evaluators = (secteur.evaluators && secteur.evaluators[type]) || [];
//         evaluators.forEach(function(evaluator) {
//           MailActions.sendMailNotificationAgent(request, evaluator.email);
//         });
//
//         request.saveActionLog(Actions.ASSIGN_SECTOR, req.user, req.log, {secteur: secteur.name});
//         request.set('secteur', secteur);
//       }
//
//       request
//         .set('submittedAt', Date.now())
//         .save(function(err, updated) {
//           if (err) return handleError(req, res, err);
//
//           request.saveActionLog(Actions.SUBMIT, req.user, req.log);
//
//
//
//           return res.json(updated);
//         });
//     });
//   } else {
//     request
//       .save(function(err, updated) {
//         if (err) return handleError(req, res, err);
//
//         // TODO: Not precise enough, is also used when request is assigned to an agent (pre_evalaution.controller.js)
//         request.saveActionLog(Actions.UPDATE_ANSWERS, req.user, req.log);
//
//         return res.json(updated);
//       });
//   }
// };

/**
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
  Recapitulatif.answersToHtml(req.request, req.headers.host, 'inline', function(err, html) {
    if (err) { return handleError(req, res, err); }

    res.send(html).status(200);
  });
};

exports.getPdf = function(req, res) {
  generatePdf(req.request, req.user, req.headers.host, function(err, pdfPath) {
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

function handleError(req, res, err) {
  req.log.error(err);
  return res.status(500).send(err);
}
