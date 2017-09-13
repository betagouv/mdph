'use strict';

import mongoose, {Schema} from 'mongoose';

var MdphSchema = new Schema({
  zipcode:      { type: String, unique: true },
  name:         { type: String },
  logo:         { type: String },
  enabled:      { type: Boolean },
  opened:       { type: Boolean },
  evaluate:     { type: Boolean },
  likes:        [{ type: String }],
  outsideLink: {
    href:       { type: String },
    label:      { type: String }
  },
  locations: [
    {
      name:         { type: String },
      address:      { type: String },
      coordinates: {
        coordx:     { type: String },
        coordy:     { type: String },
      },
      phone:        { type: String },
      email:        { type: String },
      schedule:     { type: String },
      headquarters: { type: Boolean },
    }
  ],
  requestExportFormat: { type: String, enum: ['pdf', 'zip'], default: 'pdf' }
});

export default mongoose.model('Mdph', MdphSchema);
