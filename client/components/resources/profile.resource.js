'use strict';

angular.module('impactApp')
  .factory('ProfileResource', function($resource) {
    var Profile = $resource('/api/users/:userId/profiles/:id', {
      id: '@_id'
    },
    {
      count: {
        method: 'GET',
        params: {
          id: 'count'
        }
      }
    });

    Profile.prototype.getTitle = function() {
      if (this._id && this.identites && this.identites.beneficiaire && this.identites.beneficiaire.prenom && this.identites.beneficiaire.nom) {
        return this.identites.beneficiaire.prenom + ' ' + this.identites.beneficiaire.nom;
      } else {
        return 'Profil en cours de saisie';
      }
    };

    Profile.prototype.saveSection = function(sectionId, sectionModel, user, onSuccess) {
      sectionModel.__completion = true;
      sectionModel.updatedAt = Date.now();

      this[sectionId] = sectionModel;
      this.$save({userId: user._id}, onSuccess);
    };

    return Profile;
  });
