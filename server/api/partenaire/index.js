'use strict';

import {Router} from 'express';
import * as controller from './partenaire.controller';
import {hasRole} from '../../auth/auth.service';

var router = new Router();

router.post('/', controller.save);
router.get('/:id', controller.show);
router.post('/:id', hasRole('adminMdph'), controller.save);
router.patch('/:id', hasRole('adminMdph'), controller.save);
router.delete('/:id', hasRole('adminMdph'), controller.destroy);

router.get('/:id/:secret', controller.confirm);

module.exports = router;
