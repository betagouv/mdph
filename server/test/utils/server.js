import supertest from 'supertest';

import config from '../../config/environment';

import {app, server} from '../../app';

export function startServer(done) {
  var {app, server} = require('../../app');

  server.listen(config.port, config.ip);

  done({
    api: supertest.agent(`http://localhost:${config.port}`),
    server
  });
}
