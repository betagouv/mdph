'use strict';

var auth = require('../../auth/auth.service');
var express = require('express');
var controller = require('./profile.controller');

var router = express.Router({mergeParams: true});

router.get('/', auth.isAuthorized(), controller.index);
router.post('/', auth.isAuthorized(), controller.create);
router.get('/:id', auth.isAuthorized(), controller.show);
router.post('/:id', auth.isAuthorized(), controller.update);
router.delete('/:id', auth.isAuthorized(), controller.destroy);

module.exports = router;
