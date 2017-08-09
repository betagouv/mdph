'use strict';

import mongoose, {Schema} from 'mongoose';

var AdressSchema = new Schema({
  name:         { type: String, required: true},
  address:      { type: String, required: true },
  phone:        { type: String },
  email:        { type: String },
  schedule:     { type: String },
  coordinates: {
    coordx:     { type: String, required: true },
    coordy:     { type: String, required: true },
  }
});

var MdphSchema = new Schema({
  zipcode:      { type: String, unique: true },
  name:         { type: String },
  logo:         { type: String },
  enabled:      { type: Boolean },
  opened:       { type: Boolean },
  likes:        [{ type: String }],
  outsideLink: {
    href:       { type: String },
    label:      { type: String }
  },
  headquarters: { type: AdressSchema, required: true },
  subsidiairies: [ AdressSchema ],
  requestExportFormat: { type: String, enum: ['pdf', 'zip'], default: 'pdf' }
});

export default mongoose.model('Mdph', MdphSchema);
