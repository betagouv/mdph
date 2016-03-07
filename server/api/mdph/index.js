'use strict';

import express from 'express';
import controller from './mdph.controller';
import {hasRole} from '../../auth/auth.service';
import categoriesRouter from '../document-category';

var Mdph = require('./mdph.model');
var compose = require('composable-middleware');
var router = express.Router();

router.get('/', controller.index);
router.get('/list', controller.list);
router.get('/:id', controller.show);
router.post('/', hasRole('admin'), controller.create);
router.put('/:id', isAuthorizedMdph(), controller.update);
router.patch('/:id', isAuthorizedMdph(), controller.update);
router.delete('/:id', hasRole('admin'), controller.destroy);

router.get('/:id/requests', isAuthorizedMdph(), controller.showRequests);
router.get('/:id/requests/byStatus', isAuthorizedMdph(), controller.showRequestsByStatus);

router.get('/:id/users', isAuthorizedMdph(), controller.showUsers);

router.get('/:id/partenaires', isAuthorizedMdph(), controller.showPartenaires);

router.get('/:id/secteurs', isAuthorizedMdph(), controller.showSecteurs);
router.get('/:id/secteurs/:secteurId', isAuthorizedMdph(), controller.getSecteur);
router.get('/:id/secteurs/:secteurId/requests', isAuthorizedMdph(), controller.showRequestsForSecteur);

router.use('/:id/categories', categoriesRouter);

function isAuthorizedMdph() {
  return compose()
    .use(hasRole('adminMdph'))

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
