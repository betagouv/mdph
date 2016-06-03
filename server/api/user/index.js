'use strict';

import {Router} from 'express';
import * as controller from './user.controller';
import config from '../../config/environment';
import auth from '../../auth/auth.service';
import {showUserRequests} from '../request/request.controller';
import profilesRouter from '../profile';

var router = new Router();

router.use('/:userId/profiles', profilesRouter);

router.get('/', auth.hasRole('adminMdph'), controller.index);
router.get('/me', auth.isAuthenticated(), controller.me);

router.get('/me/requests', auth.isAuthenticated(), showUserRequests);

router.get('/search', auth.hasRole('adminMdph'), controller.search);
router.get('/:id', auth.isAuthenticated(), controller.show);

router.post('/', controller.create);
router.post('/agent', auth.hasRole('adminMdph'), controller.createAgent);
router.post('/generate_token', controller.generateTokenForPassword);
router.post('/:id/reset_password/:secret', controller.resetPassword);
router.post('/:id/confirmer_mail/:secret', controller.confirmMail);
router.post('/:id/resend_confirmation', controller.resendConfirmation);

router.post('/:id/confirm', auth.hasRole('adminMdph'), controller.confirm);

router.put('/:id', auth.isAuthenticated(), controller.changeInfo);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);

router.delete('/:id', auth.hasRole('adminMdph'), controller.destroy);

module.exports = router;
