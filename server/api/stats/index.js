'use strict';

import {Router} from 'express';
import * as controller from './stats.controller';

var router = new Router();
router.get('/users', controller.users);
router.get('/mdphs', controller.mdphs);
router.get('/likes', controller.likes);
router.get('/request-count-history', controller.requestCountHistory);
router.get('/request-analysis', controller.requestAnalysis);
router.get('/request-count', controller.requestCount);
router.get('/profile-count', controller.profileCount);
router.get('/request-count-by-mdph', controller.requestCountByMdph);

module.exports = router;
