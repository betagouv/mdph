'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PartenaireSchema = new Schema({
  email:      { type: String, unique: true },
  name:       { type: String },
  certified:  { type: String, enum: ['en_attente', 'mail_valide', 'certifie', 'refuse'], default: 'en_attente' },
  secret:     { type: String, select: false }
});

module.exports = mongoose.model('Partenaire', PartenaireSchema);
