'use strict';

var _ = require('lodash');
var Request = require('./request.model');
var auth = require('../../auth/auth.service');
var User = require('../user/user.model');
var path = require('path');
var config = require('../../config/environment');


/**
 * Get list of requests
 */
exports.index = function(req, res) {
  User.find({
    mdph: req.user.mdph
  }).exec(function (err, users) {
    if(err) return res.send(500, err);
    if (!users) {
      return res.json(200);
    }
    if (req.query && req.query.opened) {
      Request.find({opened: true})
        .where('user').in(users)
        .select('user')
        .populate('user')
        .exec(function(err, requests) {
          if(err) return res.send(500, err);
          res.json(200, requests);
        });
    } else {
      Request.find({}).where('user').in(users).exec(function(err, requests) {
        if(err) return res.send(500, err);
        res.json(200, requests);
      });
    }
  });
};

// Get a single request
exports.show = function(req, res, next) {
  Request.findById(req.params.id)
  .populate('user')
  .exec(function(err, request) {
    if(err) { return next(err); }
    if(!request) { return res.send(404); }
    return res.json(request);
  });
};

// Updates an existing request in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Request.findById(req.params.id, function (err, request) {
    if (err) { return handleError(res, err); }
    if(!request) { return res.send(404); }
    var updated = _.merge(request, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, request);
    });
  });
};

// Deletes a request from the DB.
exports.destroy = function(req, res) {
  Request.findById(req.params.id, function (err, request) {
    if(err) { return handleError(res, err); }
    if(!request) { return res.send(404); }
    request.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

/**
 * Update request
 */
exports.update = function(req, res, next) {
  Request.findOne({
    _id: req.params.id
  }, function(err, request) {
    if (err) return next(err);

    request.updatedAt = new Date();
    request.formAnswers = req.body.formAnswers;
    request.steps = req.body.steps;

    request.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, request);
    });
  });
};

/**
 * File upload
 */
exports.saveDocument = function (req, res, next) {
    var file = req.files.file;
    var stepName = req.body.stepName;

    Request.findOne({
      user: req.user._id
    }, function(err, request) {
      if (err) return next(err);

      var formStep = _.find(request.steps, {name: stepName});
      var formStepDocument = _.find(formStep.files, {name: req.body.documentName});
      formStepDocument.path = path.basename(file.path);
      formStepDocument.state = 'telecharge';

      request.save(function(err) {
        if (err) {return handleError(res, err); }
      });

      res.send(formStepDocument.path);
    });
};

exports.updateDocumentState = function (req, res, next) {
  Request.findById(req.params.id, function (err, request) {
     if (err) return next(err);

     var formStep = _.find(request.steps, {name: req.body.stepName});
     var formStepDocument = _.find(formStep.files, {name: req.body.fileName});

     formStepDocument.state = req.body.state;

     request.save(function(err) {
       if (err) {return handleError(res, err); }
     });

     res.send(formStepDocument.state);
   });
};

exports.updateStep = function (req, res, next) {
  var stepName = req.body.step;
  var stateName = req.body.state;
  var files = req.body.files;

  Request.findById(req.params.id, function (err, request) {
    if (err) { return handleError(res, err); }
    if(!request) { return res.send(404); }

    var formStep = _.find(request.steps, {name: stepName});
    formStep.state = stateName;
    if (files && files.length > 0) {
      formStep.files = files;
    }

    request.save(function(err) {
      if (err) {return handleError(res, err); }
    });

    res.send(formStep);
  });
};

exports.saveStep = function (req, res, next) {
  var stepName = req.body.step;
  var stateName = req.body.state;
  var files = req.body.files;

  Request.findById(req.params.id, function (err, request) {
    if (err) { return handleError(res, err); }
    if(!request) { return res.send(404); }

    var formStep = {
      name: stepName,
      state: stateName,
      files: files
    };
    request.steps.push(formStep);

    request.save(function(err) {
      if (err) {return handleError(res, err); }
    });

    res.send(formStep);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
