'use strict';

angular.module('impactApp')
  .controller('WorkflowCtrl', function($scope, $modal, $window, $cookies, $state, $http, RequestResource) {
    this.token = $cookies.get('token');
    this.openDeleteModal = function(request) {
      $modal.open({
        templateUrl: 'app/dashboard/workflow/detail/modalDelete.html',
        controllerAs: 'modalDeleteCtrl',
        size: 'md',
        controller(navUserId, navStatus, $modalInstance, RequestResource) {
          this.requests = [];
          this.shortId = request.shortId;
          this.navUserId = navUserId;
          this.navStatus = navStatus;
          this.requests.push(request);
          this.delete = function() {
              RequestResource.remove({shortId: this.shortId}).$promise.then(() => {
                $modalInstance.close();
                if ($state.includes('dashboard.workflow.detail')) {
                  $state.go('dashboard.workflow.list', {userId:navUserId, status:navStatus}, {reload: true});
                } else {
                  $state.go('.', {}, {reload: true});
                }
              });
            };

          this.cancel = function() {
            $modalInstance.dismiss('cancel');
          };
        },

        resolve: {
          navUserId: function() {
            return $scope.navUserId;
          },

          navStatus: function() {
            return $scope.navStatus;
          }
        },
      });
    };

    this.download  = function(request) {
      request.isDownloaded = 'true';
      RequestResource.update(request).$promise.then(result => {
        $window.open('api/requests/' + result.shortId + '/pdf/agent?access_token=' + this.token, '_self');
      });
    };

  });

