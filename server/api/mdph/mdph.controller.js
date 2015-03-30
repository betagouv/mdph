'use strict';

var _ = require('lodash');
var Mdph = require('./mdph.model');
var User = require('../user/user.model');
var path = require('path');

// Get all users linked to a single mdph
exports.showUsers = function(req, res) {
  Mdph.findOne({zipcode: req.params.id}, function (err, mdph) {
    if(err) { return handleError(req, res, err); }
    if(!mdph) { return res.sendStatus(404); }
      User.find({
        mdph: mdph._id
      }, function (err, list) {
        if(err) { return handleError(req, res, err); }
        if(!list) { return res.sendStatus(404); }
        return res.json(list);
      });
  });
};

// Get list of mdphs
exports.index = function(req, res) {
  Mdph.find().sort('zipcode').exec(function(err, mdphs) {
    if(err) { return handleError(req, res, err); }
    return res.json(mdphs);
  });
};

// Get a single mdph by zipcode
exports.show = function(req, res) {
  Mdph.findOne({zipcode: req.params.id}, function (err, mdph) {
    if(err) { return handleError(req, res, err); }
    if(!mdph) { return res.sendStatus(404); }
    return res.json(mdph);
  });
};

// Creates a new mdph in the DB.
exports.create = function(req, res) {
  Mdph.create(req.body, function(err, mdph) {
    if(err) { return handleError(req, res, err); }
    return res.status(201).json(mdph);
  });
};

// Updates an existing mdph in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Mdph.findOne({
    id: req.params.id
  }, function (err, mdph) {
    if (err) { return handleError(req, res, err); }
    if(!mdph) { return res.sendStatus(404); }
    var updated = _.merge(mdph, req.body);
    updated.save(function (err) {
      if (err) { return handleError(req, res, err); }
      return res.status(200).json(mdph);
    });
  });
};

// Deletes a mdph from the DB.
exports.destroy = function(req, res) {
  Mdph.findOne({
    id: req.params.id
  }, function (err, mdph) {
    if(err) { return handleError(req, res, err); }
    if(!mdph) { return res.sendStatus(404); }
    mdph.remove(function(err) {
      if(err) { return handleError(req, res, err); }
      return res.sendStatus(204);
    });
  });
};

exports.list = function(req, res) {
  res.status(200).sendFile(path.join(__dirname, '/', 'mdph.json'));
};

function handleError(req, res, err) {
  req.log.error(err);
  return res.status(500).send(err);
}
