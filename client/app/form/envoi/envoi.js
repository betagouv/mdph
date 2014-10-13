'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('form.envoi', {
        url: '/envoi',
        templateUrl: 'app/form/envoi/envoi.html',
        controller: 'EnvoiCtrl'
      }).state('form.envoi.modal', {
        abstract: true,
        onEnter: function($modal, $state, RequestService) {
          $modal.open({
            template: '<div ui-view="modal"></div>',
            backdrop: true,
            windowClass: 'right fade',
            controller: 'ModalLoginCtrl'
          }).result.then(function() {
            RequestService.saveCurrentForm();
          }, function() {
            $state.go('form.envoi');
          });
        }
      });
  });
