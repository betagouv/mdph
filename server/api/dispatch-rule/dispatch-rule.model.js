'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DispatchRuleSchema = new Schema({
  mdph:           { type: Schema.Types.ObjectId, ref: 'Mdph', required: true },
  createdAt:      { type: Date },
  updatedAt:      { type: Date },
  commune: {
    nom: String,
    codePostal: String
  },
  secteur:  {
    enfant: { type: Schema.Types.ObjectId, ref: 'Secteur' },
    adulte: { type: Schema.Types.ObjectId, ref: 'Secteur' }
  }
});

module.exports = mongoose.model('DispatchRule', DispatchRuleSchema);
