'use strict';

import _ from 'lodash';
import stream from 'stream';
import async from 'async';
import path from 'path';
import Mdph from './mdph.model';
import User from '../user/user.model';
import UserActionModel from '../user/action.model';
import Secteur from '../secteur/secteur.model';
import Request from '../request/request.model';
import Partenaire from '../partenaire/partenaire.model';
import DocumentCategoryCtrl from '../document-category/document-category.controller';
import gridfs from '../../components/gridfs';

// Get all users linked to a single mdph
export function showUsers(req, res) {
  User.find({
    mdph: req.mdph._id
  }, function(err, list) {
    if (err) { return handleError(req, res, err); }

    if (!list) { return res.sendStatus(404); }

    return res.json(list);
  });
}

export function showUsersHistory(req, res) {
  return UserActionModel
    .find({ mdph: req.mdph._id })
    .populate('user')
    .sort('-date')
    .exec()
    .then(result => res.json(result))
    .catch(err => handleError(req, res, err));
}

export function showDocumentCategories(req, res) {
  DocumentCategoryCtrl.findAndSortCategoriesForMdph(req.mdph, function(err, tree) {
    if (err) { return handleError(req, res, err); }

    return res.json(tree);
  });
}

export function getUnclassifiedCategory(req, res) {
  DocumentCategoryCtrl.getUnclassifiedCategory(req.mdph, function(err, unclassifiedCategory) {
    if (err) { return handleError(req, res, err); }

    return res.json(unclassifiedCategory);
  });
}

export function showUncategorizedDocumentTypes(req, res) {
  DocumentCategoryCtrl.showUncategorizedDocumentTypes(req.mdph, function(err, list) {
    if (err) { return handleError(req, res, err); }

    return res.json(list);
  });
}

export function saveDocumentCategoryFile(req, res) {
  DocumentCategoryCtrl.saveDocumentCategoryFile(req.file, req.params.categoryId, req.log, function(err, file) {
    if (err) { return handleError(req, res, err); }

    return res.json(file);
  });
}

export function getDocumentCategoryFile(req, res) {
  DocumentCategoryCtrl.getDocumentCategoryFile(req.params.categoryId, function(err, fileStream) {
    if (err) { return handleError(req, res, err); }

    if (fileStream) {
      fileStream.pipe(res);
    } else {
      res.sendStatus(404);
    }
  });
}

export function createNewDocumentCategory(req, res) {
  DocumentCategoryCtrl.createNewDocumentCategory(req.mdph, req.body.position, function(err, obj) {
    if (err) { return handleError(req, res, err); }

    return res.json(obj);
  });
}

export function updateDocumentCategory(req, res) {
  DocumentCategoryCtrl.updateDocumentCategory(req.params.categoryId, req.body.label, function(err, obj) {
    if (err) { return handleError(req, res, err); }

    return res.json(obj);
  });
}

export function updateDocumentCategories(req, res) {
  DocumentCategoryCtrl.updateDocumentCategories(req.body, function(err) {
    if (err) { return handleError(req, res, err); }

    return res.sendStatus(200);
  });
}

export function removeDocumentCategory(req, res) {
  DocumentCategoryCtrl.removeDocumentCategory(req.params.categoryId, function(err) {
    if (err) { return handleError(req, res, err); }

    return res.sendStatus(200);
  });
}

export function listSecteurs(req, res) {
  Secteur
    .find({mdph: req.mdph._id})
    .sort('name')
    .exec(function(err, secteurs) {
      if (err) { return handleError(req, res, err); }

      return res.json(secteurs);
    });
}

export function populateAndShowSecteurs(req, res) {
  Secteur
    .find({mdph: req.mdph._id})
    .sort('name')
    .lean()
    .populate('evaluators.enfant evaluators.adulte')
    .exec(function(err, secteurs) {
      if (err) { return handleError(req, res, err); }

      async.map(
        secteurs,

        function(secteur, mapCallback) {
          var search = {
            status: 'emise',
            mdph: req.mdph.zipcode,
            secteur: secteur._id
          };

          Request
            .count(search)
            .exec(function(err, result) {
              secteur.count = result;
              mapCallback();
            });
        },

        function() {
          return res.json(secteurs);
        });
    });
}

export function getSecteur(req, res) {
  Secteur
    .findOne({mdph: req.mdph._id, _id: req.params.secteurId})
    .sort('name')
    .populate('evaluators.enfant evaluators.adulte')
    .exec(function(err, secteur) {
      if (err) { return handleError(req, res, err); }

      return res.json(secteur);
    });
}

export function showRequests(req, res) {
  const search = {
    mdph: req.mdph.zipcode
  };

  if (req.params.userId === 'me') {
    search.evaluators = req.user._id;
  } else if (req.params.userId === 'unassigned') {
    search.evaluators = { $exists: false };
  } else if (req.params.userId !== 'toutes') {
    search.evaluators = req.params.userId;
  }

  if (req.query) {
    search.status = req.query.status;
  }

  Request.find(search)
    .populate('user', 'name email')
    .populate('evaluators', 'name')
    .sort('-submittedAt')
    .exec(function(err, requests) {
      if (err) return handleError(req, res, err);

      return res.send(requests);
    });
}

export function showBeneficiaires(req, res) {
  Request.find({ mdph: req.mdph.zipcode, status: {$ne: 'en_cours'} })
    .populate('profile')
    .exec(function(err, requests) {
      if (err) return handleError(req, res, err);

      function capitalize(input) {
        if (!input) {
          return input;
        }

        return input.replace(/\w\S*/g, function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      }

      const profiles = _(requests)
        .map('profile')
        .uniq('_id')
        .map((profile) => {
          if (profile && profile.identites && profile.identites.beneficiaire) {
            profile.identites.beneficiaire.prenom = capitalize(profile.identites.beneficiaire.prenom);
            profile.identites.beneficiaire.nom = capitalize(profile.identites.beneficiaire.nom);
          }
          return profile;
        })
        .sortBy('identites.beneficiaire.nom')
        .value();

      return res.send(profiles);
    });
}

export function showRequestsByStatus(req, res) {
  User
    .aggregate([
      {$match: {mdph: req.mdph._id, role: 'adminMdph' }},
      { "$project": {
         "name": 1,
         "insensitive": { "$toLower": "$name" }
      }},
      { "$sort": { "insensitive": 1 } }
    ])
    .then(users => {
      const promises = users.map(user => {
        return Request
          .aggregate([
            {$match: {mdph: req.mdph.zipcode, evaluators: user._id }},
            {$group: {_id: '$status', count: {$sum: 1} }}
          ])
          .exec()
          .then(groups => ({ user, groups }));
      });

      const unnassignedRequests = Request
        .aggregate([
          {$match: {mdph: req.mdph.zipcode, evaluators: { $exists: false }}},
          {$group: {_id: '$status', count: {$sum: 1} }}
        ])
        .exec()
        .then(groups => ({ user: { _id: 'unassigned', name: 'Non assignées' }, groups }));

      const allRequests = Request
        .aggregate([
          {$match: {mdph: req.mdph.zipcode}},
          {$group: {_id: '$status', count: {$sum: 1} }}
        ])
        .exec()
        .then(groups => ({ user: { _id: 'toutes', name: 'Toutes les demandes' }, groups }));

      promises.push(unnassignedRequests);
      promises.push(allRequests);

      Promise.all(promises).then(data => res.json(data));
    });
}

export function showRequestsForSecteur(req, res) {
  var search = {
    status: req.query && req.query.status ? req.query.status : 'emise',
    mdph: req.mdph.zipcode,
  };

  if (req.params.secteurId !== 'autres') {
    search.secteur = req.params.secteurId;
  } else {
    search.secteur = {$eq: null};
  }

  Request
    .find(search)
    .select('user shortId formAnswers.identites status submittedAt evaluator')
    .populate('user evaluator', 'name')
    .sort('-submittedAt')
    .exec(function(err, requests) {
      if (err) return handleError(req, res, err);
      return res.send(requests);
    });
}

// Get list of partenaires
export function showPartenaires(req, res) {
  Partenaire
    .find({certified: req.query.status, mdph: req.mdph._id})
    .sort('email')
    .exec(function(err, partenaires) {
      if (err) { return handleError(req, res, err); }

      return res.json(partenaires);
    });
}

// Get list of mdphs
export function index(req, res) {
  Mdph.find(req.query, '-likes').sort('zipcode').exec(function(err, mdphs) {
    if (err) { return handleError(req, res, err); }

    return res.json(mdphs);
  });
}

// Get a single mdph by zipcode
export function show(req, res) {
  Mdph.findOne({zipcode: req.params.id}, '-likes', function(err, mdph) {
    if (err) { return handleError(req, res, err); }

    return res.json(mdph);
  });
}

// Creates a new mdph in the DB.
export function create(req, res) {
  Mdph.create(req.body, function(err, mdph) {
    if (err) { return handleError(req, res, err); }

    return res.status(201).json(mdph);
  });
}

// Updates an existing mdph in the DB.
export function update(req, res) {
    Mdph.findOne({ zipcode: req.body.zipcode }, function(err, mdph) {
    if (err) { return handleError(req, res, err); }

    if (!mdph) { return res.sendStatus(404); }

    mdph
      .set('name', req.body.name)
      .set('logo', req.body.logo)
      .set('enabled', req.body.enabled)
      .set('opened', req.body.opened)
      .set('evaluate', req.body.evaluate)
      .set('likes', req.body.likes)
      .set('outsideLink', req.body.outsideLink)
      .set('locations', req.body.locations)
      .set('requestExportFormat', req.body.requestExportFormat)
      .save(function(err) {
        if (err) { return handleError(req, res, err); }

        return res.status(200).json(mdph);
      });
  });
}

// Deletes a mdph from the DB.
export function destroy(req, res) {
  Mdph.findOne({
    id: req.params.id
  }, function(err, mdph) {
    if (err) { return handleError(req, res, err); }

    if (!mdph) { return res.sendStatus(404); }

    mdph.remove({}, function(err) {
      if (err) { return handleError(req, res, err); }

      return res.sendStatus(204);
    });
  });
}

export function updateRequestExportFormat(req, res) {
  req.mdph.requestExportFormat = req.body.requestExportFormat;
  req.mdph.save(function(err, saved) {
    if (err) { return handleError(req, res, err); }

    return res.status(200).json(saved);
  });
}

export function saveLike(req, res) {
  Mdph.findOne({
    zipcode: req.params.id
  }, function(err, mdph) {
    if (err) { return handleError(req, res, err); }

    if (!mdph) { return res.sendStatus(404); }

    mdph.likes.push(req.body.email);
    mdph.save(() => {
      return res.sendStatus(200);
    });
  });
}

export function list(req, res) {
  res.status(200).sendFile(path.join(__dirname, '/', 'mdph.json'));
}

function handleError(req, res, err) {
  req.log.error(err);
  return res.status(500).send(err);
}

export function addLogo(req, res) {

  var gfs = gridfs();
  var file = req.file;
  var logger = req.log;

  var writeStream = gfs.createWriteStream({
    filename: file.originalname,
    mimetype: file.mimetype
  });

  var bufferStream = new stream.PassThrough();
  bufferStream.end(file.buffer);
  bufferStream.pipe(writeStream);

  writeStream.on('close', function(file) {
    Mdph.findOne({
      zipcode: req.params.id
    }, function(err, mdph) {
      if (err) {
        req.log.error(err);
        return res.status(500).send(err);
      }

      if (!mdph) {
        return res.sendStatus(404);
      }

      if (mdph.logo) {
        // remove existing file, only one allowed
        gfs.remove({_id: mdph.logo}, function(err) {
          if (err) {
            req.log.error(err);
          }
        });
      }

      mdph
        .set('logo', file._id)
        .save(function(err) {
          if (err) {
            req.log.error(err);
            return res.status(500).send(err);
          }

          return res.json(file);
        });
    });
  });
}

export function getLogo(req, res) {
  Mdph.findOne({zipcode: req.params.id}, function(err, mdph) {
    if (err) { return handleError(req, res, err); }

    if (!mdph) { return res.sendStatus(404); }

    if (mdph.logo) {
      var gfs = gridfs();
      var readStream = gfs.createReadStream({_id: mdph.logo});

      return readStream.pipe(res);
    } else {
      return res.sendStatus(404);
    }
  });
}
