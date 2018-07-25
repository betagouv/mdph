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
      function capitalize(input) {
        if (!input) {
          return input;
        }

        return input.replace(/\w\S*/g, function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      }

      if (this._id && this.recipient) {
        return capitalize(this.recipient.firstname + ' ' + this.recipient.lastname);
      } else {
        return 'Profil en cours de saisie';
      }
    };

    return Profile;
  });
