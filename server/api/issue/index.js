import {Router} from 'express';
import * as controller from './issue.controller';
import Issue from './issue.model';
import {hasRole} from '../../auth/auth.service';

var router = new Router();

router.get('/:section', hasRole('adminMdph'), controller.show);
router.post('/', hasRole('adminMdph'), controller.create);

module.exports = router;
