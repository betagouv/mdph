'use strict';

var _ = require('lodash');
var Secteur = require('./secteur.model');

exports.index = function(req, res) {
  Secteur
    .find()
    .sort('name')
    .populate('evaluators')
    .exec(function(err, secteurs) {
      if(err) { return handleError(req, res, err); }
      return res.json(secteurs);
    });
};

exports.show = function(req, res) {
  Secteur
    .findById(req.params.id)
    .populate('evaluators')
    .exec(function (err, secteur) {
    if (err) { return handleError(req, res, err); }
    if(!secteur) { return res.sendStatus(404); }
    return res.json(secteur);
  });
};

exports.update = function(req, res) {
  Secteur.findById(req.params.id, function (err, secteur) {
    if (err) { return handleError(req, res, err); }
    if(!secteur) { return res.sendStatus(404); }

    secteur
      .set('name', req.body.name)
      .set('evaluators', req.body.evaluators)
      .set('updatedAt', Date.now())
      .save(function (err) {
        if (err) { return handleError(req, res, err); }
        return res.status(200).json(secteur);
      });
  });
};

// Creates a new partenaire in the DB.
exports.create = function(req, res) {
  Secteur.create(req.body, function(err, secteur) {
    if (err) { return handleError(req, res, err); }
    return res.status(201).json(secteur);
  });
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

