'use strict';

import mongoose, {Schema} from 'mongoose';

var MdphSchema = new Schema({
  zipcode:  { type: String, unique: true },
  name:     { type: String },
  logo:     { type: String },
  enabled:  { type: Boolean },
  coordinates: {
    coordx:   { type: String },
    coordy:   { type: String },
  },
  address:  { type: String },
  phone:    { type: String },
  email:    { type: String }
});

try {
  mongoose.model('Mdph', MdphSchema);
} catch (_) {
  // Used only for mocha in watch mode
}

export default mongoose.model('Mdph');
