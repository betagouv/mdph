'use strict';

angular.module('impactApp')
  .controller('WorkflowDetailCtrl', function($scope, $state, $cookies, $modal, request) {
    $scope.request = request;
    $scope.token = $cookies.get('token');

    $scope.toggleDetail = function() {
      $scope.showDetail = !$scope.showDetail;
    };

    $scope.showRemoveButton = function() {
      $scope.removeButtonShowed = true;
    };

    $scope.openModal = function() {
      let request = $scope.request;
      $modal.open({
        templateUrl: 'app/dashboard/workflow/detail/modal.html',
        controllerAs: 'modalRemove',
        size: 'md',
        controller($modalInstance) {
          this.shortId = request.shortId;
          this.remove = function() {
            //TODO service de suppression des demandes
          };

          this.cancel = function() {
            $modalInstance.dismiss('cancel');
          };
        }
      });
    };
  });
