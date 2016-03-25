import Synthese from './synthese.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(synthese) {
    res.status(statusCode).json(synthese);
    return null;
  };
}

function populateAndRespond(res) {
  return function(synthese) {
    // return populateAndSortPrestations(synthese)
    //   .then(respondWithResult(res));
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
    req.synthese.set(req.body).save(function(err, updated) {
      if (err) {
        return reject(err);
      }

      return resolve(updated);
    });
  });
}

export function create(req, res) {
  Synthese.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

export function show(req, res) {
  populateAndRespond(res)(req.synthese)
    .catch(handleError(req, res));
}

export function update(req, res) {
  saveUpdates(req)
    .then(populateAndRespond(res))
    .catch(handleError(req, res));
}
