'use strict';

import {Router} from 'express';
import multer from 'multer';
import documentsRouter from '../document';
import * as controller from './request.controller';
import * as Auth from '../../auth/auth.service';
import Request from './request.model';
import compose from 'composable-middleware';
import config from '../../config/environment';

var router = new Router();
const upload = multer({ dest: config.uploadDir });

router.post('/', Auth.isAuthenticated(), controller.create);

router.get('/:shortId', isAuthorized(), controller.show);
router.get('/:shortId/partenaire', controller.showPartenaire);

router.post('/:shortId', isAuthorized(), controller.update);
router.put('/:shortId', isAuthorized(), controller.update);

router.delete('/:shortId', isAuthorized(), controller.destroy);

router.get('/:shortId/history', isAuthorized(), controller.getHistory);
router.get('/:shortId/recapitulatif', isAuthorized(), controller.getRecapitulatif);

router.get('/:shortId/pdf/:fileName', isAuthorized(), controller.getPdf);
router.get('/:shortId/synthese.pdf', isAuthorized(), controller.getSynthesePdf);

router.use('/:shortId/document', isAuthorized(), documentsRouter);

// TODO FIX THIS
router.post('/partenaire', upload.single('file'), controller.saveFilePartenaire);

router.param('shortId', function(req, res, next, shortId) {
  Request
    .findOne({shortId: shortId})
    .populate('user')
    .populate('evaluator')
    .exec(function(err, request) {
    if (err) return next(err);
    if (!request) return res.sendStatus(404);

    req.request = request;
    next();
  });
});

function isAuthorized() {
  return compose()
    .use(Auth.isAuthenticated())
    .use(function(req, res, next) {
      if (Auth.meetsRequirements(req.user.role, 'admin')) {
        return next();
      }

      if (Auth.meetsRequirements(req.user.role, 'adminMdph')) {
        return next();
      }

      if (req.user._id.equals(req.request.user._id)) {
        return next();
      }

      return res.sendStatus(401);
    });
}

module.exports = router;
