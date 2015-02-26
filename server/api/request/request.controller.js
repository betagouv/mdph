'use strict';

var _ = require('lodash');
var path = require('path');
var superagent = require('superagent');
var auth = require('../../auth/auth.service');
var config = require('../../config/environment');
var Request = require('./request.model');
var User = require('../user/user.model');
var Mailer = require('../send-mail/send-mail.controller');
var Flattener = require('../../components/flatten');
var wkhtmltopdf = require('wkhtmltopdf');
var Grid = require('gridfs-stream');
var mongoose = require('mongoose');

var gfs = new Grid(mongoose.connection.db, mongoose.mongo);

/**
 * Get list of requests
 */
exports.index = function(req, res) {
  if (req.query) {
    var search = {};

    if (req.query.evaluator) {
      if (req.query.evaluator === 'null') {
        search.evaluator = undefined;
      } else {
        search.evaluator = req.query.evaluator;
      }
    }

    search.mdph =  req.user.mdph;
    Request.find(search)
      .select('shortId user mdph status createdAt updatedAt formAnswers.contexte.urgences')
      .sort('createdAt')
      .exec(function(err, requests) {
        if(err) return res.send(500, err);

        res.set('count', requests.length);
        res.json(200, requests);
      });
  } else {
    Request.find({mdph: req.user.mdph})
      .sort('createdAt')
      .exec(function(err, requests) {
        if(err) return res.send(500, err);

        res.set('count', requests.length);
        res.json(200, requests);
      });
  }
};

// Get a single request
exports.show = function(req, res, next) {
  Request.findOne({
    shortId: req.params.shortId
  })
  .exec(function(err, request) {
    if(err) { return next(err); }
    if(!request) { return res.send(404); }
    return res.json(request);
  });
};

// Get a single request
exports.showPartenaire = function(req, res, next) {
  Request.findOne({
    shortId: req.params.shortId
  })
  .exec(function(err, request) {
    if(err) { return next(err); }
    if(!request) { return res.send(404); }
    return res.json(request);
  });
};

// Deletes a request from the DB.
exports.destroy = function(req, res) {
  Request.findOne({shortId: req.params.shortId}, function (err, request) {
    if(err) { return handleError(res, err); }
    if(!request) { return res.send(404); }
    request.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
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
  .sort('-updatedAt')
  .exec(function(err, requests) {
    if (err) return next(err);
    if (!requests) return res.json(401);
    res.json(200, requests);
  });
};

/**
 * Update request
 */
var compare = function(current, value) {
  return !value ? current: value._id;
}

var updateIfn = function(request, body, field) {
  var newValue = compare(request[field], body[field]);
  if (newValue) {
    request.set(field, newValue);
  }
}

exports.update = function(req, res, next) {
  Request.findOne({shortId: req.params.shortId}, function (err, request) {
    if (err) return res.send(500, err);
    if (!request) return res.send(404);

    if (req.body.html) {
      Mailer.sendMail(req.body.html, req.user.email);
    }

    var updated = _.merge(request, _.omit(req.body, 'html'));

    updated
      .set('updatedAt', Date.now())
      .save(function (err) {
        if (err) { return handleError(res, err); }
        return res.json(200, request);
      });

    // updateIfn(request, req.body, 'user');
    // updateIfn(request, req.body, 'mdph');
    // updateIfn(request, req.body, 'evaluator');
    // updateIfn(request, req.body, 'status');

    // request
    //   .set(_.omit(req.body, ['user', 'mdph', 'evaluator']))
    //   .set('updatedAt', Date.now())
    //   .save(function(err, data) {
    //     if(err) return res.send(500, err);
    //     data.populate('user mdph evaluator', function(err, data) {
    //       if(err) return res.send(500, err);
    //       return res.json(data);
    //     });
    //   });
  });
};

/**
 * Save request
 */
exports.save = function(req, res, next) {
  var now = Date.now();

  var newRequest = _.assign(
    _.omit(req.body, 'html'),
    {'updatedAt': now}, {'createdAt': now}, {'user': req.user._id}
  );

  Request.create(newRequest, function(err, request) {
    if(err) return res.send(500, err);

    if (req.body.html) {
      Mailer.sendMail(req.body.html, req.user.email);
    }

    return res.send(201, request);
  });
};

/**
 * File upload
 */
exports.saveDocument = function (req, res, next) {
    Request.findOne({shortId: req.params.shortId}, function (err, request) {
      if (err) return next(err);

      var file = req.files.file;

      var ws = gfs.createWriteStream({
        mode: 'w',
        content_type: file.type,
        filename: file.name,
        metadata: req.body
      });

      ws.on('close', function (file) {
        var document = file.metadata.document;
        var requestDocument = _.find(request.documents, {id: document});

        if (typeof requestDocument === 'undefined') {
          request.documents.push({id: document, files: [file]});
        } else {
          requestDocument.files.push(file);
        }

        request.save(function(err) {
          if (err) {return handleError(res, err); }
          res.send(file);
        });
      });

      req.pipe(ws);
    });
};

exports.showFileData = function(req, res) {
  gfs.findOne({ _id: req.params.documentId}, function (err, file) {
    console.log(req.params.documentId);
    res.send(200, file);
  });
};

exports.downloadFile = function(req, res) {
   var readStream = gfs.createReadStream({
      _id: req.params.documentId
   });

   readStream.pipe(res);
};

exports.getCerfa = function(req, res) {
  Request.findOne({shortId: req.params.shortId}, function (err, request) {
    var flattenedAnswers = Flattener.flatten(request.formAnswers);
    var url = config.cerfaFormFillerUrl ? config.cerfaFormFillerUrl : 'https://sgmap-dds-cerfa-form-filler.herokuapp.com';
    superagent
        .post(url + '/impact')
        .send(flattenedAnswers)
        .on('error', function(err) {
          res.send(500, err);
        })
        .pipe(res);
  });
};

exports.postPdf = function(req, res) {
  wkhtmltopdf(req.body.htmlAnswers, {encoding: 'UTF-8'}).pipe(res);
};

function handleError(res, err) {
  res.send(500, err);
}
