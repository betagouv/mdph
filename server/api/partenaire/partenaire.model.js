'use strict';

import mongoose, {Schema} from 'mongoose';

var PartenaireSchema = new Schema({
  email:      { type: String, unique: true },
  name:       { type: String },
  certified:  { type: String, enum: ['mail_non_valide', 'en_attente',  'certifie', 'refuse'], default: 'mail_non_valide' },
  secret:     { type: String, select: false },
  mdph:       { type: Schema.Types.ObjectId, ref: 'Mdph' }
});

export default mongoose.model('Partenaire', PartenaireSchema);
