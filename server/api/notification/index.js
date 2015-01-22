'use strict';

var express = require('express');
var controller = require('./notification.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/notification/:userId/:shortId', controller.create);
router.get('/notification/:userId', controller.showAll);
router.get('/notification/:userId/:shortId', controller.show);
router.delete('/notification/:userId/:shortId', controller.destroy);

module.exports = router;
