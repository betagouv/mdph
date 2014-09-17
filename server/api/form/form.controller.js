'use strict';

var _ = require('lodash');
var Form = require('./form.model');
var auth = require('../../auth/auth.service');
var User = require('../user/user.model');

// Get list of forms
exports.index = function(req, res) {
  Form.find().populate('user').exec(function (err, forms) {
    if(err) { return handleError(res, err); }
    return res.json(200, forms);
  });
};

// Get a single form
exports.show = function(req, res, next) {
  Form.findById(req.params.id, function (err, form) {
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

/**
 * Save my form
 */
exports.saveForm = function(req, res, next) {
  var userId = req.user._id;

  Form.findOne({
    user: userId
  }, function(err, form) {
    if (err) return next(err);
    var newForm;
    if(!form) {
      newForm = new Form();
      newForm.user = userId;
    } else {
      // Si readOnly on ne fait rien
      if (form.readOnly) {
        return res.send(423);
      }
      newForm = form;
    }
    newForm.formAnswers = req.body;

    User.findById(userId, function (err, user) {
      user.mdph = newForm.formAnswers.contexte.answers.mdph._id;
      user.save(function(err){
        if (err) {return handleError(res, err); }
      });
    });

    // A verifier, pour l'instant des que le formulaire est en base il est readOnly
    newForm.readOnly = true;
    newForm.updatedAt = new Date();

    newForm.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, form);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
