'use strict';

var express = require('express');
var controller = require('./request.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('adminMdph'), controller.index);
router.post('/', auth.isAuthenticated(), controller.save);
router.get('/:shortId', auth.isAuthenticated(), controller.show); // Rajouter regle si user = owner ou adminMdph
router.get('/:shortId/partenaire', controller.showPartenaire);

router.put('/:shortId', auth.isAuthenticated(), controller.update);

router.delete('/:shortId', controller.destroy);

router.get('/:shortId/cerfa.pdf', controller.getCerfa);
router.post('/:shortId/html_answers.pdf', controller.postPdf);
router.post('/:shortId/document', controller.saveDocument);

module.exports = router;
