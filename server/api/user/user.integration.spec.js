'use strict';

import should from 'should';
import {startServer} from '../../test/utils/server';
import * as controller from './user.controller';

describe('User Integration', function() {
  let api;
  let token;
  let tokenAdmin;
  let tokenAdminMdph;
  let testUser;
  let server;

  before(done => {
    startServer(result => {
      server = result.server;
      api = result.api;
      token = result.token;
      tokenAdmin = result.tokenAdmin;
      tokenAdminMdph = result.tokenAdminMdph;
      testUser = result.fakeUser;
    });
  });

  describe('Create Synthese', function() {

  });

});
