'use strict';

angular.module('impactApp').config(function($stateProvider) {
  $stateProvider.state('demande', {
    url: '/demande/:shortId',
    parent: 'layout',
    templateUrl: 'app/demande/demande.html',
    controller: 'DemandeCtrl',
    controllerAs: 'demandeCtrl',
    authenticate: true,
    authorized: ['user'],
    data: {
      title: 'Détail de la demande'
    },
    resolve: {

      sections: function($http) {
        return $http.get('/api/sections').then(function(result) {
          return result.data;
        });
      },

      demande: function($stateParams, RequestResource) {
        return RequestResource.get({shortId: $stateParams.shortId}).$promise;
      },

      profile: function(ProfileResource, currentUser, demande) {
        return ProfileResource.get({userId: currentUser._id, id: demande.profile}).$promise;
      },

      saveCurrentState: function($state) {
        return function() {
          $state.current.data.history.push($state.current.name);
        };
      },

      prevStep: function($state) {
        return function() {
          if ($state.current.data.history.length) {
            const toState = $state.current.data.history.pop();
            $state.go(toState);
          }
        };
      }
    }
  });
});
