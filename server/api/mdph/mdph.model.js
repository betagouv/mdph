'use strict';

import mongoose, {Schema} from 'mongoose';

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
  locations: [
    {
      photo:        { type: String },
      address:      { type: String },
      coordinates: {
        coordx:     { type: String },
        coordy:     { type: String },
      },
      phone:        { type: String },
      email:        { type: String },
      schedule:     { type: String },
    }
  ],
});

export default mongoose.model('Mdph', MdphSchema);
