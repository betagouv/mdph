'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var shortId = require('shortid');

var RequestSchema = new Schema({
  shortId:        { type: String, unique: true, default: shortId.generate },
  documents:      [{
    id:             { type: String, unique: true },
    files:          [{ type: Schema.Types.ObjectId }]
  }],
  user:           { type: Schema.Types.ObjectId, ref: 'User' },
  mdph:           { type: Schema.Types.ObjectId, ref: 'Mdph' },
  evaluator:      { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt:      { type: Date },
  updatedAt:      { type: Date },
  status:         { type: String, enum: ['en_cours', 'emise', 'complet', 'reponse'], default: 'en_cours' },
  formAnswers:    Schema.Types.Mixed,
  certificat:     Schema.Types.Mixed
});

module.exports = mongoose.model('Request', RequestSchema);
