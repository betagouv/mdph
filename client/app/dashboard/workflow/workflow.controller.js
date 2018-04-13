'use strict';

angular.module('impactApp')
  .controller('WorkflowCtrl', function($scope, $modal, $window, $cookies, RequestResource) {
    this.token = $cookies.get('token');

    this.openDeleteModal = function(request) {
      const modalDeleteInstance = $modal.open({
        templateUrl: 'app/dashboard/workflow/detail/modalDelete.html',
        controllerAs: 'modalDeleteCtrl',
        size: 'md',
        controller($modalInstance) {
          this.shortId = request.shortId;

          this.delete = function() {
            //TODO service de suppression des demandes
          };

          this.cancel = function() {
            $modalInstance.dismiss('cancel');
          };
        }
      });
    };

    this.download  = function(request) {
      request.isDownloaded = 'true';
      RequestResource.update(request).$promise.then(result => {
        $window.open('api/requests/' + result.shortId + '/pdf/agent?access_token=' + this.token, '_self');
      });
    };

  });

