'use strict';

import {Router} from 'express';
import {index, show} from './document-type.controller';

var router = new Router();

router.get('/', index);
router.get('/:id', show);

module.exports = router;
