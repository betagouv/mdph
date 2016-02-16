'use strict';

angular.module('impactApp')
  .controller('ModalDocumentsCtrl', function($scope, $modal, documentTypes, request, currentUser) {
    function openModal(isSuccess) {
      $modal.open({
        templateUrl: isSuccess ? 'app/dashboard/workflow/detail/modal-success.html' : 'app/dashboard/workflow/detail/modal-error.html',
        controller: 'ModalSuccessCtrl',
        resolve: {
          request: function() {
            return request;
          },

          documentTypes: function($http) {
            return $http.get('api/documents').then(function(result) {
              return _.filter(result.data, function(documentType) {
                return !documentType.mandatory;
              });
            });
          },

          isSuccess: function() {
            return isSuccess;
          },

          currentUser: function() {
            return currentUser;
          }
        },
        size: 'lg'
      });
    }

    $scope.openSuccessModal = function() {
      return openModal(true);
    };

    $scope.openDangerModal = function() {
      return openModal(false);
    };
  });
