'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var shortId = require('shortid');
var ActionModel = require('./action.model');

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
  user:           { type: Schema.Types.ObjectId, ref: 'User' },
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
  prestations:    [String],
  certificat:     Schema.Types.Mixed,
  synthese:       Schema.Types.Mixed,
  comments:       { type: String }
});

RequestSchema.pre('save', function(next) {
  var now = Date.now();

  if (this.isNew) {
    this.createdAt = now;
  }

  this.updatedAt = now;

  next();
});

RequestSchema.methods = {
  saveActionLog: function(action, user, log, params, done) {
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
  }
};

module.exports = mongoose.model('Request', RequestSchema);
