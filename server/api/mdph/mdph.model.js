'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MdphSchema = new Schema({
  id: { type: String, unique: true },
  name: String,
  zipcode: String,
  email: String
});

module.exports = mongoose.model('Mdph', MdphSchema);
