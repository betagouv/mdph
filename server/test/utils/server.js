import supertest from 'supertest';

import config from '../../config/environment';

import {server} from '../../app';

export function startServer(done) {
  server.listen(config.port, config.ip);

  done({
    api: supertest.agent(`http://localhost:${config.port}`),
    server:server
  });
}
