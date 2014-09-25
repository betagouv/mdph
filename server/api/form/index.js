'use strict';

var express = require('express');
var controller = require('./form.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('adminMdph'), controller.index);
router.get('/mine', auth.isAuthenticated(), controller.mine);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/mine', auth.isAuthenticated(), controller.saveForm);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.post('/:id/document', auth.isAuthenticated(), controller.saveDocument);

module.exports = router;
