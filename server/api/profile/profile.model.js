'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfileSchema = new Schema({
  user:           { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt:      { type: Date },
  updatedAt:      { type: Date },

  name:           { type: String },
  identites:      Schema.Types.Mixed
});

ProfileSchema.pre('save', function(next) {
  var now = Date.now();

  if (this.isNew) {
    this.createdAt = now;
  }

  this.updatedAt = now;

  next();
});

module.exports = mongoose.model('Profile', ProfileSchema);
