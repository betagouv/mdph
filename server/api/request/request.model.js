'use strict';

import mongoose, {Schema} from 'mongoose';
import _ from 'lodash';
import moment from 'moment';
import shortId from 'shortid';
import Mdph from '../mdph/mdph.model';
import ActionModel from './action.model';
import ProfileModel from '../profile/profile.model';
import DateUtils from '../../components/dateUtils';

var DocumentSchema = new Schema({
  partenaire:     { type: Schema.Types.ObjectId, ref: 'Partenaire' },
  type:           String,
  isInvalid:      Boolean,
  invalidReason:  String,
  isAsked:        Boolean,
  originalname:   String,
  filename:       String,
  encoding:       String,
  mimetype:       String,
  path:           String,
  extension:      String,
  size:           Number
});

var DataSchema = new Schema({
  identites:                { type: Schema.Types.Mixed },
  vie_quotidienne:          { type: Schema.Types.Mixed },
  vie_scolaire:             { type: Schema.Types.Mixed },
  vie_au_travail:           { type: Schema.Types.Mixed },
  situations_particulieres: { type: Schema.Types.Mixed },
  aidant:                   { type: Schema.Types.Mixed },
  prestations:    [{ code: String, precision: String }],
  documents:      [DocumentSchema],
  askedDocumentTypes: [String]
}, { _id: false });

var RequestSchema = new Schema({
  shortId:        { type: String, unique: true, default: shortId.generate },
  user:           { type: Schema.Types.ObjectId, ref: 'User', required: true },
  profile:        { type: Schema.Types.ObjectId, ref: 'Profile' },
  mdph:           String,
  evaluators:     [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt:      Date,
  submittedAt:    Date,
  updatedAt:      Date,
  status:         { type: String, enum: ['en_cours', 'emise', 'enregistree', 'en_attente_usager', 'archive'], default: 'en_cours' },
  data:           { type: DataSchema, default: {} },
  comments:       { type: String },
  hasFirstExpirationNotification: { type: Boolean, default: false },
  hasLastExpirationNotification: { type: Boolean, default: false },
  isDownloaded: { type: Boolean, default: false }
}, { minimize: false });

// RequestSchema.set('toObject', { virtuals: false });

RequestSchema.pre('save', function(next) {
  var now = Date.now();

  if (this.isNew) {
    this.createdAt = now;
  }

  this.updatedAt = now;

  next();
});

RequestSchema.post('save', function(doc) {
  // Set entite from request
  ProfileModel.findById(doc.profile).then(function(profile){
    if(doc.data.identites){
      profile.set('identites', doc.data.identites).save();
    }
  });
});

RequestSchema.methods = {
  saveActionLog(action, user, log, params) {
    return ActionModel.create({
      action: action,
      request: this._id,
      user: user._id,
      date: Date.now(),
      params: params
    }, function(err, action) {
      if (err) log.error(err);

      log.info(action._doc);
    });
  },

  getFullMdph() {
    return Mdph.findOne({zipcode: this.mdph}).exec();
  },

  getDateNaissance() {
    if (this.data && this.data.identites && this.data.identites.beneficiaire && this.data.identites.beneficiaire.dateNaissance) {
      var date = this.data.identites.beneficiaire.dateNaissance;
      return moment(date, moment.ISO_8601);
    }

    return null;
  },

  isAdult() {
    return DateUtils.isAdult(this.getDateNaissance());
  },

  getType() {
    return DateUtils.getType(this.getDateNaissance());
  },

  getCodePostal() {
    if (this.data && this.data.identites && this.data.identites.beneficiaire) {
      return this.data.identites.beneficiaire.code_postal;
    }

    return null;
  },

  getInvalidDocuments() {
    if (!this.documents) {
      return [];
    }

    return _.filter(this.documents, 'isInvalid');
  },

  getInvalidDocumentTypes() {
    return _.reduce(this.getInvalidDocuments(), function(types, currentDocument) {
      if (types.indexOf(currentDocument.type) < 0) {
        types.push(currentDocument.type);
      }

      return types;
    }, []);
  },

  getNonPresentAskedDocumentTypes() {
    if (!this.askedDocumentTypes || this.askedDocumentTypes.length === 0) {
      return [];
    }

    return _.reduce(this.askedDocumentTypes, (types, currentType) => {
      let found = false;

      _.forEach(this.documents, (document) => {
        if (document.type === currentType) {
          found = true;
        }
      });

      if (!found) {
        types.push(currentType);
      }

      return types;
    }, []);
  },

};

export default mongoose.model('Request', RequestSchema);
