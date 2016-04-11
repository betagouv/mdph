'use strict';

import mongoose, {Schema} from 'mongoose';

var SecteurSchema = new Schema({
  mdph:           { type: Schema.Types.ObjectId, ref: 'Mdph', required: true },
  createdAt:      { type: Date, default: Date.now},
  updatedAt:      { type: Date },
  name:           { type: String, unique: false, required: true },
  default:        Boolean,
  evaluators:     {
    enfant: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    adulte: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  }
});

export default mongoose.model('Secteur', SecteurSchema);
