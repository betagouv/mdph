'use strict';

import {Router} from 'express';
import * as controller from './synthese.controller';
import Synthese from './synthese.model';
import Profile from '../profile/profile.model';

var router = new Router();

router.get('/:profileId', controller.showAllByProfile);
router.get('/:profileId/syntheses/:syntheseId', controller.show);
router.put('/:profileId/syntheses/:syntheseId', controller.update);

router.param('profileId', function(req, res, next, profileId) {
  Profile
    .findById(profileId)
    .exec(function(err, profile) {
      if (err) {
        return next(err);
      }

      if (!profile) return res.sendStatus(404);

      req.profile = profile;
      next();
    });
});

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
