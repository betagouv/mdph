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

  return new Promise((resolve, reject) => {
    let found = _.find(syntheses, (synthese) => {
      //search synthese without request => current working synthese
      return !synthese.request;
    });

    if (found) {
      found.current = true;
      return resolve(syntheses);
    }

    Synthese
      .create({
        user:           req.request.user,
        profile:        req.request.profile
      })
      .then(created => {
        let createdObj = created.toObject();
        createdObj.current = true;
        syntheses.push(createdObj);
        resolve(syntheses);
      });
  });
}

export function create(req, res) {
  Synthese.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(req, res));
}

export function show(req, res) {
  respondWithResult(res)(req.synthese);
}

export function showAllByProfile(req, res) {
  let options = {req, res, Synthese};
  Synthese
    .find({profile: req.profile})
    .populate('request', 'shortId')
    .lean()
    .exec()
    .then(syntheses => {
      options.syntheses = syntheses;
      return options;
    })
    .then(findOrCreateRequestSynthese)
    .then(respondWithResult(res, 200))
    .catch(handleError(req, res));
}

export function update(req, res) {
  saveUpdates(req)
    .then(respondWithResult(res))
    .catch(handleError(req, res));
}
