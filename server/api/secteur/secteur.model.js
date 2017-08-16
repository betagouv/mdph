'use strict';

import mongoose, {Schema} from 'mongoose';

var SecteurSchema = new Schema({
  mdph:           { type: Schema.Types.ObjectId, ref: 'Mdph', required: true },
  createdAt:      { type: Date, default: Date.now},
  updatedAt:      { type: Date },
  name:           { type: String, unique: false, required: true },
  communes:       [{ type: String }]
});

export default mongoose.model('Secteur', SecteurSchema);
