'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DocumentCategorySchema = new Schema({
  mdph:             { type: Schema.Types.ObjectId, ref: 'Mdph' },
  label:            { type: String, required: true, default: 'Nouvelle catégorie' },
  documentTypes:    [{type: String}],
  barcode:          { type: Schema.Types.ObjectId },
  position:         { type: Number, default: -1 },
  required:         { type: Boolean, default: false },
  unclassified:     { type: Boolean, default: false }
});

try {
  mongoose.model('DocumentCategory', DocumentCategorySchema);
} catch (_) {
  // Used only for mocha in watch mode
}

export default mongoose.model('DocumentCategory');
