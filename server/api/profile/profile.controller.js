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
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(req, res));
}

export function show(req, res) {
  return res.json(req.profile);
}

export function showMe(req, res) {
  Profile
    .findOne({user: req.user._id})
    .exec()
    .then(profile => {
      if (!profile) {
        throw 404;
      }

      return profile;
    })
    .then(respondWithResult(res))
    .catch(handleError(req, res));
}

export function update(req, res) {
  let profile = req.profile;

  for (let property in req.body) {
    profile.set(property, req.body[property]);
  }

  profile
    .save()
    .then(respondWithResult(res))
    .catch(handleError(req, res));
}

export function create(req, res) {
  Profile
    .create({user: req.params.userId})
    .then(respondWithResult(res, 201))
    .catch(handleError(req, res));
}

export function destroy(req, res) {
  req.profile
    .remove()
    .then(() => res.sendStatus(204))
    .catch(handleError(req, res));
}

export function indexRequests(req, res) {
  let profile = req.profile;
  Request
    .find({profile: profile._id})
    .sort('-submittedAt')
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(req, res));
}

export function showLastCreatedRequest(req, res) {
  Request
    .findOne({ profile: req.profile._id }, {}, { sort: { createdAt: -1 } })
    .select('shortId user _id profile status mdph submittedAt createdAt')
    .exec()
    .then(request => {
      if (!request) {
        return res.sendStatus(404);
      }

      return res.json(request);
    });
}

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(request) {
    res.status(statusCode).json(request);
    return null;
  };
}

function handleError(req, res) {
  return function(statusCode, err) {
    statusCode = statusCode || 500;

    if (err) {
      req.log.error(err);
      res.status(statusCode).send(err);
    } else {
      res.status(statusCode).send('Server error');
    }

    return null;
  };
}
