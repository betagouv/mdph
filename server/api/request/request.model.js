'use strict';

import mongoose, {Schema} from 'mongoose';
import _ from 'lodash';
import moment from 'moment';
import shortId from 'shortid';
import Mdph from '../mdph/mdph.model';
import ActionModel from './action.model';
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

var RequestSchema = new Schema({
  shortId:        { type: String, unique: true, default: shortId.generate },
  documents:      [DocumentSchema],
  askedDocumentTypes: [String],
  user:           { type: Schema.Types.ObjectId, ref: 'User', required: true },
  profile:        { type: Schema.Types.ObjectId, ref: 'Profile' },
  mdph:           String,

  //TODO Remove
  estRenouvellement: Boolean,
  old_mdph:       String,
  numeroDossier:  String,


  evaluator:      { type: Schema.Types.ObjectId, ref: 'User' },
  secteur:        { type: Schema.Types.ObjectId, ref: 'Secteur' },
  createdAt:      Date,
  submittedAt:    Date,
  updatedAt:      Date,
  status:         { type: String, enum: ['en_cours', 'emise', 'enregistree', 'en_attente_usager', 'archive'], default: 'en_cours' },
  formAnswers:    { type: Schema.Types.Mixed, default: {} }, // Need minimize: false in order to not be deleted http://mongoosejs.com/docs/guide.html#minimize
  prestations:    [{ type: String, lowercase: true }],
  renouvellements:[{ type: String, lowercase: true }],
  certificat:     Schema.Types.Mixed,
  synthese:       Schema.Types.Mixed,
  comments:       { type: String },
  hasFirstExpirationNotification: { type: Boolean, default: false },
  hasLastExpirationNotification: { type: Boolean, default: false }
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

RequestSchema.methods = {
  saveActionLog(action, user, log, params) {
    return ActionModel.create({
      action: action.id,
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
    if (this.formAnswers && this.formAnswers.identites && this.formAnswers.identites.beneficiaire && this.formAnswers.identites.beneficiaire.dateNaissance) {
      var date = this.formAnswers.identites.beneficiaire.dateNaissance;
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
    if (this.formAnswers && this.formAnswers.identites && this.formAnswers.identites.beneficiaire) {
      return this.formAnswers.identites.beneficiaire.code_postal;
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
