'use strict';

var Mailjet = require('../../mailjet/mailjet');
var Request = require('../request/request.model');

var Config;
try {
  Config = require('../../config/local.env');
} catch (ex) {
  Config = require('../../config/local.env.sample');
}

var mailjet = new Mailjet(Config.API_KEY, Config.SECRET_KEY);

/**
 * Update request
 */
exports.save = function(req, res, next) {
  if (req.body && req.body.secret) {
    delete req.body.secret;
  }
  Request.findOne({
    shortId: req.params.shortId
  }, function(err, request) {
    if (err) return next(err);
    if (!request) return next(err);

    request.certificat = req.body;
    request.certificat.secret = "chuuuuuut";
    request.save(function (err) {
      if (err) { return handleError(res, err); }

      mailjet.sendContent(
        req.body.coordonnees.email,
        'Impact - Validez votre adresse mail',
        'Vous venez d\'envoyer un certificat médical sur notre site, merci de valider votre adresse.<a href="http://localhost:9000/cm/' + request.shortId + '/' + request.certificat.secret + '"><h1>Cliquez ici</h1></a></div>'
      );

      return res.json(200, req.body.coordonnees.email);
    });
  });
};

/**
 * Validate certificat
 */
exports.validate = function(req, res, next) {
  Request.findOne({
    shortId: req.params.shortId
  }, function(err, request) {
    if (err) return next(err);
    if (!request) return next(err);
    if (request.certificat.secret === req.body.secret) {
      request.certificat.validate = true;
      request.save(function (err) {
        if (err) { return handleError(res, err); }
        return res.send(200);
      });
    } else {
      return res.send(500);
    }
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
