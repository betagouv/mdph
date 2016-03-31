'use strict';

import {canAccessProfile, isAuthorized} from '../../auth/auth.service';
import {Router} from 'express';
import * as controller from './profile.controller';

var router = new Router({mergeParams: true});

router.get('/', canAccessProfile(), controller.index);
router.post('/', canAccessProfile(), controller.create);
router.get('/me', canAccessProfile(), controller.showMe);
router.get('/:profileId', isAuthorized(), controller.show);
router.post('/:profileId', isAuthorized(), controller.update);
router.delete('/:profileId', isAuthorized(), controller.destroy);

router.get('/:profileId/requests', isAuthorized(), controller.indexRequests);

module.exports = router;
