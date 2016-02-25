'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MdphSchema = new Schema({
  zipcode:  { type: String, unique: true },
  name:     { type: String },
  logo:     { type: String },
  enabled:  { type: Boolean }
});

module.exports = mongoose.model('Mdph', MdphSchema);
