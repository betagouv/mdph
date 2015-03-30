'use strict';

var Notification = require('./notification.model');

// Get list of partenaires
exports.index = function(req, res) {
  Notification.find().exec(function(err, notifications) {
    if(err) { return handleError(req, res, err); }
    return res.status(200).json(notifications);
  });
};


// Get a list of notifications
exports.show = function(req, res, next) {
  Notification.findById(req.params.id)
  .exec(function(err, notification) {
    if(err) { return next(err); }
    if(!notification) { return res.send(404); }
    return res.status(200).json(notification);
  });
};

// Deletes a notification from the DB.
exports.destroy = function(req, res) {
  Notification.findById(req.params.id, function (err, notification) {
    if(err) {
      return handleError(req, res, err);
    }
    if(!notification) {
      return res.send(404);
    }
    notification.remove(function(err) {
      if(err) { return handleError(req, res, err); }
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
  notification.message =  req.body.message;

  notification.save(function(err, data) {
    if(err) return handleError(req, res, err);
    return res.status(200).json(data);
  });
};

function handleError(req, res, err) {
  req.log.error(err);
  return res.status(500).send(err);
}
