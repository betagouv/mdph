'use strict';

var _ = require('lodash');
var Request = require('./request.model');
var auth = require('../../auth/auth.service');
var User = require('../user/user.model');
var path = require('path');
var config = require('../../config/environment');

// Obtenir la liste des request pour la mdph de l'utilisateur
exports.index = function(req, res) {
  Request
   .find()
   .populate('user')
   .exec(function (err, requests) {
    if(err) { return handleError(res, err); }
    if (!requests) {
      return res.json(200);
    }
    var filtered = requests.filter(function(request){
      return request.user.mdph.equals(req.user.mdph);
    });
    return res.json(200, filtered);
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

// Creates a new request in the DB.
exports.create = function(req, res) {
  var request = new Request({
    user: req.user._id,
    updatedAt: new Date(),
    steps: [
      {
        name: 'questionnaire',
        state: 'en_cours'
      }
    ]
  });

  request.save(function (err) {
    if (err) { return handleError(res, err); }
    return res.json(201, request);
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
 * Get my request
 */
exports.mine = function(req, res, next) {
  var userId = req.user._id;
  Request.findOne({
    user: userId
  }, function(err, request) {
    if (err) return next(err);
    if (!request) return res.send(404);
    res.json(request);
  });
};

var saveMdphForUser = function(userId, mdphId, res) {
  User.findById(userId, function (err, user) {
    user.mdph = mdphId;
    user.save(function(err){
      if (err) {return handleError(res, err); }
    });
  });
};

/**
 * Save my request
 */
exports.save = function(req, res, next) {
  var userId = req.user._id;

  Request.findOne({
    user: userId
  }, function(err, request) {
    if (err) return next(err);
    if(request) {
      // On ne peut sauvegarder qu'une fois le formulaire
      return res.send(423);
    }

    request = new Request({
      user: userId,
      formAnswers: req.body,
      updatedAt: new Date(),
      // TODO Extraire la logique de traitement des etapes dans un service dedie
      steps: [
        {
          name: 'questionnaire',
          state: 'complet'
        },
        {
          name: 'obligatoire',
          state: 'en_cours',
          files: [
            { name: 'certificatMedical', state: 'request' },
            { name: 'carteIdentite', state: 'request' }
          ]
        }
      ]
    });

    saveMdphForUser(userId, request.formAnswers.contexte.mdph._id, res);

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
