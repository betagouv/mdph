'use strict';

import {canAccessProfile, isAuthorized} from '../../auth/auth.service';
import {Router} from 'express';
import * as controller from './profile.controller';
import Profile from './profile.model';

import synthesesRouter from '../synthese';

var router = new Router({mergeParams: true});

router.get('/', canAccessProfile(), controller.index);
router.post('/', canAccessProfile(), controller.create);
router.get('/me', canAccessProfile(), controller.showMe);
router.get('/:profileId', isAuthorized(), controller.show);

router.post('/:profileId', isAuthorized(), controller.update);
router.delete('/:profileId', isAuthorized(), controller.destroy);

router.get('/:profileId/requests', isAuthorized(), controller.indexRequests);
router.get('/:profileId/requests/current', isAuthorized(), controller.showCurrentRequest);
router.get('/:profileId/requests/count', isAuthorized(), controller.count);

router.use('/:profileId/syntheses', synthesesRouter);

router.param('profileId', function(req, res, next, profileId) {
  Profile
    .findById(profileId)
    .exec(function(err, profile) {
      if (err) return next(err);
      if (!profile) return res.sendStatus(404);

      req.profile = profile;
      next();
    });
});

module.exports = router;
