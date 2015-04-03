'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DispatchRuleSchema = new Schema({
  mdph:           { type: String },
  createdAt:      { type: Date },
  updatedAt:      { type: Date },
  evaluators:     [{ type: Schema.Types.ObjectId, ref: 'User' }],
  zipcodes:       [{ type: String }]
});

module.exports = mongoose.model('DispatchRule', DispatchRuleSchema);
