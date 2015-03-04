'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var shortId = require('shortid');

var DocumentSchema = new Schema({
  type:           { type: String },
  files:          [{ type: Schema.Types.ObjectId }]
});

var RequestSchema = new Schema({
  shortId:        { type: String, unique: true, default: shortId.generate },
  documents:      [ DocumentSchema ],
  user:           { type: Schema.Types.ObjectId, ref: 'User' },
  mdph:           { type: String },
  evaluator:      { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt:      { type: Date },
  updatedAt:      { type: Date },
  status:         { type: String, enum: ['en_cours', 'emise', 'a_completer', 'evaluation', 'reponse'], default: 'en_cours' },
  formAnswers:    Schema.Types.Mixed,
  certificat:     Schema.Types.Mixed
});

module.exports = mongoose.model('Request', RequestSchema);
