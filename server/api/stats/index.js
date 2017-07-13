'use strict';

import {Router} from 'express';
import * as controller from './stats.controller';

var router = new Router();

router.get('/mdph', controller.mdph);
router.get('/site', controller.site);
router.get('/history', controller.history);
router.get('/users', controller.users);
router.get('/likes', controller.likes);
router.get('/time', controller.time);

module.exports = router;
