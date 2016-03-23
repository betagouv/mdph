'use strict';

var _ = require('lodash');
var moment = require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var shortId = require('shortid');
var ActionModel = require('./action.model');
var DateUtils = require('../../components/dateUtils');

var DocumentSchema = new Schema({
  partenaire:     { type: Schema.Types.ObjectId, ref: 'Partenaire' },
  type:           String,
  isInvalid:      Boolean,
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
  estRenouvellement: Boolean,
  old_mdph:       String,
  numeroDossier:  String,
  evaluator:      { type: Schema.Types.ObjectId, ref: 'User' },
  secteur:        { type: Schema.Types.ObjectId, ref: 'Secteur' },
  createdAt:      Date,
  submittedAt:    Date,
  updatedAt:      Date,
  status:         { type: String, enum: ['en_cours', 'emise', 'enregistree', 'en_attente_usager', 'archive'], default: 'en_cours' },
  formAnswers:    Schema.Types.Mixed,
  prestations:    [{ type: String, lowercase: true }],
  renouvellements:[{ type: String, lowercase: true }],
  certificat:     Schema.Types.Mixed,
  synthese:       Schema.Types.Mixed,
  comments:       { type: String }
});

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
  saveActionLog(action, user, log, params, done) {
    ActionModel.create({
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
  }
};

try {
  mongoose.model('Request', RequestSchema);
} catch (_) {
  // Used only for mocha in watch mode
}

export default mongoose.model('Request');
