'use strict';

var Notification = require('./notification.model');

// Get list of partenaires
exports.index = function(req, res) {
  Notification.find().exec(function(err, notifications) {
    if(err) { return handleError(res, err); }
    return res.json(notifications);
  });
};


// Get a list of notifications
exports.show = function(req, res, next) {
  Notification.findById(req.param.id)
  .exec(function(err, notification) {
    if(err) { return next(err); }
    if(!notification) { return res.send(404); }
    return res.json(notification);
  });
};

// Deletes a notification from the DB.
exports.destroy = function(req, res) {
  Notification.findById(req.param.id, function (err, notification) {
    if(err) { return handleError(res, err); }
    if(!notification) { return res.send(404); }
    notification.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

/**
 * Save notification
 */
exports.create = function(req, res, next) {
  var notification = new Notification();

  notification.user = req.body.userId;
  notification.request = req.body.requestId;
  notification.state =  req.body.state;

  notification.save(function(err, data) {
    if(err) return res.send(500, err);
    return res.send(200, data);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
