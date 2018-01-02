'use strict';

import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var SyntheseSchema = new Schema({
  firstname:      String,
  lastname:       String,
  birthdate:      String,
  mdph:           String,
  geva:           Schema.Types.Mixed,
  createdAt:      Date,
  updatedAt:      Date,
  deficienceQuestionId: String
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

export default mongoose.model('Synthese', SyntheseSchema);
