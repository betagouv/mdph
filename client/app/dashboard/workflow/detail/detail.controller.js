'use strict';

angular.module('impactApp')
  .controller('WorkflowDetailCtrl', function($scope, $state, RequestResource, $cookies, $modal, $window, request) {
    $scope.request = request;
    $scope.token = $cookies.get('token');

    this.toggleDetail = function() {
      $scope.showDetail = !$scope.showDetail;
    };

    this.download  = () => {
      $scope.request.isDownloaded = 'true';
      RequestResource.update($scope.request).$promise.then(result => {
        $window.open('api/requests/' + result.shortId + '/pdf/agent?access_token=' + $scope.token, '_self');
      });
    };

    this.openModal = function() {
      let request = $scope.request;
      $modal.open({
        templateUrl: 'app/dashboard/workflow/detail/modalRemove.html',
        controllerAs: 'modalRemove',
        size: 'md',
        controller($modalRemoveInstance) {
          this.shortId = request.shortId;
          this.remove = function() {
            //TODO service de suppression des demandes
          };

          this.cancel = function() {
            $modalRemoveInstance.dismiss('cancel');
          };
        }
      });
    };
  });
