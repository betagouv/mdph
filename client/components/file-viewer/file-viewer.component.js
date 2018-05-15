'use strict';

angular.module('impactApp').component('fileViewer', {
  templateUrl: 'components/file-viewer/file-viewer.html',

  bindings: {
    demande: '=',
    file: '='
  },
  controller: function($scope, $modal) {

    $scope.file = this.file;
    $scope.demande = this.demande;

    this.openViewer = () => {

      $modal.open({
        templateUrl: 'components/file-viewer/file-viewer-modal.html',
        size: 'lg',
        controller($modalInstance, $cookies) {
          this.name = $scope.file.filename ? $scope.file.filename : $scope.file.name;
          this.token = $cookies.get('token');
          this.fileUrl = `api/requests/${$scope.demande.shortId}/document/${this.name}?access_token=${this.token}`;

          this.cancel = function() {
            $modalInstance.dismiss();
          };
        },

        controllerAs: 'fileViewerModalCtrl',
      });
    };
  },

  controllerAs: 'fileViewerCtrl'
});
