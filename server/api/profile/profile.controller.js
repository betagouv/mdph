'use strict';

var _ = require('lodash');
var Profile = require('./profile.model');
var User = require('../user/user.model');
var Request = require('../request/request.model');

exports.index = function(req, res) {
  Profile
    .find({user: req.params.userId})
    .sort('createdAt')
    .populate('user', 'profile')
    .exec(function(err, profiles) {
      if (err) { return handleError(req, res, err); }

      return res.json(profiles);
    });
};

exports.show = function(req, res) {
  Profile
    .findById(req.params.profileId)
    .exec(function(err, profile) {
      if (err) { return handleError(req, res, err); }

      if (!profile) { return res.sendStatus(404); }

      return res.json(profile);
    });
};

exports.showMe = function(req, res) {
  Profile
    .findOne({user: req.user._id})
    .exec(function(err, profile) {
      if (err) { return handleError(req, res, err); }

      if (!profile) { return res.sendStatus(404); }

      return res.json(profile);
    });
};

exports.update = function(req, res) {
  Profile.findById(req.params.profileId, function(err, profile) {
    if (err) { return handleError(req, res, err); }

    if (!profile) { return res.sendStatus(404); }

    for (let property in req.body) {
      profile.set(property, req.body[property]);
    }

    profile.save(function(err, saved) {
      if (err) { return handleError(res, err); }

      return res.json(saved);
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
  Profile.findById(req.params.profileId).remove().exec(function(err) {
    if (err) { return handleError(req, res, err); }

    return res.sendStatus(204);
  });
};

exports.indexRequests = function(req, res) {
  Profile
    .findById(req.params.profileId)
    .exec(function(err, profile) {
      if (err) { return handleError(req, res, err); }

      if (!profile) { return res.sendStatus(404); }

      Request.find({profile: profile._id})
        .sort('-submittedAt')
        .exec(function(err, requests) {
          if (err) return handleError(req, res, err);

          return res.json(requests);
        });
    });
};

function handleError(req, res, err) {
  req.log.error(err);
  return res.status(500).send(err);
}
