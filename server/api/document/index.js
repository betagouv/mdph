'use strict';

import {Router} from 'express';
import multer from 'multer';
import * as controller from './document.controller';
import config from '../../config/environment';
import { isAgentOrOwner, isOwner } from '../../auth/auth.service';

const upload = multer({ dest: config.uploadDir });
const router = new Router({mergeParams: true});

router.post('/', isAgentOrOwner(), upload.single('file'), controller.saveFile);
router.put('/:fileId', isAgentOrOwner(), controller.updateFile);
router.get('/:fileName', isAgentOrOwner(), controller.downloadFile);
router.delete('/:fileId', isOwner(), controller.deleteFile);

export default router;
