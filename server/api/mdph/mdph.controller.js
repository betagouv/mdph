'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var async = require('async');
var Mdph = require('./mdph.model');
var User = require('../user/user.model');
var Secteur = require('../secteur/secteur.model');
var Request = require('../request/request.model');
var Partenaire = require('../partenaire/partenaire.model');
var DocumentCategoryCtrl = require('../document/document-category.controller');
var path = require('path');

// Get all users linked to a single mdph
exports.showUsers = function(req, res) {
  User.find({
    mdph: req.mdph._id
  }, function(err, list) {
    if (err) { return handleError(req, res, err); }

    if (!list) { return res.sendStatus(404); }

    return res.json(list);
  });
};

exports.showDocumentCategories = function(req, res) {
  DocumentCategoryCtrl.findAndSortCategoriesForMdph(req.mdph, function(err, tree) {
    if (err) { return handleError(req, res, err); }

    return res.json(tree);
  });
};

exports.showUncategorizedDocumentTypes = function(req, res) {
  DocumentCategoryCtrl.showUncategorizedDocumentTypes(req.mdph, function(err, list) {
    if (err) { return handleError(req, res, err); }

    return res.json(list);
  });
};

exports.saveDocumentCategoryFile = function(req, res) {
  DocumentCategoryCtrl.saveDocumentCategoryFile(req.file, req.params.categoryId, req.log, function(err, file) {
    if (err) { return handleError(req, res, err); }

    return res.json(file);
  });
};

exports.getDocumentCategoryFile = function(req, res) {
  DocumentCategoryCtrl.getDocumentCategoryFile(req.params.categoryId, function(err, fileStream) {
    if (err) { return handleError(req, res, err); }

    if (fileStream) {
      fileStream.pipe(res);
    } else {
      res.sendStatus(404);
    }
  });
};

exports.createDocumentCategory = function(req, res) {
  DocumentCategoryCtrl.createDocumentCategory(req.mdph, req.body.position, function(err, obj) {
    if (err) { return handleError(req, res, err); }

    return res.json(obj);
  });
};

exports.updateDocumentCategory = function(req, res) {
  DocumentCategoryCtrl.updateDocumentCategory(req.params.categoryId, req.body.label, function(err, obj) {
    if (err) { return handleError(req, res, err); }

    return res.json(obj);
  });
};

exports.updateDocumentCategories = function(req, res) {
  DocumentCategoryCtrl.updateDocumentCategories(req.body, function(err) {
    if (err) { return handleError(req, res, err); }

    return res.sendStatus(200);
  });
};

exports.removeDocumentCategory = function(req, res) {
  DocumentCategoryCtrl.removeDocumentCategory(req.params.categoryId, function(err) {
    if (err) { return handleError(req, res, err); }

    return res.sendStatus(200);
  });
};

exports.updateDocumentType = function(req, res) {
  DocumentCategoryCtrl.updateDocumentType(req.body.documentType, req.body.oldCategoryId, req.body.newCategoryId, function(err) {
    if (err) { return handleError(req, res, err); }

    return res.sendStatus(200);
  });
};

exports.showSecteurs = function(req, res) {
  Secteur
    .find({mdph: req.mdph._id})
    .sort('name')
    .lean()
    .populate('evaluators.enfant evaluators.adulte')
    .exec(function(err, secteurs) {
      if (err) { return handleError(req, res, err); }

      // Push default secteur
      secteurs.push({_id: 'autres', name: 'Sans secteur'});

      async.map(
        secteurs,

        function(secteur, mapCallback) {
          var search = {
            status: 'emise',
            mdph: req.mdph.zipcode,
            secteur: (secteur._id !== 'autres') ? secteur._id : {$eq: null}
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
};

exports.getSecteur = function(req, res) {
  Secteur
    .findOne({mdph: req.mdph._id, _id: req.params.secteurId})
    .sort('name')
    .populate('evaluators.enfant evaluators.adulte')
    .exec(function(err, secteur) {
      if (err) { return handleError(req, res, err); }

      return res.json(secteur);
    });
};

exports.showRequests = function(req, res) {
  var search = {
    mdph: req.mdph.zipcode
  };

  var query = req.query;

  if (query) {
    if (query.status) {
      search.status = query.status;
    }

    if (query.evaluator) {
      if (query.evaluator === 'null') {
        search.evaluator = undefined;
      } else {
        search.evaluator = query.evaluator;
      }
    }
  }

  Request.find(search)
    .populate('user', 'name')
    .populate('evaluator', 'name')
    .sort('-submittedAt')
    .exec(function(err, requests) {
      if (err) return handleError(req, res, err);

      res.set('count', requests.length);
      return res.send(requests);
    });
};

exports.showRequestsByStatus = function(req, res) {
  Request
    .aggregate([
      {$match: {mdph: req.mdph.zipcode}},
      {$group: {
        _id: '$status',
        count: {$sum: 1}
      }}
    ])
    .exec(function(err, requestsGroups) {
      if (err) return handleError(req, res, err);

      return res.send(requestsGroups);
    });
};

exports.showRequestsByStatusForUser = function(req, res) {
  Request
    .aggregate([
      {$match: { mdph: req.mdph.zipcode, evaluator: mongoose.Types.ObjectId(req.params.userId) }},
      {$group: {
        _id: '$status',
        count: {$sum: 1}
      }}
    ])
    .exec(function(err, requestsGroups) {
      if (err) return handleError(req, res, err);

      var total = 0;
      requestsGroups.forEach(function(group) {
        total += group.count;
      });

      requestsGroups.push({_id: 'toutes', count: total});

      return res.send(requestsGroups);
    });
};

exports.showRequestsForSecteur = function(req, res) {
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
};

// Get list of partenaires
exports.showPartenaires = function(req, res) {
  Partenaire
    .find({certified: req.query.status, mdph: req.mdph._id})
    .sort('email')
    .exec(function(err, partenaires) {
      if (err) { return handleError(req, res, err); }

      return res.json(partenaires);
    });
};

// Get list of mdphs
exports.index = function(req, res) {
  Mdph.find().sort('zipcode').exec(function(err, mdphs) {
    if (err) { return handleError(req, res, err); }

    return res.json(mdphs);
  });
};

// Get a single mdph by zipcode
exports.show = function(req, res) {
  Mdph.findOne({zipcode: req.params.id}, function(err, mdph) {
    if (err) { return handleError(req, res, err); }

    return res.json(mdph);
  });
};

// Creates a new mdph in the DB.
exports.create = function(req, res) {
  Mdph.create(req.body, function(err, mdph) {
    if (err) { return handleError(req, res, err); }

    return res.status(201).json(mdph);
  });
};

// Updates an existing mdph in the DB.
exports.update = function(req, res) {
  if (req.body._id) { delete req.body._id; }

  Mdph.findOne({
    id: req.params.id
  }, function(err, mdph) {
    if (err) { return handleError(req, res, err); }

    if (!mdph) { return res.sendStatus(404); }

    var updated = _.merge(mdph, req.body);
    updated.save(function(err) {
      if (err) { return handleError(req, res, err); }

      return res.status(200).json(mdph);
    });
  });
};

// Deletes a mdph from the DB.
exports.destroy = function(req, res) {
  Mdph.findOne({
    id: req.params.id
  }, function(err, mdph) {
    if (err) { return handleError(req, res, err); }

    if (!mdph) { return res.sendStatus(404); }

    mdph.remove(function(err) {
      if (err) { return handleError(req, res, err); }

      return res.sendStatus(204);
    });
  });
};

exports.list = function(req, res) {
  res.status(200).sendFile(path.join(__dirname, '/', 'mdph.json'));
};

function handleError(req, res, err) {
  req.log.error(err);
  return res.status(500).send(err);
}
