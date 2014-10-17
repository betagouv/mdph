/**
 * Error responses
 */

'use strict';

module.exports[404] = function pageNotFound(req, res) {
  return res.send(404);
  // TODO une jolie 404
  /*
  var viewFilePath = '404';
  var statusCode = 404;
  var result = {
    status: statusCode
  };

  res.status(result.status);
  res.render(viewFilePath, function (err) {
    if (err) { return res.json(result, result.status); }

    res.render(viewFilePath);
  });
  */
};
