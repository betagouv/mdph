'use strict';

var express = require('express');
var controller = require('./request.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('adminMdph'), controller.index);
router.get('/:shortId', auth.isAuthenticated(), controller.show);
router.put('/:shortId', auth.isAuthenticated(), controller.update);
router.delete('/:shortId', controller.destroy);

router.post('/:shortId/document', auth.isAuthenticated(), controller.saveFakeDocument);
router.put('/:shortId/document', auth.isAuthenticated(), controller.updateDocumentState);

router.put('/:shortId/step', auth.isAuthenticated(), controller.updateStep);
router.post('/:shortId/step', auth.isAuthenticated(), controller.saveStep);

module.exports = router;
