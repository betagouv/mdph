'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MdphSchema = new Schema({
  name: String,
  zipcode: String
});

module.exports = mongoose.model('Mdph', MdphSchema);
