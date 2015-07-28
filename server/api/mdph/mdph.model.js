'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MdphSchema = new Schema({
  zipcode:  { type: String, unique: true },
  name:     { type: String },
  logo:     { type: String }
});

module.exports = mongoose.model('Mdph', MdphSchema);
