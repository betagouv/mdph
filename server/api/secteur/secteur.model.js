'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SecteurSchema = new Schema({
  mdph:           { type: Schema.Types.ObjectId, ref: 'Mdph', required: true },
  createdAt:      { type: Date, default: Date.now},
  updatedAt:      { type: Date },
  name:           { type: String, unique: true, required: true },
  evaluators:     [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Secteur', SecteurSchema);
