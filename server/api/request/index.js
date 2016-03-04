'use strict';

import documentsRouter from './document';

var express = require('express');
var controller = require('./request.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/', auth.isAuthenticated(), controller.create);

router.get('/:shortId', auth.isAuthenticated(), controller.show);
router.get('/:shortId/partenaire', controller.showPartenaire);

router.post('/:shortId', auth.isAuthenticated(), controller.update);
router.put('/:shortId', auth.isAuthenticated(), controller.update);

router.delete('/:shortId', auth.isAuthorized(), controller.destroy);

router.get('/:shortId/history', auth.isAuthorized(), controller.getHistory);
router.get('/:shortId/recapitulatif', auth.isAuthorized(), controller.getRecapitulatif);

router.get('/:shortId/pdf/:fileName', auth.isAuthorized(), controller.getPdf);
router.get('/:shortId/synthese.pdf', auth.isAuthorized(), controller.getSynthesePdf);

router.use('/:shortId/document', documentsRouter);

module.exports = router;
