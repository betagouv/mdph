'use strict';

import Profile from './profile.model';
import Request from '../request/request.model';
import * as RequestController from '../request/request.controller';

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

export function showLastRequest(req, res) {
  Request
    .findOne({ profile: req.profile._id }, {}, { sort: { createdAt: -1 } })
    .exec()
    .then(request => {
      if (!request) {
        return RequestController.create(req, res);
      }

      req.request = request;
      return RequestController.show(req, res);
    });
}

export function createNewRequest(req, res) {
  return RequestController.create(req, res);
}

export function count(req, res) {
  Request
    .count({ profile: req.profile._id })
    .exec()
    .then(count => {
      return res.json(count);
    });
}

export function profileCount(req, res) {
  Profile
    .count({user: req.params.userId})
    .exec()
    .then(count => {
      return res.json({count});
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
