'use strict';

angular.module('impactApp')
  .controller('RequestCommentsCtrl', function($scope, toastr, request) {
    $scope.request = request;
    $scope.save = function() {
      request.$update(function() {
        toastr.success('Sauvegarde effectuée', 'Commentaires');
      },

      function() {
        toastr.error('Erreur lors de la sauvegarde', 'Commentaires');
      });
    };
  });
