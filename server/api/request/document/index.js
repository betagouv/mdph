'use strict';

import express from 'express';
import multer from 'multer';
import controller from './document.controller';
import auth from '../../../auth/auth.service';
import config from '../../../config/environment';

const upload = multer({ dest: config.uploadDir });
const router = express.Router({mergeParams: true});

router.post('/', auth.isAuthorized(), upload.single('file'), controller.saveFile);
router.post('/partenaire', upload.single('file'), controller.saveFilePartenaire);
router.put('/:fileId', auth.isAuthorized(), controller.updateFile);
router.get('/:fileName', auth.isAuthorized(), controller.downloadFile);
router.delete('/:fileId', auth.isAuthenticated(), controller.deleteFile);

export default router;
