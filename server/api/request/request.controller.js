'use strict';

var _ = require('lodash');
var path = require('path');
var pdf = require('html-pdf');
var fs = require('fs');
var shortid = require('shortid');
var Imagemin = require('imagemin');
var async = require('async');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');

var auth = require('../../auth/auth.service');
var config = require('../../config/environment');
var Recapitulatif = require('../../components/recapitulatif');
var Dispatcher = require('../../components/dispatcher');
var Synthese = require('../../components/synthese');
var DateUtils = require('../../components/dateUtils');
var MakePdf = require('../../components/make-pdf');

var Prestation = require('../prestation/prestation.controller');
var Request = require('./request.model');
var User = require('../user/user.model');
var Partenaire = require('../partenaire/partenaire.model');
var Mdph = require('../mdph/mdph.model');
var Mailer = require('../send-mail/send-mail.controller');

var ActionModel = require('./action.model');
var Actions = require('../../components/actions').actions;
var ActionsById = require('../../components/actions').actionsById;

var domain = process.env.DOMAIN || config.DOMAIN;

function resizeAndMove(file, next) {
  if (file.mimetype === 'image/jpeg') {
    new Imagemin()
      .src(file.path)
      .dest(file.destination)
      .use(imageminJpegRecompress({
        progressive: true,
        loops: 7,
        min: 30,
        strip: true,
        quality: 'low',
        target: 0.7
      }))
      .run();
  }

  next();
}

function generatePdf(request, user, host, done) {
  Recapitulatif.answersToHtml(request, host, 'pdf', function(err, html) {
    if (err) return done(err);

    return MakePdf.make(request, user, html, done);
  });
}

function sendMailNotification(request, host, log, callback) {
  Dispatcher.findSecteur(request, function(secteur) {
    if (!secteur) {
      callback();
    }

    var type = DateUtils.getType(request.formAnswers);

    if (secteur.evaluators && secteur.evaluators[type] && secteur.evaluators[type].length > 0) {
      var evaluators = secteur.evaluators[type];
      evaluators.forEach(function(evaluator) {
        if (request.mdph === '59') {
          generatePdf(request, {role: 'adminMdph'}, host, function(err, pdfPath) {
            if (err) { log.error(err); }

            Mailer.sendMail(
              evaluator.email,
              'Vous avez reçu une nouvelle demande', 'Référence de la demande: ' + request.shortId,
              [
                {
                  filename: request.shortId + '.pdf',
                  path: pdfPath
                }
              ]
            );
          });
        } else {
          Mailer.sendMail(evaluator.email, 'Vous avez reçu une nouvelle demande', 'Référence de la demande: ' + request.shortId);
        }
      });
    }

    callback(secteur);
  });
}

function sendMailCompletude(request, evaluator) {
  Mailer.sendMail(request.user.email,
    'Accusé de complétude de votre dossier',
    'Les documents obligatoires que vous nous avez transmis ont tous été validés par ' + evaluator.name + ' de la MDPH ' + request.mdph + '. Votre dosser est désormais considéré comme complet.'
  );
}

function sendMailDemandeDocuments(request, evaluator) {
  Mailer.sendMail(request.user.email,
    'Demande de complétude de votre dossier',
    'Les documents obligatoires que vous nous avez transmis n\'ont pas tous été validés par ' + evaluator.name + ' de la MDPH ' + request.mdph + '. Vous devez vous reconnecter pour renvoyer les pièces en erreur suivantes: ##TODO pièces en erreur##'
  );
}

/**
 * Get list of requests
 */
exports.index = function(req, res) {

  Mdph.findById(req.user.mdph, function(err, mdph) {
    if (err) return handleError(req, res, err);
    if (!mdph) return res.sendStatus(404);

    var search = {
      mdph: mdph.zipcode
    };

    var query = req.query;

    if (query) {
      if (query.status) {
        search.status = query.status;
      }

      if (query.evaluator) {
        if (query.evaluator === 'null') {
          search.evaluator = undefined;
        } else {
          search.evaluator = query.evaluator;
        }
      }
    }

    Request.find(search)
      .populate('user', 'name')
      .populate('evaluator', 'name')
      .sort('-submittedAt')
      .exec(function(err, requests) {
        if (err) return handleError(req, res, err);
        return res.send(requests);
      });
  });
};

// Get a single request
exports.show = function(req, res, next) {
  return res.json(req.request);
};

// Get a single request
exports.showPartenaire = function(req, res, next) {
  Request.findOne({
    shortId: req.params.shortId
  })
  .populate('user', 'name')
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

/**
 * Transfer request
 */
exports.transfer = function(req, res, next) {
  req.request
    .set('user', req.params.userId)
    .set('-updatedAt', Date.now())
    .save(function(err, request) {
      if (err) return handleError(req, res, err);
      res.json(request);
    });
};

/**
 * Update request / agent side
 */
exports.updateFromAgent = function(req, res, next) {
  var request = req.request;

  var newStatus = req.body.status;
  var oldStatus = request.status;

  switch (newStatus) {
    case 'complet':
      sendMailCompletude(request, req.user);
      break;
    case 'incomplet':
      sendMailDemandeDocuments(request, req.user);
      break;
  }

  request
    .set('status', req.body.status)
    .save(function(err, request) {
      if (err) return handleError(req, res, err);

      request.saveActionLog(Actions.CHANGE_STATUS, req.user, req.log, {old: oldStatus, new: newStatus});
      res.json(request);
    });
};

/**
 * Update request / user side
 */
exports.updateFromUser = function(req, res, next) {
  var request = req.request;

  if (req.query.isSendingRequest) {
    // Find and notify evaluator through dispatcher
    sendMailNotification(request, req.headers.host, req.log, function(secteur) {
      if (secteur) {

        request.saveActionLog(Actions.ASSIGN_SECTOR, req.user, req.log, {secteur: secteur.name});
        request.set('secteur', secteur).save();
      }
    });
  }

  request
    .set(_.omit(req.body, 'user', 'documents'))
    .set('updatedAt', Date.now())
    .set('submittedAt', Date.now())
    .save(function(err, updated) {
      if (err) return handleError(req, res, err);

      if (req.query.isSendingRequest) {
        request.saveActionLog(Actions.SUBMIT, req.user, req.log);

        // Notify user
        generatePdf(request, req.user, req.headers.host, function(err, pdfPath) {
          if (err) { req.log.error(err); }

          Mailer.sendMail(req.user.email,
            'Accusé de réception du téléservice',
            'Merci d\'avoir passé votre demande avec notre service. <br> Votre demande à été transférée à votre MDPH. Vous pouvez trouver ci-joint un récapitulatif de votre demande au format PDF.',
            [
              {
                filename: request.shortId + '.pdf',
                path: pdfPath
              }
            ]
          );
        });
      } else {
        // TODO: Not precise enough, is also used when request is assigned to an agent (pre_evalaution.controller.js)
        request.saveActionLog(Actions.UPDATE_ANSWERS, req.user, req.log);
      }

      res.json(request);
    });
};

/**
 * Resend mail notification
 */
exports.resendMail = function(req, res, next) {
  sendMailNotification(req.request, req.headers.host, req.log, function() {
    res.sendStatus(200);
  });
};

/**
 * Save request
 */
exports.save = function(req, res, next) {
  var now = Date.now();

  var newRequest = _.assign(
    _.omit(req.body, 'html'),
    {
      updatedAt: now
    },
    {
      createdAt: now
    },
    {
      user: req.user._id
    }
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
      category: fileData.category,
      partenaire: fileData.partenaire
    });

    return done(null, document);
  });
}

exports.saveFile = function(req, res, next) {
  processDocument(req.file, JSON.parse(req.body.data), function(err, document) {
    if (err) {
      return res.sendStatus(err.status);
    }

    var request = req.request;
    request.documents.push(document);

    request.save(function(err, saved) {
      if (err) { return handleError(req, res, err); }

      request.saveActionLog(Actions.DOCUMENT_ADDED, req.user, req.log, {document: document});
      return res.json(document);
    });
  });
};

exports.saveFilePartenaire = function(req, res) {
  processDocument(req.file, JSON.parse(req.body.data), function(err, document) {
    if (err) {
      return res.sendStatus(err.status);
    }

    var request = req.request;
    request.documents.push(document);

    request.save(function(err, saved) {
      if (err) { return handleError(req, res, err); }

      // Mail
      Partenaire.findById(document.partenaire, function(err, partenaire) {
        if (err) { return handleError(req, res, err); }

        if (!partenaire) { res.sendStatus(404); }

        partenaire.secret = shortid.generate();
        partenaire.save(function(err) {
          if (err) { return handleError(req, res, err); }

          var confirmationUrl = req.headers.host + '/api/partenaires/' + partenaire._id + '/' + partenaire.secret;
          Mailer.sendMail(partenaire.email, 'Veuillez confirmer votre adresse email',
            '<a href="http://' + confirmationUrl + '" target="_blank">Confirmez votre adresse email</a>');
        });

        request.saveActionLog(Actions.DOCUMENT_ADDED, partenaire, req.log, {document: document, partenaire: partenaire});
      });

      return res.json(document);
    });
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

      return res.send(file).status(200);
    });
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
