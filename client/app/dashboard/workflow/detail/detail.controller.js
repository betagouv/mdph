'use strict';

angular.module('impactApp')
  .controller('WorkflowDetailCtrl', function($scope, $state, $cookies, $modal, request, currentUser) {
    $scope.request = request;
    $scope.token = $cookies.get('token');
    $scope.pdfName = (request.formAnswers.identites.beneficiaire.nom).toLowerCase() +
                    '_' + (request.formAnswers.identites.beneficiaire.prenom).toLowerCase() +
                    '_' + request.shortId + '.pdf';

    $scope.toggleDetail = function() {
      $scope.showDetail = !$scope.showDetail;
    };

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
