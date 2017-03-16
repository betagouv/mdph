'use strict';

import {Router} from 'express';
import * as controller from './synthese.controller';
import { hasRole } from '../../auth/auth.service';
import Synthese from './synthese.model';

var router = new Router();

router.post('/', hasRole('adminMdph'), controller.create);
router.get('/', hasRole('adminMdph'), controller.showAllByProfile);
router.get('/:syntheseId', hasRole('adminMdph'), controller.show);
router.put('/:syntheseId', hasRole('adminMdph'), controller.update);

router.param('syntheseId', function(req, res, next, syntheseId) {
  Synthese
    .findById(syntheseId)
    .populate('user')
    .populate('request', 'shortId')
    .exec(function(err, synthese) {
      if (err) {
        return next(err);
      }

      if (!synthese) return res.sendStatus(404);

      req.synthese = synthese;
      next();
    });
});

module.exports = router;
