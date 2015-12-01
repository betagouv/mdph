'use strict';

var auth = require('../../auth/auth.service');
var express = require('express');
var controller = require('./secteur.controller');

var router = express.Router();

router.post('/', auth.hasRole('adminMdph'), controller.create);
router.get('/:id', auth.hasRole('adminMdph'), controller.show);
router.post('/:id', auth.hasRole('adminMdph'), controller.update);
router.patch('/:id', auth.hasRole('adminMdph'), controller.update);
router.delete('/:id', auth.hasRole('adminMdph'), controller.destroy);

module.exports = router;
