'use strict';

import mongoose, { Schema } from 'mongoose';
import { ACTIONS_ENUM } from './actions';

var UserActionSchema = new Schema({
  mdph:           { type: Schema.Types.ObjectId, ref: 'Mdph' },
  user:           { type: Schema.Types.ObjectId, ref: 'User' },
  date:           { type: Date },
  action:         { type: String, enum: ACTIONS_ENUM },
  params:         Schema.Types.Mixed
});

export default mongoose.model('UserAction', UserActionSchema);
