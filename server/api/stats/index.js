'use strict';

import {Router} from 'express';
import * as controller from './stats.controller';

var router = new Router();
router.get('/users', controller.users);
router.get('/mdphs', controller.mdphs);
router.get('/likes', controller.likes);
router.get('/request-count-history', controller.requestCountHistory);
router.get('/request-analysis', controller.requestAnalysis);
router.get('/request-median-time', controller.requestMedianTime);
router.get('/created-request-count', controller.createdRequestCount);
router.get('/submitted-request-count', controller.submittedRequestCount);
router.get('/request-count-by-mdph', controller.requestCountByMdph);
router.get('/request-raw-data', controller.requestRawData);

module.exports = router;
