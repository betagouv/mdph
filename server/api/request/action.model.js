'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActionSchema = new Schema({
  mdph:           { type: String },
  user:           { type: Schema.Types.ObjectId, ref: 'User' },
  action:         { type: String },
  request:        { type: Schema.Types.ObjectId, ref: 'Request' },
  date:           { type: Date },
  params:         Schema.Types.Mixed
});

module.exports = mongoose.model('Action', ActionSchema);
