'use strict';

var express = require('express');
var controller = require('./request.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('adminMdph'), controller.index);
router.post('/', auth.isAuthenticated(), controller.save);
router.get('/:shortId', auth.isAuthorized(), controller.show);
router.get('/:shortId/partenaire', controller.showPartenaire);

router.put('/:shortId', auth.isAuthorized(), controller.update);

router.delete('/:shortId', auth.isAuthorized(), controller.destroy);

router.get('/:shortId/cerfa.pdf', auth.isAuthorized(), controller.getCerfa);
router.post('/:shortId/html_answers.pdf', auth.isAuthorized(), controller.postPdf);

router.post('/:shortId/document', controller.saveDocument);
router.get('/:shortId/document/:documentId', auth.isAuthorized(), controller.showFileData);
router.get('/:shortId/document/:documentId/download', auth.isAuthorized(), controller.downloadFile);

module.exports = router;
