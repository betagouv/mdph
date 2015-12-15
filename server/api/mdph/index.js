'use strict';

var auth = require('../../auth/auth.service');
var config = require('../../config/environment');
var express = require('express');
var controller = require('./mdph.controller');
var Mdph = require('./mdph.model');
var compose = require('composable-middleware');
var multer  = require('multer');

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });
var router = express.Router();

router.get('/', controller.index);
router.get('/list', controller.list);
router.get('/:id', controller.show);
router.post('/', auth.hasRole('admin'), controller.create);
router.put('/:id', isAuthorizedMdph(), controller.update);
router.patch('/:id', isAuthorizedMdph(), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

router.get('/:id/requests', isAuthorizedMdph(), controller.showRequests);
router.get('/:id/requests/byStatus', isAuthorizedMdph(), controller.showRequestsByStatus);
router.get('/:id/requests/:userId/byStatus', isAuthorizedMdph(), controller.showRequestsByStatusForUser);

router.get('/:id/users', isAuthorizedMdph(), controller.showUsers);

router.get('/:id/partenaires', isAuthorizedMdph(), controller.showPartenaires);

router.get('/:id/secteurs', isAuthorizedMdph(), controller.showSecteurs);
router.get('/:id/secteurs/:secteurId', isAuthorizedMdph(), controller.getSecteur);
router.get('/:id/secteurs/:secteurId/requests', isAuthorizedMdph(), controller.showRequestsForSecteur);

router.get('/:id/categories', isAuthorizedMdph(), controller.showDocumentCategories);
router.post('/:id/categories', isAuthorizedMdph(), controller.createDocumentCategory);
router.put('/:id/categories', isAuthorizedMdph(), controller.updateDocumentCategories);
router.post('/:id/categories/:categoryId', isAuthorizedMdph(), controller.createSubDocumentCategory);
router.put('/:id/categories/:categoryId', isAuthorizedMdph(), controller.updateDocumentCategory);
router.delete('/:id/categories/:categoryId', isAuthorizedMdph(), controller.removeDocumentCategory);
router.post('/:id/categories/:categoryId/file', isAuthorizedMdph(), upload.single('file'), controller.saveDocumentCategoryFile);
router.get('/:id/categories/:categoryId/file', isAuthorizedMdph(), controller.getDocumentCategoryFile);

function isAuthorizedMdph() {
  return compose()
    .use(auth.hasRole('adminMdph'))

    // Attach mdph to request
    .use(function(req, res, next) {
      Mdph.findOne({zipcode: req.params.id}, function(err, mdph) {
        if (err) return next(err);

        if (mdph) {
          req.mdph = mdph;
        }

        next();
      });
    })

    // check if user can access current mdph
    .use(function(req, res, next) {
      if (req.user.role === 'admin' || String(req.user.mdph) === String(req.mdph._id)) {
        return next();
      }

      return res.sendStatus(401);
    });
}

module.exports = router;
