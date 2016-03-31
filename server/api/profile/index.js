'use strict';

var auth = require('../../auth/auth.service');
var express = require('express');
var controller = require('./profile.controller');
var synthesesRouter = require('../synthese');

var router = express.Router({mergeParams: true});

router.use('/:profileId/syntheses', synthesesRouter);

router.get('/', auth.canAccessProfile(), controller.index);
router.post('/', auth.canAccessProfile(), controller.create);
router.get('/me', auth.canAccessProfile(), controller.showMe);
router.get('/:profileId', auth.isAuthorized(), controller.show);
router.post('/:profileId', auth.isAuthorized(), controller.update);
router.delete('/:profileId', auth.isAuthorized(), controller.destroy);

router.get('/:profileId/requests', auth.isAuthorized(), controller.indexRequests);

module.exports = router;
