'use strict';

var _ = require('lodash');
var Mdph = require('./mdph.model');
var User = require('../user/user.model');

// Get all users linked to a single mdph
exports.showUsers = function(req, res) {
  User.find({
    mdph: req.params.id
  }, function (err, list) {
    if(err) { return handleError(res, err); }
    if(!list) { return res.send(404); }
    return res.json(list);
  });
};

// Get list of mdphs
exports.index = function(req, res) {
  Mdph.find().sort('zipcode').exec(function(err, mdphs) {
    if(err) { return handleError(res, err); }
    return res.json(mdphs);
  });
};

// Get a single mdph
exports.show = function(req, res) {
  Mdph.findById(req.params.id, function (err, mdph) {
    if(err) { return handleError(res, err); }
    if(!mdph) { return res.send(404); }
    return res.json(mdph);
  });
};

// Creates a new mdph in the DB.
exports.create = function(req, res) {
  Mdph.create(req.body, function(err, mdph) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(mdph);
  });
};

// Updates an existing mdph in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Mdph.findById(req.params.id, function (err, mdph) {
    if (err) { return handleError(res, err); }
    if(!mdph) { return res.send(404); }
    var updated = _.merge(mdph, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(mdph);
    });
  });
};

// Deletes a mdph from the DB.
exports.destroy = function(req, res) {
  Mdph.findById(req.params.id, function (err, mdph) {
    if(err) { return handleError(res, err); }
    if(!mdph) { return res.send(404); }
    mdph.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
