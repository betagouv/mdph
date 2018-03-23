'use strict';

import mongoose, {Schema} from 'mongoose';
import Request from '../request/request.model';

var ProfileSchema = new Schema({
  user:       { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt:  { type: Date },
  updatedAt:  { type: Date },
  deletedAt:  { type: Date },
  recipient:  { firstname: String, lastname: String },
  identites:  { type: Schema.Types.Mixed }
});

ProfileSchema.pre('save', function(next) {
  var now = Date.now();

  if (this.isNew) {
    this.createdAt = now;
    Request.create({user: this.user._id, profile: this._id, status: 'en_cours'});
  }

  this.updatedAt = now;

  if (this.identites && this.identites.beneficiaire && this.identites.beneficiaire.prenom && this.identites.beneficiaire.nom) {
    this.recipient = {};
    this.recipient.firstname = this.identites.beneficiaire.prenom;
    this.recipient.lastname = this.identites.beneficiaire.nom;
  }

  next();
});

export default mongoose.model('Profile', ProfileSchema);
