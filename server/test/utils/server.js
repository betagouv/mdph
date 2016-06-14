import supertest from 'supertest';

import config from '../../config/environment';

import {app, server} from '../../app';

export function startServer(done) {
  var {app, server} = require('../../app');

  server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });

  done({
    api: supertest.agent(`http://localhost:${config.port}`),
    server
  });
}
