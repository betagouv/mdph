'use strict';

var _ = require('lodash');
var Partenaire = require('./partenaire.model');
var path = require('path');


// Get list of partenaires
exports.index = function(req, res) {
  Partenaire
    .find({certified: req.query.status})
    .sort('email')
    .exec(function(err, partenaires) {
      if(err) { return handleError(res, err); }
      res.set('count', partenaires.length);
      return res.json(partenaires);
    });
};

exports.show = function(req, res) {
  Partenaire.findById(req.params.id, function (err, partenaire) {
    if (err) { return handleError(res, err); }
    if(!partenaire) { return res.send(404); }
    return res.json(partenaire);
  });
};

// Updates an existing partenaire in the DB.
exports.update = function(req, res) {
  Partenaire.findById({id: req.params.id}, function (err, partenaire) {
    if (err) { return handleError(res, err); }
    if(!partenaire) { return res.send(404); }
    var updated = _.merge(partenaire, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(partenaire);
    });
  });
};

// Creates a new partenaire in the DB.
exports.create = function(req, res) {
  Partenaire.findOne({email: req.body.email}).exec(function(err, partenaire) {
    if (partenaire) {
      return res.status(200).json(partenaire);
    } else {
      Partenaire.create(req.body, function(err, partenaire) {
        if (err) { return handleError(res, err); }
        return res.status(201).json(partenaire);
      });
    }
  });

};

// Deletes a partenaire from the DB.
exports.destroy = function(req, res) {
  Partenaire.remove({id: req.params.id}, function(err) {
    if(err) { return handleError(res, err); }
    return res.send(204);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}

