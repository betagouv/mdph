'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

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

var FormSchema = new Schema({
  formAnswers:  Schema.Types.Mixed,
  user:         { type: Schema.Types.ObjectId, ref: 'User' },
  updatedAt:    { type: Date },
  steps:        [ StepSchema ]
});

module.exports = mongoose.model('Form', FormSchema);
