'use strict';

import mongoose, {Schema} from 'mongoose';

var MdphSchema = new Schema({
  zipcode:  { type: String, unique: true },
  name:     { type: String },
  logo:     { type: String },
  enabled:  { type: Boolean },
  opened:   { type: Boolean },
  coordinates: {
    coordx:   { type: String },
    coordy:   { type: String },
  },
  address:  { type: String },
  phone:    { type: String },
  email:    { type: String },
  likes:    [{ type: String }]
});

export default mongoose.model('Mdph', MdphSchema);
