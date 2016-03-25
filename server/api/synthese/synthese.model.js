'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var shortId = require('shortid');
var ActionModel = require('./action.model');

var SyntheseSchema = new Schema({
  shortId:        { type: String, unique: true, default: shortId.generate },
  user:           { type: Schema.Types.ObjectId, ref: 'User', required: true },
  profile:        { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
  createdAt:      Date,
  updatedAt:      Date,
  geva:           Schema.Types.Mixed,
  proposition:    Schema.Types.Mixed
});

SyntheseSchema.pre('save', function(next) {
  var now = Date.now();

  if (this.isNew) {
    this.createdAt = now;
  }

  this.updatedAt = now;

  next();
});

SyntheseSchema.methods = {
  saveActionLog(action, user, log, params, done) {
    ActionModel.create({
      action: action.id,
      request: this._id,
      user: user._id,
      date: Date.now(),
      params: params
    }, function(err, action) {
      if (err) log.error(err);

      log.info(action._doc);
    });
  }
};

try {
  mongoose.model('Synthese', SyntheseSchema);
} catch (_) {
  // Used only for mocha in watch mode
}

export default mongoose.model('Synthese');
