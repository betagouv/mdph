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

function createSyntheseIfNoneFound(req) {
  return (syntheses) => {
    return new Promise((resolve) => {
      if (syntheses && syntheses.length > 0) {
        return resolve(syntheses);
      } else {
        Synthese
          .create({
            profile: req.profile._id
          })
          .then(created => {
            let createdObj = created.toObject();
            syntheses.push(createdObj);
            resolve(syntheses);
          });
      }
    });
  };
}

function tagCurrentSynthese(syntheses) {
  syntheses[syntheses.length - 1].current = true;
  return syntheses;
}

export function show(req, res) {
  respondWithResult(res)(req.synthese);
}

export function showAllByProfile(req, res) {
  Synthese
    .find({profile: req.profile})
    .lean()
    .exec()
    .then(createSyntheseIfNoneFound(req))
    .then(sortSyntheseByDate)
    .then(tagCurrentSynthese)
    .then(respondWithResult(res, 200))
    .catch(handleError(req, res));
}

export function update(req, res) {
  saveUpdates(req)
    .then(respondWithResult(res))
    .catch(handleError(req, res));
}
