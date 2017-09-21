'use strict';

import {Router} from 'express';
import * as controller from './mdph.controller';
import {hasRole, isAgent} from '../../auth/auth.service';
import categoriesRouter from '../document-category';
import Mdph from './mdph.model';
import synthesesRouter from '../synthese';
import secteurRouter from '../secteur';
import multer from 'multer';

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });
var router = new Router();

router.get('/', controller.index);
router.get('/list', controller.list);
router.get('/:id', controller.show);
router.post('/', hasRole('admin'), controller.create);
router.put('/:id', hasRole('admin'), controller.update);
router.put('/:id/requestExportFormat', isAgent(), controller.updateRequestExportFormat);
router.patch('/:id', isAgent(), controller.update);
router.delete('/:id', hasRole('admin'), controller.destroy);

router.get('/:id/requests/byStatus', isAgent(), controller.showRequestsByStatus);
router.get('/:id/requests/:userId', isAgent(), controller.showRequests);

router.get('/:id/beneficiaires', isAgent(), controller.showBeneficiaires);

router.get('/:id/users', isAgent(), controller.showUsers);
router.get('/:id/users/history', isAgent(), controller.showUsersHistory);

router.get('/:id/partenaires', isAgent(), controller.showPartenaires);

router.get('/:id/secteurs', isAgent(), controller.populateAndShowSecteurs);
router.get('/:id/secteurs/list', isAgent(), controller.listSecteurs);
router.get('/:id/secteurs/:secteurId', isAgent(), controller.getSecteur);
router.get('/:id/secteurs/:secteurId/requests', isAgent(), controller.showRequestsForSecteur);

router.post('/:id/like', controller.saveLike);

router.use('/:id/categories', isAgent(), categoriesRouter);
router.use('/:id/syntheses',  isAgent(), synthesesRouter);
router.use('/:id/secteurs',  isAgent(), secteurRouter);

router.post('/:id/logo', upload.single('file'), controller.addLogo);

router.param('id', function(req, res, next, id) {
  Mdph.findOne({zipcode: id}, function(err, mdph) {
    if (err) return next(err);
    if (!mdph) return res.sendStatus(404);

    req.mdph = mdph;
    next();
  });
});

module.exports = router;
