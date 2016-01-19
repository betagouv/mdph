'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var shortId = require('shortid');
var ActionModel = require('./action.model');

var DocumentSchema = new Schema({
  partenaire:     { type: Schema.Types.ObjectId, ref: 'Partenaire' },
  type:           { type: String },
  validation:     { type: Boolean },
  originalname:   { type: String },
  filename:       { type: String },
  encoding:       { type: String },
  mimetype:       { type: String },
  path:           { type: String },
  extension:      { type: String },
  size:           { type: Number }
});

var RequestSchema = new Schema({
  shortId:        { type: String, unique: true, default: shortId.generate },
  documents:      [DocumentSchema],
  user:           { type: Schema.Types.ObjectId, ref: 'User' },
  profile:        { type: Schema.Types.ObjectId, ref: 'Profile' },
  mdph:           { type: String },
  evaluator:      { type: Schema.Types.ObjectId, ref: 'User' },
  secteur:        { type: Schema.Types.ObjectId, ref: 'Secteur' },
  createdAt:      { type: Date },
  submittedAt:    { type: Date },
  updatedAt:      { type: Date },
  status:         { type: String, enum: ['en_cours', 'emise', 'complet', 'incomplet', 'archive'], default: 'en_cours' },
  formAnswers:    Schema.Types.Mixed,
  prestations:    [{ type: String }],
  certificat:     Schema.Types.Mixed,
  synthese:       Schema.Types.Mixed
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
