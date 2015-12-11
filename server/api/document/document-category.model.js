'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DocumentCategorySchema = new Schema({
  mdph:             { type: Schema.Types.ObjectId, ref: 'Mdph' },
  label:            { type: String },
  documentTypes:    [{type: String}],
  barcode: {
    originalname:   { type: String },
    filename:       { type: String },
    encoding:       { type: String },
    mimetype:       { type: String },
    path:           { type: String },
    extension:      { type: String },
    size:           { type: Number }
  }
});

module.exports = mongoose.model('DocumentCategory', DocumentCategorySchema);
