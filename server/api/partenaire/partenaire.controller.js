'use strict';

var _ = require('lodash');
var Partenaire = require('./partenaire.model');
var path = require('path');

// Get list of partenaires
exports.index = function(req, res) {
  Partenaire.find().sort('email').exec(function(err, partenaires) {
    if(err) { return handleError(res, err); }
    return res.json(partenaires);
  });
};

// Creates a new partenaire in the DB.
exports.create = function(req, res) {
  Partenaire.create(req.body, function(err, partenaire) {
    if(err) { 
    	if(err.code===11000){
    		return res.sendStatus(409);
    	}
    	return handleError(res, err);
	}
    return res.status(201).json(partenaire);
  });
};

// Updates an existing partenaire in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Partenaire.findById(req.params.id, function (err, partenaire) {
    if (err) { return handleError(res, err); }
    if(!partenaire) { return res.send(404); }
    var updated = _.merge(partenaire, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(partenaire);
    });
  });
};

// Deletes a partenaire from the DB.
exports.destroy = function(req, res) {
  Partenaire.findById(req.params.id, function (err, partenaire) {
    if(err) { return handleError(res, err); }
    if(!partenaire) { return res.send(404); }
    partenaire.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}

