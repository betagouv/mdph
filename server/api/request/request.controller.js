'use strict';

var _ = require('lodash');
var path = require('path');
var superagent = require('superagent');
var wkhtmltopdf = require('wkhtmltopdf');
var Grid = require('gridfs-stream');
var mongoose = require('mongoose');
var fs = require('fs');
var shortid = require('shortid');
var async = require('async');
var scissors = require('scissors');
var Canvas = require('canvas');
var moment = require('moment');

var auth = require('../../auth/auth.service');
var config = require('../../config/environment');
var Flattener = require('../../components/flatten');
var Recapitulatif = require('../../components/recapitulatif');
var Dispatcher = require('../../components/dispatcher');
var Synthese = require('../../components/synthese');

var Prestation = require('../prestation/prestation.controller');
var Request = require('./request.model');
var User = require('../user/user.model');
var Partenaire = require('../partenaire/partenaire.model');
var Mdph = require('../mdph/mdph.model');
var Mailer = require('../send-mail/send-mail.controller');

var gfs = new Grid(mongoose.connection.db, mongoose.mongo);

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
      .sort('createdAt')
      .exec(function(err, requests) {
        if(err) return handleError(req, res, err);
        return res.send(requests);
      });
  });
}

// Get a single request
exports.show = function(req, res, next) {
  findRequest(req, function(err, request) {
    if (err) return handleError(req, res, err);
    if(!request) { return res.sendStatus(404); }
    return res.json(request);
  });
}

// Get a single request
exports.showPartenaire = function(req, res, next) {
  Request.findOne({
    shortId: req.params.shortId
  })
  .populate('user', 'name')
  .exec(function(err, request) {
    if (err) return handleError(req, res, err);
    if(!request) { return res.sendStatus(404); }
    return res.json(request);
  });
}

// Deletes a request from the DB.
exports.destroy = function(req, res) {
  findRequest(req, function (err, request) {
    if(err) return handleError(req, res, err);
    if(!request) return res.sendStatus(404);
    request.remove(function(err) {
      if(err) { return handleError(req, res, err); }
      return res.sendStatus(204);
    });
  });
}

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
}

/**
 * Update request
 */
exports.update = function(req, res, next) {

  async.waterfall([
    function(callback){
      findRequest(req, callback);
    },
    // Check is request exists
    function(request, callback){
      if (!request) {
        return res.sendStatus(404);
      }

      callback(null, request);
    },
    // Find evaluator through dispatcher
    function(request, callback) {
      var identites = request.formAnswers.identites;
      var dateNaissance = identites.beneficiaire.dateNaissance;
      var codePostal = identites.beneficiaire.code_postal;
      var estAdulte = moment().diff(dateNaissance, 'years') >= 18;
      var type = estAdulte ? 'adulte' : 'enfant';

      if (req.query.isSendingRequest) {
        Dispatcher.findSecteur(type, codePostal, function(secteur) {
          if (secteur) {
            request.set('secteur', secteur);

            if (secteur.evaluators && secteur.evaluators[type] && secteur.evaluators[type].length > 0) {
              var evaluators = secteur.evaluators[type].length;
              evaluators.forEach(function(evaluator) {
                Mailer.sendMail(evaluator.email, 'Vous avez reçu une nouvelle demande', 'Test');
              });
            }
          }
        });
      }

      callback(null, request);
    },
    // Set new request attributes
    function(request, callback){

      request
        .set(_.omit(req.body, 'html', 'user', 'documents'))
        .set('updatedAt', Date.now());

      callback(null, request);
    },
    // Save request
    function(request, callback) {
      request.save(callback);
    }
  ], function (err, request) {
    if (err) return handleError(req, res, err);

    if (req.body.html) {
      Mailer.sendMail(req.user.email, 'Récapitulatif de votre demande à la MDPH', req.body.html);
    }

    res.json(request);
  });
}

/**
 * Save request
 */
exports.save = function(req, res, next) {
  var now = Date.now();

  var newRequest = _.assign(
    _.omit(req.body, 'html'),
    {
      'updatedAt': now
    },
    {
      'createdAt': now
    },
    {
      'user': req.user._id
    }
  );

  Request.create(newRequest, function(err, request) {
    if(err) return handleError(req, res, err);
    return res.status(201).send(request);
  });
}



/**
 * File upload
 */
exports.saveFile = function (req, res, next) {
  if (!req.files || req.files.length === 0) {
    return res.sendStatus(304);
  }

  findRequest(req, function (err, request) {
    if (err) return handleError(req, res, err);
    if (!request) return res.sendStatus(404);

    var data = JSON.parse(req.body.data);
    var document = _.extend(req.files.file, {'type': data.type, 'category': data.category});

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

    request.documents.push(document);
    request.save(function(err, saved) {
      if (err) { return handleError(req, res, err); }
      return res.json(document);
    });
 });
}

exports.downloadFile = function(req, res) {
  var filePath = path.join(config.root + '/server/uploads/', req.params.fileName);
  var stat = fs.statSync(filePath);

  res.writeHead(200, {
    'Content-Length': stat.size
  });

  var readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
}

exports.deleteFile = function(req, res) {
  findRequest(req, function (err, request) {
    if (!request) return res.sendStatus(404);

    var file = request.documents.id(req.params.fileId);
    if (!file) {
      return res.sendStatus(304);
    }

    var filePath = path.join(config.root + '/server/uploads/', file.name);

    fs.unlink(filePath, function (err) {
      if (err) {
        req.log.info(req.user + ', not deleted, not found: ' + filePath);
      } else {
        req.log.info(req.user + ', successfully deleted: ' + filePath);
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
  findRequest(req, function (err, request) {
    if (!request) return res.sendStatus(404);
    Recapitulatif.answersToHtml(request, req.headers.host, 'inline', function(err, html) {
      if (err) { return handleError(req, res, err); }
      res.send(html).status(200);
    });
  });
}

exports.getCerfa = function(req, res) {
  findRequest(req, function (err, request) {
    if (!request) return res.sendStatus(404);
    var flattenedAnswers = Flattener.flatten(request.formAnswers);
    var url = 'https://sgmap-dds-cerfa-form-filler.herokuapp.com';
    superagent
        .post(url + '/impact')
        .send(flattenedAnswers)
        .on('error', function(err) {
          res.status(500).send(err);
        })
        .pipe(res);
  });
}

function groupDocuments(request, outputFile) {
  if (!request.documents) {
    return [];
  }

  var groupsFor59 = [
    {
      separator: 'sep_justificatifs.pdf',
      category: 'justificatifs',
      documents: []
    },
    {
      separator: 'sep_certificat.pdf',
      category: 'certificat',
      documents: []
    },
    {
      separator: 'sep_autres_bilans_medicaux.pdf',
      category: 'autres_bilans_medicaux',
      documents: []
    },
    {
      separator: 'sep_scolarite.pdf',
      category: 'scolarite',
      documents: []
    },
    {
      separator: 'sep_vie_pro.pdf',
      category: 'vie_pro',
      documents: []
    },
    {
      separator: 'sep_bilan_ems_sms.pdf',
      category: 'bilan_ems_sms',
      documents: []
    },
    {
      separator: 'sep_autres.pdf',
      category: 'autres',
      documents: []
    }
  ];

  var groupsFor59ByIdx = _.indexBy(groupsFor59, 'category');

  request.documents.forEach(function(document) {
    if (groupsFor59ByIdx[document.category]) {
      groupsFor59ByIdx[document.category].documents.push(document);
    } else {
      groupsFor59ByIdx.autres.documents.push(document);
    }
  });

  var localDocuments = [];
  groupsFor59.forEach(function(group) {
    if (group.documents.length > 0) {
      localDocuments.push(path.join(config.root + '/server/components/pdf_templates/' + group.separator));
      group.documents.forEach(function(document) {
        if (document.mimetype !== 'application/pdf') {
          var data = fs.readFileSync(path.join(config.root + '/server/uploads/', document.name));
          var img = new Canvas.Image();
          img.src = data;

          var canvas = new Canvas(img.width, img.height, 'pdf');
          var ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, img.width / 4, img.height / 4);

          var newPdfPath = path.join(config.root + '/server/uploads/' + document.name + '.pdf');
          fs.writeFileSync(newPdfPath, canvas.toBuffer());

          localDocuments.push(newPdfPath);
        } else {
          localDocuments.push(path.join(config.root + '/server/uploads/', document.name));
        }
      });
    }
  });

  console.log(localDocuments)
  var scissorDocuments = [];
  localDocuments.forEach(function(documentPath) {
    scissorDocuments.push(scissors(documentPath));
  });
  return scissorDocuments;
}

exports.getPdf = function(req, res) {
  findRequest(req, function (err, request) {
    if (!request) return res.sendStatus(404);
    Recapitulatif.answersToHtml(request, req.headers.host, 'pdf', function(err, html) {
      if (err) { return handleError(req, res, err); }

      if (request.mdph === '59' && req.user.role === 'adminMdph') {
        var outputFile = '.tmp/' + request.shortId + '.pdf';


        wkhtmltopdf(html, {encoding: 'UTF-8', output: outputFile}, function() {
          var scissorDocuments = [
            scissors(path.join(config.root + '/server/components/pdf_templates/sep_cerfa.pdf')),
            scissors(outputFile)
          ];

          var otherDocuments = groupDocuments(request, outputFile);
          if (otherDocuments && otherDocuments.length > 0) {
            otherDocuments.forEach(function(scissorDoc) {
              scissorDocuments.push(scissorDoc);
            });
          }

          return scissors.join.apply(scissors, scissorDocuments).pdfStream().pipe(res);
        });
      } else {
        wkhtmltopdf(html, {encoding: 'UTF-8'}).pipe(res);
      }
    });
  });
}

exports.getSynthesePdf = function (req, res) {
  findRequest(req, function (err, request) {
    if (!request) return res.sendStatus(404);
    Synthese.answersToHtml(request, req.headers.host, 'pdf', function(err, html) {
      if (err) { return handleError(req, res, err); }
      wkhtmltopdf(html, {encoding: 'UTF-8'}).pipe(res);
    });
  });
}

exports.simulate = function (req, res) {
  findRequest(req, function (err, request) {
    if (!request) return res.sendStatus(404);
    var prestations = Prestation.simulate(request.formAnswers);
    return res.json(prestations);
  });
}

function handleError(req, res, err) {
  req.log.error(err);
  return res.status(500).send(err);
}
