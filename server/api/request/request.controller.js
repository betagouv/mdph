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

/**
 * Get list of requests
 */
exports.index = function(req, res) {
  if (req.query) {
    var search = {};
    if (req.query.opened) {
      search.opened = req.query.opened;
    }
    if (req.query.evaluator) {
      if (req.query.evaluator === 'null') {
        search.evaluator = undefined;
      } else {
        search.evaluator = req.query.evaluator;
      }
    }

    search.mdph =  req.user.mdph;
    Request.find(search)
      .select('shortId user mdph steps requestStatus createdAt updatedAt formAnswers.contexte.urgences')
      .populate('user', 'name')
      .populate('mdph')
      .sort('createdAt')
      .exec(function(err, requests) {
        if(err) return res.send(500, err);
        res.json(200, requests);
      });
  } else {
    Request.find({mdph: req.user.mdph})
      .sort('createdAt')
      .exec(function(err, requests) {
        if(err) return res.send(500, err);
        res.json(200, requests);
      });
  }
};

// Get a single request
exports.show = function(req, res, next) {
  Request.findOne({
    shortId: req.params.shortId
  })
  .populate('user mdph', '-password -salt')
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
  .populate('user mdph', '-password -salt')
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
  .populate('mdph -formAnswers')
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
    if (!request) return res.send(400);

    if (req.body.html) {
      Mailer.sendMail(req.body.html, req.user.email);
    }

    updateIfn(request, req.body, 'user');
    updateIfn(request, req.body, 'mdph');
    updateIfn(request, req.body, 'evaluator');

    request
      .set(_.omit(req.body, ['user', 'mdph', 'evaluator']))
      .set('updatedAt', Date.now())
      .save(function(err, data) {
        if(err) return res.send(500, err);
        data.populate('user mdph evaluator', function(err, data) {
          if(err) return res.send(500, err);
          return res.json(data);
        });
      });
    });
};

/**
 * Save request
 */
exports.save = function(req, res, next) {
  var request = new Request();

  request.opened = true;
  request.user = req.user._id;
  request.updatedAt = new Date();
  request.createdAt = new Date();
  request.formAnswers = req.body.formAnswers;
  request.mdph = req.body.mdph._id;
  request.steps = req.body.steps;

  request.save(function(err, data) {
    if(err) return res.send(500, err);

    if (req.body.html) {
      Mailer.sendMail(req.body.html, req.user.email);
    }

    return res.send(200, data);
  });
};

/**
 * File upload
 * Exemple de req.body
 *  step: 'complementaire',
 *  partenaire: partenaire,
 *  uploaderType: 'Partenaire'
 */
exports.saveDocument = function (req, res, next) {
    Request.findOne({shortId: req.params.shortId}, function (err, request) {
      if (err) return next(err);
      var formStep = _.find(request.steps, {name: req.body.step});
      var formStepDocument = _.find(formStep.files, {name: req.body.name});
      formStepDocument.path = path.basename(req.files.file.path);
      formStepDocument.state = 'telecharge';
      if (req.body.partenaire) {
          formStepDocument.partenaire = req.body.partenaire;
        }

      request.save(function(err) {
        if (err) {return handleError(res, err); }
        if (req.body.partenaire) {
          console.log('Partenaire: ', req.body.partenaire);
          // Do something with partenaire
        }
        res.send(request);
      });
    });
};

exports.getCerfa = function(req, res) {
  Request.findOne({shortId: req.params.shortId}, function (err, request) {
    var flattenedAnswers = Flattener.flatten(request.formAnswers);

    superagent
        .post(config.cerfaFormFillerUrl + '/impact')
        .send(request)
        .on('error', function() {
            res.send(500);
        })
        .pipe(res);
  });
};

function handleError(res, err) {
  res.send(500, err);
}
