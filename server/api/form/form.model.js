'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FormSchema = new Schema({
  formAnswers:  Schema.Types.Mixed,
  user:         { type: Schema.Types.ObjectId, ref: 'User' },
  updatedAt:    { type: Date },
  readOnly:     { type: Boolean }
});

module.exports = mongoose.model('Form', FormSchema);
