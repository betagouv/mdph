'use strict';

var _ = require('lodash');
var path = require('path');
var wkhtmltopdf = require('wkhtmltopdf');
var mongoose = require('mongoose');
var fs = require('fs');
var shortid = require('shortid');
var async = require('async');
var Imagemin = require('imagemin');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');

var auth = require('../../auth/auth.service');
var config = require('../../config/environment');
var Flattener = require('../../components/flatten');
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

var domain = process.env.DOMAIN || config.DOMAIN;

function findRequest(req, callback) {
  if (req.request) {
    return callback(null, req.request);
  }

  return Request.findOne({shortId: req.params.shortId}).exec(callback);
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
      .sort('-submittedAt')
      .exec(function(err, requests) {
        if (err) return handleError(req, res, err);
        return res.send(requests);
      });
  });
};

// Get a single request
exports.show = function(req, res, next) {
  findRequest(req, function(err, request) {
    if (err) return handleError(req, res, err);
    if (!request) { return res.sendStatus(404); }

    return res.json(request);
  });
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
  findRequest(req, function(err, request) {
    if (err) return handleError(req, res, err);
    if (!request) return res.sendStatus(404);

    if (request.documents && request.documents.length > 0) {
      request.documents.forEach(function(requestDoc) {
        fs.unlink(requestDoc.path, function(err) {
          if (err) req.log.error(err);
        });
      });
    }

    request.remove(function(err) {
      if (err) { return handleError(req, res, err); }

      return res.sendStatus(204);
    });
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
    if (!requests) return res.json(401);
    res.json(requests);
  });
};

var generatePdf = function(request, user, host, done) {
  Recapitulatif.answersToHtml(request, host, 'pdf', function(err, html) {
    if (err) return done(err);
    return MakePdf.make(request, user, html, done);
  });
};

function sendMailNotification(request, host, log, callback) {
  Dispatcher.findSecteur(request, function(secteur) {
    if (secteur) {

      var estAdulte = DateUtils.isAdult(request.formAnswers);
      var type = estAdulte ? 'adulte' : 'enfant';

      if (secteur.evaluators && secteur.evaluators[type] && secteur.evaluators[type].length > 0) {
        var evaluators = secteur.evaluators[type];
        evaluators.forEach(function(evaluator) {
          if (request.mdph === '59') {
            generatePdf(request, {role: 'adminMdph'}, host, function(err, pdfStream) {
              if (err) { log.error(err); }

              Mailer.sendMail(
                evaluator.email,
                'Vous avez reçu une nouvelle demande', 'Référence de la demande: ' + request.shortId,
                [
                  {
                    filename: request.shortId + '.pdf',
                    content: pdfStream
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
    } else {
      callback();
    }
  });
}

/**
 * Transfer request
 */
exports.transfer = function(req, res, next) {
  findRequest(req, function(err, request) {
    if (!request) {
      return res.sendStatus(404);
    }

    request
      .set('user', req.params.userId)
      .set('-updatedAt', Date.now())
      .save(function(err, request) {
        if (err) return handleError(req, res, err);
        res.json(request);
      });
  });
};

exports.updateStatus = function(req, res, next) {
  async.waterfall([
    function(callback) {
      findRequest(req, callback);
    },

    // Check is request exists
    function(request, callback) {
      if (!request) {
        return res.sendStatus(404);
      }

      request.set('status', req.body.status).save(callback);
    }

  ], function(err, request) {
    if (err) return handleError(req, res, err);
    res.json(request);
  });
};

/**
 * Update request
 */
exports.update = function(req, res, next) {

  async.waterfall([
    function(callback) {
      findRequest(req, callback);
    },

    // Check is request exists
    function(request, callback) {
      if (!request) {
        return res.sendStatus(404);
      }

      callback(null, request);
    },

    // Find evaluator through dispatcher
    function(request, callback) {

      if (req.query.isSendingRequest) {
        sendMailNotification(request, req.headers.host, req.log, function(secteur) {
          if (secteur) {
            request.set('secteur', secteur);
          }

          callback(null, request);
        });
      } else {
        callback(null, request);
      }
    },

    // Set new request attributes
    function(request, callback) {

      request
        .set(_.omit(req.body, 'user', 'documents'))
        .set('updatedAt', Date.now())
        .set('submittedAt', Date.now())
        .save(callback);
    }

  ], function(err, request) {
    if (err) return handleError(req, res, err);

    if (req.query.isSendingRequest) {
      generatePdf(request, req.user, req.headers.host, function(err, pdfStream) {
        if (err) { req.log.error(err); }

        Mailer.sendMail(req.user.email,
          'Accusé de réception du téléservice',
          'Merci d\'avoir passé votre demande avec notre service. <br> Votre demande à été transférée à votre MDPH. Vous pouvez trouver ci-joint un récapitulatif de votre demande au format PDF.',
          [
            {
              filename: request.shortId + '.pdf',
              content: pdfStream
            }
          ]
        );
      });
    }

    res.json(request);
  });
};

/**
 * Resend mail notification
 */
exports.resendMail = function(req, res, next) {
  findRequest(req, function(err, request) {
    sendMailNotification(request, req.headers.host, req.log, function() {
      res.sendStatus(200);
    });
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
    return res.status(201).send(request);
  });
};

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

/**
 * File upload
 */
exports.saveFile = function(req, res, next) {
  if (typeof req.file === 'undefined') {
    return res.sendStatus(304);
  }

  var currentFile = req.file;

  async.waterfall([
    function(callback) {
      resizeAndMove(currentFile, callback);
    },

    function(callback) {
      findRequest(req, function(err, request) {
        if (err) return handleError(req, res, err);
        if (!request) return res.sendStatus(404);

        callback(null, request);
      });
    },

    function(request) {
      var data = JSON.parse(req.body.data);
      var document = _.extend(currentFile, {type: data.type, category: data.category});

      if (req.query.partenaire) {
        document.partenaire = data.partenaire;

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
        });
      }

      if (document !== null) {
        request.documents.push(document);
      }

      request.save(function(err, saved) {
        if (err) { return handleError(req, res, err); }

        return res.json(request.documents[request.documents.length - 1]);
      });
    }

  ]);
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
  findRequest(req, function(err, request) {
    if (!request) return res.sendStatus(404);

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
  });
};

exports.getRecapitulatif = function(req, res) {
  findRequest(req, function(err, request) {
    if (!request) return res.sendStatus(404);
    Recapitulatif.answersToHtml(request, req.headers.host, 'inline', function(err, html) {
      if (err) { return handleError(req, res, err); }

      res.send(html).status(200);
    });
  });
};

exports.getPdf = function(req, res) {
  findRequest(req, function(err, request) {
    if (!request) return res.sendStatus(404);

    generatePdf(request, req.user, req.headers.host, function(err, pdfStream) {
      if (err) { return handleError(req, res, err); }

      pdfStream.pipe(res);
    });
  });
};

exports.getSynthesePdf = function(req, res) {
  findRequest(req, function(err, request) {
    if (!request) return res.sendStatus(404);
    Synthese.answersToHtml(request, req.headers.host, 'pdf', function(err, html) {
      if (err) { return handleError(req, res, err); }

      wkhtmltopdf(html, {encoding: 'UTF-8'}).pipe(res);
    });
  });
};

exports.simulate = function(req, res) {
  findRequest(req, function(err, request) {
    if (!request) return res.sendStatus(404);
    var prestations = Prestation.simulate(request.formAnswers);
    return res.json(prestations);
  });
};

function handleError(req, res, err) {
  req.log.error(err);
  return res.status(500).send(err);
}
