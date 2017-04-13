import supertest from 'supertest';

import config from '../../server/config/environment';
import { server } from '../../server/app';

export function startServer(done) {
  server.listen(config.port, config.ip);

  done({
    api: supertest.agent(`http://localhost:${config.port}`),
    server:server
  });
}
