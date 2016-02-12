'use strict';

angular.module('impactApp')
  .controller('WorkflowDetailCtrl', function($scope, $state, $cookies, $modal, request) {
    $scope.request = request;
    $scope.token = $cookies.get('token');
    $scope.pdfName = (request.formAnswers.identites.beneficiaire.nom).toLowerCase() +
                    '_' + (request.formAnswers.identites.beneficiaire.prenom).toLowerCase() +
                    '_' + request.shortId + '.pdf';

    $scope.toggleDetail = function() {
      $scope.showDetail = !$scope.showDetail;
    };

    function openModal(templateUrl, controllerId) {
      $modal.open({
        templateUrl: templateUrl,
        controller: controllerId,
        resolve: {
          request: function() {
            return request;
          }
        }
      });
    }

    $scope.openSuccessModal = function() {
      return openModal('app/dashboard/workflow/detail/modal-success.html', 'ModalSuccessCtrl');
    };

    $scope.openDangerModal = function() {
      return openModal('app/dashboard/workflow/detail/modal-error.html', 'ModalSuccessCtrl');
    };
  });
