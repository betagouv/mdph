'use strict';

var express = require('express');
var controller = require('./request.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('adminMdph'), controller.index);
router.post('/', auth.isAuthenticated(), controller.save);

router.post('/:shortId/transfer/:userId', auth.isAuthorized(), controller.transfer);

router.get('/:shortId', auth.isAuthorized(), controller.show);
router.get('/:shortId/partenaire', controller.showPartenaire);

router.post('/:shortId', auth.isAuthorized(), controller.updateStatus);
router.put('/:shortId', auth.isAuthorized(), controller.update);

router.delete('/:shortId', auth.isAuthorized(), controller.destroy);

router.get('/:shortId/cerfa.pdf', auth.isAuthorized(), controller.getCerfa);
router.get('/:shortId/questionnaire.pdf', auth.isAuthorized(), controller.getPdf);
router.get('/:shortId/recapitulatif', auth.isAuthorized(), controller.getRecapitulatif);
router.get('/:shortId/synthese.pdf', auth.isAuthorized(), controller.getSynthesePdf);

router.post('/:shortId/document', controller.saveFile);
router.get('/:shortId/document/:fileName', auth.isAuthorized(), controller.downloadFile);
router.delete('/:shortId/document/:fileId', auth.isAuthorized(), controller.deleteFile);

router.get('/:shortId/simulation', auth.isAuthorized(), controller.simulate);
router.get('/:shortId/resend-mail', auth.isAuthorized(), controller.resendMail);

module.exports = router;
