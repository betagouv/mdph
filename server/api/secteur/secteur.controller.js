'use strict';

var _ = require('lodash');
var Secteur = require('./secteur.model');
var Request = require('../request/request.model');
var Mdph = require('../mdph/mdph.model');

exports.index = function(req, res) {
  let mdph;

  if (req.query.mdph) {
    mdph = req.query.mdph;
  } else {
    mdph = req.user.mdph;
  }

  Secteur
    .find({mdph: mdph})
    .sort('name')
    .populate('evaluators.enfant evaluators.adulte')
    .exec(function(err, secteurs) {
      if (err) { return handleError(req, res, err); }

      return res.json(secteurs);
    });
};

exports.show = function(req, res) {
  Secteur
    .findById(req.params.id)
    .populate('evaluators.enfant evaluators.adulte')
    .exec(function(err, secteur) {
    if (err) { return handleError(req, res, err); }

    if (!secteur) { return res.sendStatus(404); }

    return res.json(secteur);
  });
};

var update = function(req, res) {
  Secteur.findById(req.params.id, function(err, secteur) {
    if (err) { return handleError(req, res, err); }

    if (!secteur) { return res.sendStatus(404); }

    secteur
      .set('name', req.body.name)
      .set('evaluators', req.body.evaluators)
      .set('default', req.body.default)
      .set('updatedAt', Date.now())
      .save(function(err) {
        if (err) { return handleError(req, res, err); }

        return res.status(200).json(secteur);
      });
  });
};

exports.update = update;

// Creates a new partenaire in the DB.
exports.create = function(req, res) {
  if (req.body._id) {
    return update(req, res);
  } else {
    Secteur.create(req.body, function(err, secteur) {
      if (err) { return handleError(req, res, err); }

      return res.status(201).json(secteur);
    });
  }
};

// Deletes a partenaire from the DB.
exports.destroy = function(req, res) {
  Secteur.findById(req.params.id).remove().exec(function(err) {
    if (err) { return handleError(req, res, err); }

    return res.sendStatus(204);
  });
};

function handleError(req, res, err) {
  req.log.error(err);
  return res.status(500).send(err);
}
