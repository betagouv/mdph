'use strict';

import {Router} from 'express';
import * as controller from './synthese.controller';
import Synthese from './synthese.model';
import Mdph from '../mdph/mdph.model';
import { isEvaluateur } from '../../auth/auth.service';

var router = new Router();

router.post('/', isEvaluateur(), controller.create);
router.get('/', isEvaluateur(), controller.showAllByMdph);
router.get('/:syntheseId/pdf', isEvaluateur(), controller.getPdf);
router.get('/:syntheseId', isEvaluateur(), controller.show);
router.put('/:syntheseId', isEvaluateur(), controller.update);

router.param('syntheseId', function(req, res, next, syntheseId) {
  Synthese
    .findById(syntheseId)
    .exec(function(err, synthese) {
      if (err) {
        return next(err);
      }

      if (!synthese) return res.sendStatus(404);

      Mdph
        .findById(synthese.mdph)
        .exec()
        .then(mdph => {
          req.mdph = mdph;
          req.synthese = synthese;
          next();
        });
    });
});

module.exports = router;
