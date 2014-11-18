'use strict';

var _ = require('lodash');
var path = require('path');
var auth = require('../../auth/auth.service');
var config = require('../../config/environment');
var Request = require('./request.model');
var User = require('../user/user.model');


/**
 * Get list of requests
 */
exports.index = function(req, res) {
  if (req.query && req.query.opened) {
    Request.find({opened: req.query.opened, mdph: req.user.mdph})
      .select('user mdph steps')
      .populate('user mdph')
      .exec(function(err, requests) {
        if(err) return res.send(500, err);
        res.json(200, requests);
      });
  } else {
    Request.find({mdph: req.user.mdph}).exec(function(err, requests) {
      if(err) return res.send(500, err);
      res.json(200, requests);
    });
  }
};

// Get a single request
exports.show = function(req, res, next) {
  Request.findById(req.params.id)
  .populate('user mdph')
  .exec(function(err, request) {
    if(err) { return next(err); }
    if(!request) { return res.send(404); }
    return res.json(request);
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
 * Create a new request for user
 */
exports.createRequest = function(req, res) {
  var request = new Request({
    user: req.user._id,
    updatedAt: new Date(),
    steps: req.body.steps,
    opened: true
  });
  request.save(function(err, request) {
    if(err) return res.send(500, err);
    return res.send(200, request);
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
exports.update = function(req, res, next) {
  Request.findOne({
    _id: req.params.id
  }, function(err, request) {
    if (err) return next(err);

    if (request.formAnswers) {
      return res.send(423);
    }
    request.updatedAt = new Date();
    request.formAnswers = req.body.formAnswers;
    request.mdph = req.body.mdph._id;
    request.steps = req.body.steps;

    request.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, request);
    });
  });
};


/**
 * Fake file upload
 */
exports.saveFakeDocument = function (req, res, next) {
  var file = req.body.file;
  var stepName = req.body.stepName;

  Request.findById(req.params.id, function (err, request) {
    if (err) return next(err);

    var formStep = _.find(request.steps, {name: stepName});
    var formStepDocument = _.find(formStep.files, {name: req.body.documentName});
    formStepDocument.path = file;
    formStepDocument.state = 'telecharge';

    request.save(function(err) {
      if (err) {return handleError(res, err); }
    });

    res.send(formStepDocument.path);
  });
};

/**
 * File upload
 */
exports.saveDocument = function (req, res, next) {
    var file = req.files.file;
    var stepName = req.body.stepName;

    Request.findById(req.params.id, function (err, request) {
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
