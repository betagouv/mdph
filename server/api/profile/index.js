'use strict';

var auth = require('../../auth/auth.service');
var express = require('express');
var controller = require('./profile.controller');

var router = express.Router({mergeParams: true});

router.get('/', auth.canAccessProfile(), controller.index);
router.post('/', auth.canAccessProfile(), controller.create);
router.get('/:profileId', auth.isAuthorized(), controller.show);
router.post('/:profileId', auth.isAuthorized(), controller.update);
router.delete('/:profileId', auth.isAuthorized(), controller.destroy);

router.get('/:profileId/requests', auth.isAuthorized(), controller.indexRequests);

module.exports = router;
