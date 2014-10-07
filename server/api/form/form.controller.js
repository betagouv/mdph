'use strict';

var _ = require('lodash');
var Form = require('./form.model');
var auth = require('../../auth/auth.service');
var User = require('../user/user.model');
var path = require('path');
var config = require('../../config/environment');

// Obtenir la liste des demande pour la mdph de l'utilisateur
exports.index = function(req, res) {
  Form
   .find()
   .populate('user')
   .exec(function (err, forms) {
    if(err) { return handleError(res, err); }
    if (!forms) {
      return res.json(200);
    }
    var filteredForms = forms.filter(function(form){
      return form.user.mdph.equals(req.user.mdph);
    });
    return res.json(200, filteredForms);
  });
};

// Get a single form
exports.show = function(req, res, next) {
  Form.findById(req.params.id)
  .populate('user')
  .exec(function(err, form) {
    if(err) { return next(err); }
    if(!form) { return res.send(404); }
    return res.json(form);
  });
};

// Creates a new form in the DB.
exports.create = function(req, res) {
  Form.create(req.body, function(err, form) {
    if(err) { return handleError(res, err); }
    return res.json(201, form);
  });
};

// Updates an existing form in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Form.findById(req.params.id, function (err, form) {
    if (err) { return handleError(res, err); }
    if(!form) { return res.send(404); }
    var updated = _.merge(form, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, form);
    });
  });
};

// Deletes a form from the DB.
exports.destroy = function(req, res) {
  Form.findById(req.params.id, function (err, form) {
    if(err) { return handleError(res, err); }
    if(!form) { return res.send(404); }
    form.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

/**
 * Get my form
 */
exports.mine = function(req, res, next) {
  var userId = req.user._id;
  Form.findOne({
    user: userId
  }, function(err, form) {
    if (err) return next(err);
    if (!form) return res.send(404);
    res.json(form);
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
 * Save my form
 */
exports.saveForm = function(req, res, next) {
  var userId = req.user._id;

  Form.findOne({
    user: userId
  }, function(err, form) {
    if (err) return next(err);
    if(form) {
      // On ne peut sauvegarder qu'une fois le formulaire
      return res.send(423);
    }

    var newForm = new Form({
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
            { name: 'certificatMedical', state: 'demande' },
            { name: 'carteIdentite', state: 'demande' }
          ]
        }
      ]
    });

    saveMdphForUser(userId, newForm.formAnswers.contexte.mdph._id, res);

    newForm.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, form);
    });
  });
};

/**
 * File upload
 */
exports.saveDocument = function (req, res, next) {
    var file = req.files.file;
    var stepName = req.body.stepName;

    Form.findOne({
      user: req.user._id
    }, function(err, form) {
      if (err) return next(err);

      var formStep = _.find(form.steps, {name: stepName});
      var formStepDocument = _.find(formStep.files, {name: req.body.documentName});
      formStepDocument.path = path.basename(file.path);
      formStepDocument.state = 'telecharge';

      form.save(function(err) {
        if (err) {return handleError(res, err); }
      });

      res.send(formStepDocument.path);
    });
};

exports.updateDocumentState = function (req, res, next) {
  Form.findById(req.params.id, function (err, form) {
     if (err) return next(err);

     var formStep = _.find(form.steps, {name: req.body.stepName});
     var formStepDocument = _.find(formStep.files, {name: req.body.fileName});

     formStepDocument.state = req.body.state;

     form.save(function(err) {
       if (err) {return handleError(res, err); }
     });

     res.send(formStepDocument.state);
   });
};

exports.updateStep = function (req, res, next) {
  var stepName = req.body.step;
  var stateName = req.body.state;
  var files = req.body.files;

  Form.findById(req.params.id, function (err, form) {
    if (err) { return handleError(res, err); }
    if(!form) { return res.send(404); }

    var formStep = _.find(form.steps, {name: stepName});
    formStep.state = stateName;
    if (files && files.length > 0) {
      formStep.files = files;
    }

    form.save(function(err) {
      if (err) {return handleError(res, err); }
    });

    res.send(formStep);
  });
};

exports.saveStep = function (req, res, next) {
  var stepName = req.body.step;
  var stateName = req.body.state;
  var files = req.body.files;

  Form.findById(req.params.id, function (err, form) {
    if (err) { return handleError(res, err); }
    if(!form) { return res.send(404); }

    var formStep = {
      name: stepName,
      state: stateName,
      files: files
    };
    form.steps.push(formStep);

    form.save(function(err) {
      if (err) {return handleError(res, err); }
    });

    res.send(formStep);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
