'use strict';

var express = require('express');
var controller = require('./partenaire.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/', controller.save);
router.get('/:id', auth.hasRole('adminMdph'), controller.show);
router.post('/:id', auth.hasRole('adminMdph'), controller.save);
router.patch('/:id', auth.hasRole('adminMdph'), controller.save);
router.delete('/:id', auth.hasRole('adminMdph'), controller.destroy);

router.get('/:id/:secret', controller.confirm);

module.exports = router;
