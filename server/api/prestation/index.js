'use strict';

import {Router} from 'express';
import {index} from './prestation.controller';

var router = new Router();

router.get('/', index);

module.exports = router;
