'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FileSchema = new Schema({
  documentType:   { type: String },
  path:           { type: String }
});

var FormSchema = new Schema({
  formAnswers:  Schema.Types.Mixed,
  user:         { type: Schema.Types.ObjectId, ref: 'User' },
  updatedAt:    { type: Date },
  step:         { type: String },
  files:        [ FileSchema ]
});

module.exports = mongoose.model('Form', FormSchema);
