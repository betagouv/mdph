'use strict';

import mongoose, {Schema} from 'mongoose';
import { ACTIONS_ENUM } from './actions';

var RequestActionSchema = new Schema({
  mdph:           { type: String },
  user:           { type: Schema.Types.ObjectId, ref: 'User' },
  action:         { type: String, enum: ACTIONS_ENUM },
  request:        { type: Schema.Types.ObjectId, ref: 'Request' },
  date:           { type: Date },
  params:         Schema.Types.Mixed
});

export default mongoose.model('Action', RequestActionSchema);
