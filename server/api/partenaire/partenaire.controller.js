'use strict';

import _ from 'lodash';
import Partenaire from './partenaire.model';
import Request from '../request/request.model';
import Mdph from '../mdph/mdph.model';
import path from 'path';
import shortid from 'shortid';

export function show(req, res) {
  Partenaire.findById(req.params.id, function(err, partenaire) {
    if (err) { return handleError(req, res, err); }

    if (!partenaire) { return res.sendStatus(404); }

    return res.json(partenaire);
  });
}

// Save a partenaire in the DB.
export function save(req, res) {
  Partenaire.findOne({email: req.body.email}).exec(function(err, partenaire) {
    if (err) { return handleError(req, res, err); }

    if (partenaire) {
      var updated = _.merge(partenaire, req.body);
      updated.save(function(err) {
        if (err) { return handleError(req, res, err); }

        return res.status(200).json(partenaire);
      });
    } else {
      Request.findOne({shortId: req.query.shortId}, function(err, request) {
        if (err) { return handleError(req, res, err); }

        if (!request) {
          return res.sendStatus(404);
        }

        Mdph.findOne({zipcode: request.mdph}, function(err, mdph) {
          if (err) { return handleError(req, res, err); }

          req.body.mdph = mdph._id;

          Partenaire.create(req.body, function(err, partenaire) {
            if (err) { return handleError(req, res, err); }

            partenaire.secret = shortid.generate();
            partenaire.save(function(err) {
              if (err) { return handleError(req, res, err); }

              return res.status(201).json(partenaire);
            });
          });
        });

      });
    }
  });
}

// Deletes a partenaire from the DB.
export function destroy(req, res) {
  Partenaire.remove({id: req.params.id}, function(err) {
    if (err) { return handleError(req, res, err); }

    return res.sendStatus(204);
  });
}

export function confirm(req, res) {
  Partenaire.findById(req.params.id, '+secret', function(err, partenaire) {
    if (err) { return handleError(req, res, err); }

    if (!partenaire) { return res.sendStatus(404); }

    if (req.params.secret === partenaire.secret) {
      partenaire.secret = '';
      partenaire.certified = 'en_attente';
      partenaire.save(function(err) {
        if (err) { return handleError(req, res, err); }

        res.redirect('http://' + req.headers.host + '/partenaire/mail_valide');
      });
    } else {
      res.sendStatus(400);
    }
  });
}

function handleError(req, res, err) {
  req.log.error(err);
  return res.status(500).send(err);
}
