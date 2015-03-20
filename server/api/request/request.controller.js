'use strict';

var _ = require('lodash');
var path = require('path');
var superagent = require('superagent');
var auth = require('../../auth/auth.service');
var config = require('../../config/environment');
var Request = require('./request.model');
var User = require('../user/user.model');
var Mdph = require('../mdph/mdph.model');
var Mailer = require('../send-mail/send-mail.controller');
var Flattener = require('../../components/flatten');
var Recapitulatif = require('../../components/recapitulatif');
var wkhtmltopdf = require('wkhtmltopdf');
var Grid = require('gridfs-stream');
var mongoose = require('mongoose');
var fs = require('fs');
var Busboy = require('busboy');

var gfs = new Grid(mongoose.connection.db, mongoose.mongo);

/**
 * Get list of requests
 */
exports.index = function(req, res) {

  Mdph.findById(req.user.mdph, function(err, mdph) {
    if (err) return handleError(res, err);
    if (!mdph) return res.send(404);

    var search = {
      mdph: mdph.zipcode
    };

    var query = req.query;

    if (query) {
      if (query.evaluator) {
        if (query.evaluator === 'null') {
          search.evaluator = undefined;
        } else {
          search.evaluator = query.evaluator;
        }
      }
    }

    Request.find(search)
      .select('-formAnswers')
      .populate('user', 'name')
      .sort('createdAt')
      .exec(function(err, requests) {
        if(err) return res.send(500, err);

        res.set('count', requests.length);
        return res.send(requests);
      });
  });
};

// Get a single request
exports.show = function(req, res, next) {
  Request.findOne({
    shortId: req.params.shortId
  })
  .exec(function(err, request) {
    if (err) return res.send(500, err);
    if(!request) { return res.send(404); }
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
    if (err) return res.send(500, err);
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
  .select('shortId mdph updatedAt createdAt status')
  .populate('user', 'name')
  .sort('-updatedAt')
  .exec(function(err, requests) {
    if (err) return res.send(500, err);
    if (!requests) return res.json(401);
    res.json(requests);
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

    request
      .set(_.omit(req.body, 'html'))
      .set('updatedAt', Date.now())
      .save(function (err, result) {
        if (err) { return handleError(res, err); }
        return res.json(result);
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
exports.saveFile = function (req, res, next) {
  var processingFiles = 0;

  Request.findOne({shortId: req.params.shortId}, function (err, request) {
    if (err) return res.send(500, err);
    if (!request) return res.send(404);

    var busboy = new Busboy({ headers: req.headers });

    var field;
    var file;

    busboy.on('field', function(fieldname, val) {
      try {
        field = JSON.parse(val);
      } catch (e) {
        field = val;
      }
    });

    busboy.on('file', function(fieldname, stream, filename, encoding, contentType) {
      processingFiles++;
      console.log('POST ' + req.originalUrl + ' File: '+ filename + ' Field: ' + fieldname);

      var ws = gfs.createWriteStream({
        mode: 'w',
        content_type: contentType,
        filename: filename
      });

      ws.on('close', function (data) {
        file = data;
        processingFiles--;
      });

      stream.pipe(ws);
    });

    // form error (ie fileupload-cancel)
    busboy.on('error', function(err) {
      res.send(500, 'Error', err);
    });

    var finish = function() {

      // wait until all files are finished
      if (processingFiles > 0) {
        setTimeout(finish, 200);
        return;
      }

      if (res.finished) {
        return;
      }

      if (typeof request.documents === 'undefined') {
        request.documents = [];
      }

      // if (req.query.partenaire) {
      //   re.
      // }
      var document = {
        gridFile: file._id,
        type: field.type
      };

      request.documents.push(document);

      request.save(function(err, saved) {
        if (err) { return handleError(res, err); }
        res.json(document);
      });
    };

    busboy.on('finish', finish);

    req.pipe(busboy);
 });
};

exports.showFileData = function(req, res) {
  gfs.findOne({ _id: req.params.fileId}, function (err, file) {
    res.json(file);
  });
};

exports.downloadFile = function(req, res) {
  var readstream = gfs.createReadStream({
    _id: req.params.fileId
  });

  req.on('error', function(err) {
    res.send(500, err);
  });

  readstream.on('error', function (err) {
    res.send(500, err);
  });

  readstream.pipe(res);
};

exports.getRecapitulatif = function(req, res) {
  Request.findOne({shortId: req.params.shortId}, function (err, request) {
    if (!request) return res.send(404);
    Recapitulatif.answersToHtml(request, req.headers.host, 'inline', function(err, html) {
      if (err) { res.send(500, err); }
      res.send(html).status(200);
    });
  });
}

exports.getCerfa = function(req, res) {
  Request.findOne({shortId: req.params.shortId}, function (err, request) {
    if (!request) return res.send(404);
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

exports.getPdf = function(req, res) {
  Request.findOne({shortId: req.params.shortId}, function (err, request) {
    if (!request) return res.send(404);
    Recapitulatif.answersToHtml(request, req.headers.host, 'pdf', function(err, html) {
      if (err) { res.send(500, err); }
      wkhtmltopdf(html, {encoding: 'UTF-8'}).pipe(res);
    });
  });
};

function handleError(res, err) {
  res.send(500, err);
}
