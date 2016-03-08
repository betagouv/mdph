'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

try {
  mongoose.model('Secteur', SecteurSchema);
} catch (_) {
  // Used only for mocha in watch mode
}

export default mongoose.model('Secteur');
