'use strict';

//A lancer avec run.js

import _ from 'lodash';
import Profile from '../server/api/profile/profile.model';
import Demande from '../server/api/request/request.model';
import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var MixedSyntheseSchema = new Schema({
  firstname:      String,
  lastname:       String,
  birthdate:      String,
  mdph:           String,
  geva:           Schema.Types.Mixed,
  createdAt:      Date,
  updatedAt:      Date,
  profile:        { type: Schema.Types.ObjectId, ref: 'Profile' }
});

export default mongoose.model('Synthese', MixedSyntheseSchema);
var Synthese =  mongoose.model('Synthese', MixedSyntheseSchema);

(function() {
  Synthese
    .find()
    .populate('profile')
    .exec(function(err, syntheses) {
      _.forEach(syntheses, function(synthese) {

        if (synthese.profile && synthese.profile.identites && synthese.profile.identites.beneficiaire) {
          console.log('###########################################################################');
          console.log('synthese : ' + JSON.stringify(synthese));

          Demande
            .findOne({profile: synthese.profile, mdph: {$exists: true, $ne: null}})
            .exec(function(err, demande) {
              if(demande && demande.mdph){
                synthese.firstname = synthese.profile.identites.beneficiaire.nom;
                synthese.lastname = synthese.profile.identites.beneficiaire.prenom;
                synthese.birthdate = synthese.profile.identites.beneficiaire.dateNaissance;
                synthese.mdph = demande.mdph;
                synthese.profile = undefined;

                console.log('convertion de la synthese : ' + JSON.stringify(synthese));

                synthese.save();
              }
          });
        }
      });

      console.log('FINISH!');
    });
})();
