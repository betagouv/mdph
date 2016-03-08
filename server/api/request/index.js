'use strict';

import {Router} from 'express';
import documentsRouter from '../document';
import * as controller from './request.controller';
import {isAuthenticated, isAuthorized} from '../../auth/auth.service';

var router = new Router();

router.post('/', isAuthenticated(), controller.create);

router.get('/:shortId', isAuthenticated(), controller.show);
router.get('/:shortId/partenaire', controller.showPartenaire);

router.post('/:shortId', isAuthenticated(), controller.update);
router.put('/:shortId', isAuthenticated(), controller.update);

router.delete('/:shortId', isAuthenticated(), controller.destroy);

router.get('/:shortId/history', isAuthenticated(), controller.getHistory);
router.get('/:shortId/recapitulatif', isAuthenticated(), controller.getRecapitulatif);

router.get('/:shortId/pdf/:fileName', isAuthenticated(), controller.getPdf);
router.get('/:shortId/synthese.pdf', isAuthenticated(), controller.getSynthesePdf);

router.use('/:shortId/document', documentsRouter);

module.exports = router;
