'use strict';

import {Router} from 'express';
import * as controller from './synthese.controller';
import * as Auth from '../../auth/auth.service';
import Synthese from './synthese.model';
import compose from 'composable-middleware';

var router = new Router();

router.post('/', isAuthorized(), controller.create);

router.get('/:shortId', isAuthorized(), controller.show);
router.put('/:shortId', isAuthorized(), controller.update);

router.param('shortId', function(req, res, next, shortId) {
  Synthese
    .findOne({shortId: shortId})
    .populate('user')
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

      if (Auth.meetsRequirements(req.user.role, 'adminMdph') && req.user.mdph.zipcode === req.request.mdph) {
        return next();
      }

      return res.sendStatus(401);
    });
}

module.exports = router;
