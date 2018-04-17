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
      if (this._id && this.recipient) {
        return this.recipient.firstname + ' ' + this.recipient.lastname;
      } else {
        return 'Profil en cours de saisie';
      }
    };

    return Profile;
  });
