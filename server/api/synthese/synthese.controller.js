import Synthese from './synthese.model';
import _ from 'lodash';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(body) {
    res.status(statusCode).json(body);
    return null;
  };
}

function handleError(req, res) {
  return function(err) {
    if (err) {
      req.log.error(err);
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(500).send('Server error');
    }

    return null;
  };
}

function saveUpdates(req) {
  return new Promise(function(resolve, reject) {
    const filteredUpdates = _.pick(req.body, 'geva');

    req.synthese.set(filteredUpdates).save(function(err, updated) {
      if (err) {
        return reject(err);
      }

      return resolve(updated);
    });
  });
}

function sortSyntheseByDate(syntheses) {
  return new Promise((resolve) => {
    syntheses.sort(function(a, b) {
      if (!a) {
        return 1;
      }

      return a.createdAt - b.createdAt;
    });

    resolve(syntheses);
  });
}

export function show(req, res) {
  respondWithResult(res)(req.synthese);
}

export function showAllByMdph(req, res) {
  Synthese
    .find({mdph: req.query.mdphId})
    .lean()
    .exec()
    .then(sortSyntheseByDate)
    .then(respondWithResult(res, 200))
    .catch(handleError(req, res));
}

export function create(req, res) {
  Synthese
    .create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(req, res));
}

export function update(req, res) {
  saveUpdates(req)
    .then(respondWithResult(res))
    .catch(handleError(req, res));
}
