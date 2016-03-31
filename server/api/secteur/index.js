'use strict';

import {hasRole} from '../../auth/auth.service';
import {Router} from 'express';
import * as controller from './secteur.controller';

var router = new Router();

router.get('/', hasRole('adminMdph'), controller.index);
router.post('/', hasRole('adminMdph'), controller.create);
router.get('/:id', hasRole('adminMdph'), controller.show);
router.post('/:id', hasRole('adminMdph'), controller.update);
router.patch('/:id', hasRole('adminMdph'), controller.update);
router.delete('/:id', hasRole('adminMdph'), controller.destroy);

module.exports = router;
