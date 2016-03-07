/**
 * Error responses
 */

'use strict';

module.exports[404] = function pageNotFound(req, res) {
  return res.sendStatus(404);
};
