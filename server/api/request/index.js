'use strict';

var express = require('express');
var controller = require('./request.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('adminMdph'), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', controller.destroy);

router.post('/:id/document', auth.isAuthenticated(), controller.saveFakeDocument);
router.put('/:id/document', auth.isAuthenticated(), controller.updateDocumentState);

router.put('/:id/step', auth.isAuthenticated(), controller.updateStep);
router.post('/:id/step', auth.isAuthenticated(), controller.saveStep);

module.exports = router;
