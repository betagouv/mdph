'use strict';

import mongoose, {Schema} from 'mongoose';

var ProfileSchema = new Schema({
  user:                     { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt:                { type: Date },
  updatedAt:                { type: Date },

  identites:                { type: Schema.Types.Mixed },
  vie_quotidienne:          { type: Schema.Types.Mixed },
  vie_scolaire:             { type: Schema.Types.Mixed },
  vie_au_travail:           { type: Schema.Types.Mixed },
  situations_particulieres: { type: Schema.Types.Mixed },
  aidant:                   { type: Schema.Types.Mixed }
});

ProfileSchema.pre('save', function(next) {
  var now = Date.now();

  if (this.isNew) {
    this.createdAt = now;
  }

  this.updatedAt = now;

  next();
});

try {
  mongoose.model('Profile', ProfileSchema);
} catch (_) {
  // Used only for mocha in watch mode
}

export default mongoose.model('Profile');
