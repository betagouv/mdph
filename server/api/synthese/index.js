'use strict';

import {Router} from 'express';
import * as controller from './synthese.controller';
import Synthese from './synthese.model';
//import { isAgent } from '../../auth/auth.service';

var router = new Router();

router.post('/', controller.create);
router.get('/', controller.showAllByMdph);
router.get('/:syntheseId', controller.show);
router.put('/:syntheseId', controller.update);

router.param('syntheseId', function(req, res, next, syntheseId) {
  Synthese
    .findById(syntheseId)
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
