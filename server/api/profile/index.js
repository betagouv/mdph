'use strict';

import auth from '../../auth/auth.service';
import {Router} from 'express';
import controller from './profile.controller';
import synthesesRouter from '../synthese';
import Profile from './profile.model';

var router = new Router({mergeParams: true});

router.use('/:profileId/syntheses', synthesesRouter);

router.get('/', auth.canAccessProfile(), controller.index);
router.post('/', auth.canAccessProfile(), controller.create);
router.get('/me', auth.canAccessProfile(), controller.showMe);
router.get('/:profileId', auth.isAuthorized(), controller.show);
router.post('/:profileId', auth.isAuthorized(), controller.update);
router.delete('/:profileId', auth.isAuthorized(), controller.destroy);

router.get('/:profileId/requests', auth.isAuthorized(), controller.indexRequests);

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
