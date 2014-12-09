'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PartenaireSchema = new Schema({
  email: { type: String, unique: true },
  certified:{ type: String, enum: ['En attente', 'Validé', 'Refusé'], default: 'En attente' }
});

module.exports = mongoose.model('Partenaire', PartenaireSchema);
