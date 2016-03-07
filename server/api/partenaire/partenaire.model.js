'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PartenaireSchema = new Schema({
  email:      { type: String, unique: true },
  name:       { type: String },
  certified:  { type: String, enum: ['mail_non_valide', 'en_attente',  'certifie', 'refuse'], default: 'mail_non_valide' },
  secret:     { type: String, select: false },
  mdph:       { type: Schema.Types.ObjectId, ref: 'Mdph' }
});

try {
  mongoose.model('Partenaire', PartenaireSchema);
} catch (_) {
  // Used only for mocha in watch mode
}

export default mongoose.model('Partenaire');
