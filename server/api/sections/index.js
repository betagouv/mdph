'use strict';

import {Router} from 'express';
import * as controller from './sections.controller';

var router = new Router();

router.get('/', controller.index);

module.exports = router;
