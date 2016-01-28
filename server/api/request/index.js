'use strict';

var express = require('express');
var controller = require('./request.controller');
var auth = require('../../auth/auth.service');
var config = require('../../config/environment');
var multer  = require('multer');
var compose = require('composable-middleware');

var Mdph = require('../mdph/mdph.model');
var Request = require('./request.model');
var upload = multer({ dest: config.uploadDir });

var router = express.Router();

router.post('/', auth.isAuthenticated(), controller.save);

router.get('/:shortId', auth.isAuthenticated(), controller.show);
router.get('/:shortId/partenaire', controller.showPartenaire);

router.post('/:shortId', auth.isAuthorized(), controller.updateFromAgent);
router.put('/:shortId', auth.isAuthorized(), controller.updateFromUser);

router.delete('/:shortId', auth.isAuthorized(), controller.destroy);

router.get('/:shortId/history', auth.isAuthorized(), controller.getHistory);
router.get('/:shortId/recapitulatif', auth.isAuthorized(), controller.getRecapitulatif);

router.get('/:shortId/pdf/:fileName', auth.isAuthorized(), controller.getPdf);
router.get('/:shortId/synthese.pdf', auth.isAuthorized(), controller.getSynthesePdf);

router.post('/:shortId/document', auth.isAuthorized(), upload.single('file'), controller.saveFile);
router.post('/:shortId/document-partenaire', upload.single('file'), controller.saveFilePartenaire);

router.post('/:shortId/document/:fileId', auth.isAuthorized(), controller.updateFile);
router.get('/:shortId/document/:fileName', auth.isAuthorized(), controller.downloadFile);
router.delete('/:shortId/document/:fileId', auth.isAuthorized(), controller.deleteFile);

router.get('/:shortId/simulation', auth.isAuthorized(), controller.simulate);
router.get('/:shortId/resend-mail', auth.isAuthorized(), controller.resendMail);

module.exports = router;
