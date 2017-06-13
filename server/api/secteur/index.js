'use strict';

import {hasRole} from '../../auth/auth.service';
import {Router} from 'express';
import * as controller from './secteur.controller';

var router = new Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.get('/:id', controller.show);
router.post('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
