import Synthese from './synthese.model';
import _ from 'lodash';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(synthese) {
    res.status(statusCode).json(synthese);
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

function saveUpdates(req) {
  return new Promise(function(resolve, reject) {
    let filteredUpdates = _.pick(req.body, 'geva');

    req.synthese.set(filteredUpdates).save(function(err, updated) {
      if (err) {
        return reject(err);
      }

      return resolve(updated);
    });
  });
}

export function findOrCreateRequestSynthese(options) {
  let {syntheses, req} = options;

  let found = _.find(syntheses, {request: req.request._id});

  if (!found) {
    return Synthese
      .create({
        user:           req.request.user,
        profile:        req.request.profile,
        request:        req.request._id
      })
      .then(created => {
        created.selected = true;
        syntheses.push(created);
        return options;
      });
  } else {
    found.selected = true;
    return options;
  }
}

export function create(req, res) {
  Synthese.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

export function show(req, res) {
  respondWithResult(res)(req.synthese);
}

export function showAllByProfile(req, res) {
  let options = {req, res};
  Synthese.find({profile: req.request.profile})
    .exec(syntheses => {
      options.syntheses = syntheses;
      return options;
    })
    .then(findOrCreateRequestSynthese)
    .then(respondWithResult(res, 200))
    .catch(handleError(res));
}

export function update(req, res) {
  saveUpdates(req)
    .then(respondWithResult(res))
    .catch(handleError(req, res));
}
