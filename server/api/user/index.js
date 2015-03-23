'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');
var requestController = require('../request/request.controller');

var router = express.Router();

router.get('/', auth.hasRole('adminMdph'), controller.index);
router.delete('/:id', auth.hasRole('adminMdph'), controller.destroy);
router.put('/:id', auth.isAuthenticated(), controller.changeInfo);

router.get('/me', auth.isAuthenticated(), controller.me);
router.post('/generate_token', controller.generateToken);

router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);

router.get('/me/requests', auth.isAuthenticated(), requestController.showUserRequests);

router.get('/:id/notifications', auth.isAuthenticated(), controller.showNotifications);

router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
router.post('/:id/reset_password/:secret', controller.resetPassword)

module.exports = router;
