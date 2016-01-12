'use strict';

var _ = require('lodash');
var Profile = require('./profile.model');
var User = require('../user/user.model');

exports.index = function(req, res) {
  Profile
    .find({user: req.params.userId})
    .sort('createdAt')
    .populate('user')
    .exec(function(err, profiles) {
      if (err) { return handleError(req, res, err); }

      return res.json(profiles);
    });
};

exports.show = function(req, res) {
  Profile
    .findById(req.params.id)
    .exec(function(err, profile) {
      if (err) { return handleError(req, res, err); }

      if (!profile) { return res.sendStatus(404); }

      return res.json(profile);
    });
};

exports.update = function(req, res) {
  Profile.findById(req.params.id, function(err, profile) {
    if (err) { return handleError(req, res, err); }

    if (!profile) { return res.sendStatus(404); }

    var updated = _.merge(profile, req.body);

    updated.save(function(err) {
      if (err) { return handleError(res, err); }

      return res.json(profile);
    });
  });
};

exports.create = function(req, res) {
  Profile.create({user: req.params.userId}, function(err, profile) {
    if (err) { return handleError(req, res, err); }

    return res.status(201).json(profile);
  });
};

exports.destroy = function(req, res) {
  Profile.findById(req.params.id).remove().exec(function(err) {
    if (err) { return handleError(req, res, err); }

    return res.sendStatus(204);
  });
};

function handleError(req, res, err) {
  req.log.error(err);
  return res.status(500).send(err);
}
