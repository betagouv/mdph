'use strict';

var _ = require('lodash');
var DispatchRule = require('./dispatch-rule.model');
var path = require('path');

// Get list of DispatchRule
exports.index = function(req, res) {
  DispatchRule
    .find()
    .populate('secteur.enfant secteur.adulte')
    .sort('createdAt')
    .exec(function(err, rules) {
      if(err) { return handleError(req, res, err); }
      return res.json(rules);
    });
};

exports.show = function(req, res) {
  DispatchRule
    .findById(req.params.id)
    .populate('secteur.enfant secteur.adulte')
    .exec(function (err, rule) {
    if (err) { return handleError(req, res, err); }
    if(!rule) { return res.sendStatus(404); }
    return res.json(rule);
  });
};

var update = function(req, res) {
  DispatchRule.findById(req.params.id, function (err, rule) {
    if (err) { return handleError(req, res, err); }
    if(!rule) { return res.sendStatus(404); }

    rule
      .set('secteur', req.body.secteur)
      .set('commune', req.body.commune)
      .set('mdph', req.body.mdph)
      .save(function (err) {
        if (err) { return handleError(req, res, err); }
        return res.status(200).json(rule);
      });
  });
};

exports.update = update;

// Creates a new partenaire in the DB.
exports.create = function(req, res) {
  if (req.body._id) {
    return update(req, res);
  } else {
    DispatchRule.create(req.body, function(err, rule) {
      if (err) { return handleError(req, res, err); }
      return res.status(201).json(rule);
    });
  }
};

// Deletes a partenaire from the DB.
exports.destroy = function(req, res) {
  DispatchRule.findById(req.params.id).remove().exec(function(err) {
    if (err) { return handleError(req, res, err); }
    return res.sendStatus(204);
  });
};

function handleError(req, res, err) {
  req.log.error(err);
  return res.status(500).send(err);
}

