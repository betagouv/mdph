'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var shortId = require('shortid');

var DocumentSchema = new Schema({
  partenaire:     { type: Schema.Types.ObjectId, ref: 'Partenaire' },
  status:         { type: String, enum: ['validé', 'rejet', 'a_traiter'] },
  type:           { type: String },
  category:       { type: String },

  originalname:   { type: String },
  filename:       { type: String },
  encoding:       { type: String },
  mimetype:       { type: String },
  path:           { type: String },
  extension:      { type: String },
  size:           { type: Number }
});

var RequestSchema = new Schema({
  shortId:        { type: String, unique: true, default: shortId.generate },
  documents:      [DocumentSchema],
  user:           { type: Schema.Types.ObjectId, ref: 'User' },
  mdph:           { type: String },
  evaluator:      { type: Schema.Types.ObjectId, ref: 'User' },
  secteur:        { type: Schema.Types.ObjectId, ref: 'Secteur' },
  createdAt:      { type: Date },
  submittedAt:    { type: Date },
  updatedAt:      { type: Date },
  status:         { type: String, enum: ['en_cours', 'emise', 'a_completer', 'evaluation', 'reponse'], default: 'en_cours' },
  formAnswers:    Schema.Types.Mixed,
  prestations:    [{ type: String }],
  certificat:     Schema.Types.Mixed,
  synthese:       Schema.Types.Mixed
});

module.exports = mongoose.model('Request', RequestSchema);
