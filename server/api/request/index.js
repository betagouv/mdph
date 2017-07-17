'use strict';

import {Router} from 'express';
import multer from 'multer';
import documentsRouter from '../document';
import * as controller from './request.controller';
import { isAgentOrOwner } from '../../auth/auth.service';
import Request from './request.model';
import config from '../../config/environment';

var router = new Router();
const upload = multer({ dest: config.uploadDir });

router.get('/:shortId', isAgentOrOwner(), controller.show);
router.get('/:shortId/partenaire', controller.showPartenaire);

router.post('/:shortId', isAgentOrOwner(), controller.update);
router.put('/:shortId', isAgentOrOwner(), controller.update);

router.delete('/:shortId', isAgentOrOwner(), controller.destroy);

router.get('/:shortId/generate-reception-mail', isAgentOrOwner(), controller.generateReceptionMail);
router.post('/:shortId/action', isAgentOrOwner(), controller.saveAction);
router.get('/:shortId/history', isAgentOrOwner(), controller.getHistory);
router.get('/:shortId/recapitulatif', isAgentOrOwner(), controller.getRecapitulatif);

router.get('/:shortId/pdf/:fileName', isAgentOrOwner(), controller.getPdf);

router.post('/:shortId/document/partenaire', upload.single('file'), controller.saveFilePartenaire);
router.use('/:shortId/document', isAgentOrOwner(), documentsRouter);

router.param('shortId', function(req, res, next, shortId) {
  Request
    .findOne({shortId: shortId})
    .populate('user')
    .populate('evaluator')
    .exec(function(err, request) {
      if (err) return next(err);
      if (!request) return res.sendStatus(404);

      req.request = request;
      return request;
    })
    .then(request => {
      return request.getFullMdph().then(mdph => {
        if (mdph) {
          request.fullMdph = mdph;
        }

        return request;
      });
    })
    .then(() => {
      next();
    });
});

module.exports = router;
