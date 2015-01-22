'use strict';

var Notification = require('./notification.model');

// Get a notification
exports.showAll = function(req, res, next) {
  var search = {};
  if(req.request){
    search.request = req.request.shortId;
  }
  if(req.user){
    search.user = req.user._id
  }
  Notification.find(search)
  .exec(function(err, notification) {
    if(err) { return next(err); }
    if(!notification) { return res.send(404); }
    return res.json(notification);
  });
};

// Get a list of notifications
exports.show = function(req, res, next) {
  var search = {};
  if(req.request){
    search.request = req.request.shortId;
  }
  if(req.user){
    search.user = req.user._id
  }
  Notification.findOne(search)
  .exec(function(err, notification) {
    if(err) { return next(err); }
    if(!notification) { return res.send(404); }
    return res.json(notification);
  });
};

// Deletes a notification from the DB.
exports.destroy = function(req, res) {
  var search = {};
  if(req.request){
    search.request = req.request.shortId;
  }
  if(req.user){
    search.user = req.user._id
  }
  Notification.findOne(search, function (err, notification) {
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
exports.save = function(req, res, next) {
  var notification = new Notification();

  notification.user = req.user._id;
  notification.request = req.request.shortId;
  notification.state =  req.state;

  notification.save(function(err, data) {
    if(err) return res.send(500, err);
    return res.send(200, data);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
