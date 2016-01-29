'use strict';

var _ = require('lodash');
var Partenaire = require('./partenaire.model');
var Request = require('../request/request.model');
var Mdph = require('../mdph/mdph.model');
var path = require('path');
var shortid = require('shortid');
var Mailer = require('../send-mail/send-mail.controller');

exports.show = function(req, res) {
  Partenaire.findById(req.params.id, function(err, partenaire) {
    if (err) { return handleError(req, res, err); }

    if (!partenaire) { return res.sendStatus(404); }

    return res.json(partenaire);
  });
};

// Save a partenaire in the DB.
exports.save = function(req, res) {
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

          req.body.mdph = mdph;

          Partenaire.create(req.body, function(err, partenaire) {
            if (err) { return handleError(req, res, err); }

            partenaire.secret = shortid.generate();
            partenaire.save(function(err) {
              if (err) { return handleError(req, res, err); }

              var confirmationUrl = 'http://' + req.headers.host + '/api/partenaires/' + partenaire._id + '/' + partenaire.secret;
              Mailer.sendMail(
                partenaire.email,
                'Validez votre adresse',
                'Vous avez demandé à ajouter une pièce dans un dossier usager sur notre service. Veuillez cliquer ici pour valider votre adresse :<br>' + confirmationUrl
              );
              return res.status(201).json(partenaire);
            });
          });
        });
      });
    }
  });

};

// Deletes a partenaire from the DB.
exports.destroy = function(req, res) {
  Partenaire.remove({id: req.params.id}, function(err) {
    if (err) { return handleError(req, res, err); }

    return res.sendStatus(204);
  });
};

exports.confirm = function(req, res) {
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
};

function handleError(req, res, err) {
  req.log.error(err);
  return res.status(500).send(err);
}
