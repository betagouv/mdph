'use strict';

import {Router} from 'express';
import * as controller from './synthese.controller';
import * as Auth from '../../auth/auth.service';
import Synthese from './synthese.model';
import compose from 'composable-middleware';

var router = new Router();

router.post('/', isAuthorized(), controller.create);
router.get('/', isAuthorized(), controller.showAllByProfile);
router.get('/:syntheseId', isAuthorized(), controller.show);
router.put('/:syntheseId', isAuthorized(), controller.update);

router.param('syntheseId', function(req, res, next, syntheseId) {
  Synthese
    .findById(syntheseId)
    .populate('user')
    .exec(function(err, synthese) {
      if (err) return next(err);
      if (!synthese) return res.sendStatus(404);

      req.synthese = synthese;
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
        //TODO rajouter une liste de MDPHS pour verifier les droits
        return next();
      }

      return res.sendStatus(401);
    });
}

module.exports = router;
