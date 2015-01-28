'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NotificationSchema = new Schema({
  user:       { type: Schema.Types.ObjectId, ref: 'User' },
  request:    { type: String },
  state:      { type: String },
  message:    { type: String }
});

module.exports = mongoose.model('Notification', NotificationSchema);
