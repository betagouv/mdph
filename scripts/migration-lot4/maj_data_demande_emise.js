'use strict';

//A lancer avec run.js

import _ from 'lodash';
import Profile from '../../server/api/profile/profile.model';
import Request from '../../server/api/request/request.model';
import mongoose, {Schema} from 'mongoose';

var OldDocumentSchema = new Schema({
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

var OldDataSchema = new Schema({
  identites:                { type: Schema.Types.Mixed },
  vie_quotidienne:          { type: Schema.Types.Mixed },
  vie_scolaire:             { type: Schema.Types.Mixed },
  vie_au_travail:           { type: Schema.Types.Mixed },
  situations_particulieres: { type: Schema.Types.Mixed },
  aidant:                   { type: Schema.Types.Mixed },
  prestations:    [{ code: String, precision: String }],
  documents:      [OldDocumentSchema],
  askedDocumentTypes: [String]
}, { _id: false });

var OldRequestSchema = new Schema({
  shortId:        { type: String, unique: true },
  user:           { type: Schema.Types.ObjectId, ref: 'User', required: true },
  profile:        { type: Schema.Types.ObjectId, ref: 'Profile' },
  mdph:           String,
  evaluators:     [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt:      Date,
  submittedAt:    Date,
  updatedAt:      Date,
  deletedAt:      Date,
  status:         { type: String, enum: ['en_cours', 'emise', 'validee', 'en_attente_usager', 'irrecevable'], default: 'en_cours' },
  data:           { type: OldDataSchema, default: {} },
  comments:       { type: String },
  hasFirstExpirationNotification: { type: Boolean, default: false },
  hasLastExpirationNotification: { type: Boolean, default: false },
  isDownloaded: { type: Boolean, default: false },
  formAnswers:    { type: Schema.Types.Mixed, default: {} },
  prestations:    [{ code: String, precision: String }],
  documents:      [OldDocumentSchema],
  askedDocumentTypes: [String]
}, { minimize: false, collection: 'requests' });

var OldRequest = mongoose.model('OldRequest', OldRequestSchema);

(function() {
  console.log('MISE A JOUR DES DONNEES DES DEMANDES EMISE');
  var countDemande = 0;
  var countProfile = 0;

  OldRequest
    .find()
    .populate('profile')
    .exec(function(err, requests) {

      if (err) {
        console.log(err);
        return;
      }

      _.forEach(requests, function(request) {

        if(request.status === 'emise' || request.status === 'en_attente_usager'){

          if(request.data){
            request.data = {};

            if(request.formAnswers){
              request.data = request.formAnswers;
              request.formAnswers = null;
            }

            if(request.prestations){
              request.data.prestations = request.prestations;
              request.prestations = null;

            }

            if(request.documents){
              request.data.documents = request.documents;
              request.documents = null;
            }

            if(request.askedDocumentTypes){
              request.data.askedDocumentTypes =request.askedDocumentTypes;
              request.askedDocumentTypes = null;
            }

            if(request.profile){

              request.data.vie_quotidienne = request.profile.vie_quotidienne;
              request.data.vie_scolaire = request.profile.vie_scolaire;
              request.data.situations_particulieres =request.profile.situations_particulieres;
              request.data.aidant =request.profile.aidant;
              request.data.vie_au_travail =request.profile.vie_au_travail;

              request.profile.vie_quotidienne = null;
              request.profile.vie_scolaire = null;
              request.profile.situations_particulieres = null;
              request.profile.aidant = null;
              request.profile.vie_au_travail = null;

              request.profile.save();
              countProfile++;

            }

            request.save();
            countDemande++;

          }
        }

      });

      console.log(countDemande + ' demandes mises à jour');
      console.log(countProfile + ' profils mis à jour');
      console.log('FINISH!');
    });
})();
