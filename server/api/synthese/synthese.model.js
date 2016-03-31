'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SyntheseSchema = new Schema({
  user:           { type: Schema.Types.ObjectId, ref: 'User', required: true },
  profile:        { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
  request:        { type: Schema.Types.ObjectId, ref: 'Request', required: true },
  createdAt:      Date,
  updatedAt:      Date,
  geva:           Schema.Types.Mixed
});

SyntheseSchema.pre('save', function(next) {
  var now = Date.now();

  if (this.isNew) {
    this.createdAt = now;
  }

  this.updatedAt = now;

  next();
});

try {
  mongoose.model('Synthese', SyntheseSchema);
} catch (_) {
  // Used only for mocha in watch mode
}

export default mongoose.model('Synthese');
