'use strict';

var express = require('express');
var controller = require('./request.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('adminMdph'), controller.index);
router.post('/', auth.isAuthenticated(), controller.save);
router.get('/:shortId', auth.isAuthenticated(), controller.show);
router.get('/:shortId/partenaire', controller.showPartenaire);

router.put('/:shortId', auth.isAuthenticated(), controller.update);

router.delete('/:shortId', controller.destroy);

router.post('/:shortId/document', controller.saveFakeDocument); // TODO remettre isAuth
router.put('/:shortId/document', auth.isAuthenticated(), controller.updateDocumentState);

router.put('/:shortId/step', auth.isAuthenticated(), controller.updateStep);
router.post('/:shortId/step', auth.isAuthenticated(), controller.saveStep);

router.post('/:shortId/status', auth.isAuthenticated(), controller.saveRequestStatus);

module.exports = router;
