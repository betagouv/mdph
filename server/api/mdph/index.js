'use strict';

import {Router} from 'express';
import controller from './mdph.controller';
import * as Auth from '../../auth/auth.service';
import categoriesRouter from '../document-category';
import compose from 'composable-middleware';

var Mdph = require('./mdph.model');
var router = new Router();

router.get('/', controller.index);
router.get('/list', controller.list);
router.get('/:id', controller.show);
router.post('/', Auth.hasRole('admin'), controller.create);
router.put('/:id', isAuthorized(), controller.update);
router.patch('/:id', isAuthorized(), controller.update);
router.delete('/:id', Auth.hasRole('admin'), controller.destroy);

router.get('/:id/requests', isAuthorized(), controller.showRequests);
router.get('/:id/requests/byStatus', isAuthorized(), controller.showRequestsByStatus);

router.get('/:id/users', isAuthorized(), controller.showUsers);

router.get('/:id/partenaires', isAuthorized(), controller.showPartenaires);

router.get('/:id/secteurs', isAuthorized(), controller.showSecteurs);
router.get('/:id/secteurs/:secteurId', isAuthorized(), controller.getSecteur);
router.get('/:id/secteurs/:secteurId/requests', isAuthorized(), controller.showRequestsForSecteur);

router.use('/:id/categories', isAuthorized(), categoriesRouter);

router.param('id', function(req, res, next, id) {
  Mdph.findOne({zipcode: id}, function(err, mdph) {
    if (err) return next(err);
    if (!mdph) return res.sendStatus(404);

    req.mdph = mdph;
    next();
  });
});

function isAuthorized() {
  return compose()
    .use(Auth.isAuthenticated())
    .use(function(req, res, next) {
      if (Auth.meetsRequirements(req.user.role, 'admin')) {
        return next();
      }

      if (Auth.meetsRequirements(req.user.role, 'adminMdph') && req.user.mdph._id.equals(req.mdph._id)) {
        return next();
      }

      return res.sendStatus(401);
    });
}

module.exports = router;
