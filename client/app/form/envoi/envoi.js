'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('form.envoi', {
        url: '/envoi',
        templateUrl: 'app/form/envoi/envoi.html',
        controller: 'EnvoiCtrl',
        resolve: {
          prestations: function($http) {
            return $http.get('/api/prestations').then(function(prestations) {
              return prestations.data;
            });
          }
        }
      }).state('form.envoi.modal', {
        abstract: true,
        onEnter: function($modal, $state, $window, RequestService) {
          $modal.open({
            template: '<div ui-view="modal"></div>',
            backdrop: true,
            windowClass: 'right fade',
            controller: 'ModalLoginCtrl'
          }).result.then(function() {
            RequestService.createRequest(function(err, request) {
              if (err) {
                $window.alert(err);
              }
              RequestService.saveCurrentForm(request);
            });
          }, function() {
            $state.go('form.envoi');
          });
        }
      });
  });
