'use strict';

angular.module('impactApp')
  .factory('ProfileResource', function($resource) {
    var Profile = $resource('/api/users/:userId/profiles/:id', {
      id: '@_id'
    });

    Profile.prototype.getTitle = function() {
      if (this.identites && this.identites.beneficiaire) {
        return 'Profil de ' + this.identites.beneficiaire.prenom + ' ' + this.identites.beneficiaire.nom;
      } else {
        return 'Nouveau profil';
      }
    };

    return Profile;
  });
