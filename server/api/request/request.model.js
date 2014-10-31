'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var shortId = require('shortid');

var FileSchema = new Schema({
  name:           { type: String },
  path:           { type: String },
  state:          { type: String }
});

var StepSchema = new Schema({
  name:         { type: String },
  state:        { type: String },
  files:        [ FileSchema ]
});

var RequestSchema = new Schema({
  shortId:      { type: String, unique: true, 'default': shortId.generate }, 
  formAnswers:  Schema.Types.Mixed,
  user:         { type: Schema.Types.ObjectId, ref: 'User' },
  mdph:         { type: Schema.Types.ObjectId, ref: 'Mdph' },
  updatedAt:    { type: Date },
  steps:        [ StepSchema ],
  opened:       { type: Boolean },
  certificat:   Schema.Types.Mixed
});

module.exports = mongoose.model('Request', RequestSchema);
