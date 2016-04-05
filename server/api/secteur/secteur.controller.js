'use strict';

import _ from 'lodash';
import Secteur from './secteur.model';
import Request from '../request/request.model';
import Mdph from '../mdph/mdph.model';

export function index(req, res) {
  const mdph = req.query.mdph ? req.query.mdph : req.user.mdph;

  Secteur
    .find({mdph: mdph})
    .sort('name')
    .populate('evaluators.enfant evaluators.adulte')
    .exec(function(err, secteurs) {
      if (err) { return handleError(req, res, err); }

      return res.json(secteurs);
    });
}

export function show(req, res) {
  Secteur
    .findById(req.params.id)
    .exec(function(err, secteur) {
      if (err) { return handleError(req, res, err); }

      if (!secteur) { return res.sendStatus(404); }

      return res.json(secteur);
    });
}

export function update(req, res) {
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
}

// Creates a new partenaire in the DB.
export function create(req, res) {
  if (req.body._id) {
    return update(req, res);
  } else {
    Secteur.create(req.body, function(err, secteur) {
      if (err) { return handleError(req, res, err); }

      return res.status(201).json(secteur);
    });
  }
}

// Deletes a partenaire from the DB.
export function destroy(req, res) {
  Secteur.findById(req.params.id).remove().exec(function(err) {
    if (err) { return handleError(req, res, err); }

    return res.sendStatus(204);
  });
}

function handleError(req, res, err) {
  req.log.error(err);
  return res.status(500).send(err);
}
