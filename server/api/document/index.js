'use strict';

import {Router} from 'express';
import multer from 'multer';
import * as controller from './document.controller';
import * as Auth from '../../auth/auth.service';
import config from '../../config/environment';

const upload = multer({ dest: config.uploadDir });
const router = new Router({mergeParams: true});

router.post('/', upload.single('file'), controller.saveFile);
router.put('/:fileId', controller.updateFile);
router.get('/:fileName', controller.downloadFile);
router.delete('/:fileId', controller.deleteFile);
router.post('/partenaire', upload.single('file'), controller.saveFilePartenaire);

export default router;
