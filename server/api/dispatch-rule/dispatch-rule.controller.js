'use strict';

import DispatchRule from './dispatch-rule.model';

// Get list of DispatchRule
export function index(req, res) {
  let mdph;

  if (req.query.mdph) {
    mdph = req.query.mdph;
  } else {
    mdph = req.user.mdph;
  }

  DispatchRule
    .find({mdph: mdph})
    .populate('secteur.enfant secteur.adulte')
    .sort('createdAt')
    .exec(function(err, rules) {
      if (err) { return handleError(req, res, err); }

      return res.json(rules);
    });
}

export function show(req, res) {
  DispatchRule
    .findById(req.params.id)
    .populate('secteur.enfant secteur.adulte')
    .exec(function(err, rule) {
    if (err) { return handleError(req, res, err); }

    if (!rule) { return res.sendStatus(404); }

    return res.json(rule);
  });
}

export function update(req, res) {
  DispatchRule.findById(req.params.id, function(err, rule) {
    if (err) { return handleError(req, res, err); }

    if (!rule) { return res.sendStatus(404); }

    rule
      .set('secteur', req.body.secteur)
      .set('commune', req.body.commune)
      .set('mdph', req.body.mdph)
      .save(function(err) {
        if (err) { return handleError(req, res, err); }

        return res.status(200).json(rule);
      });
  });
}

// Creates a new partenaire in the DB.
export function create(req, res) {
  if (req.body._id) {
    return update(req, res);
  } else {
    DispatchRule.create(req.body, function(err, rule) {
      if (err) { return handleError(req, res, err); }

      return res.status(201).json(rule);
    });
  }
}

// Deletes a partenaire from the DB.
export function destroy(req, res) {
  DispatchRule.findById(req.params.id).remove().exec(function(err) {
    if (err) { return handleError(req, res, err); }

    return res.sendStatus(204);
  });
}

function handleError(req, res, err) {
  req.log.error(err);
  return res.status(500).send(err);
}
