'use strict';

import _ from 'lodash';
import Profile from './profile.model';
import User from '../user/user.model';
import Request from '../request/request.model';

export function index(req, res) {
  Profile
    .find({user: req.params.userId})
    .sort('createdAt')
    .populate('user', 'profile')
    .exec(function(err, profiles) {
      if (err) { return handleError(req, res, err); }

      return res.json(profiles);
    });
}

export function show(req, res) {
  return res.json(req.profile);
}

export function showMe(req, res) {
  Profile
    .findOne({user: req.user._id})
    .exec(function(err, profile) {
      if (err) { return handleError(req, res, err); }

      if (!profile) { return res.sendStatus(404); }

      return res.json(profile);
    });
}

export function update(req, res) {
  let profile = req.profile;

  for (let property in req.body) {
    profile.set(property, req.body[property]);
  }

  profile.save(function(err, saved) {
    if (err) { return handleError(res, err); }

    return res.json(saved);
  });
}

export function create(req, res) {
  Profile.create({user: req.params.userId}, function(err, profile) {
    if (err) { return handleError(req, res, err); }

    return res.status(201).json(profile);
  });
}

export function destroy(req, res) {
  req.profile.remove().exec(function(err) {
    if (err) { return handleError(req, res, err); }

    return res.sendStatus(204);
  });
}

export function indexRequests(req, res) {
  let profile = req.profile;
  Request
    .find({profile: profile._id})
    .sort('-submittedAt')
    .exec(function(err, requests) {
      if (err) return handleError(req, res, err);

      return res.json(requests);
    });
}

function handleError(req, res, err) {
  req.log.error(err);
  return res.status(500).send(err);
}
