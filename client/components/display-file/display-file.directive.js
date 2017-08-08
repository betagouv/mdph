'use strict';

angular.module('impactApp')
  .directive('displayFile', function() {
    return {
      scope: {
        file: '=',
        request: '=',
        hideActions: '=',
        user: '='
      },
      templateUrl: 'components/display-file/display-file.html',
      controller: function($scope, $http, $cookies, $modal) {
        $scope.token = $cookies.get('token');

        if ($scope.file.partenaire) {
          // TODO do this server-side
          $http.get('/api/partenaires/' + $scope.file.partenaire).then(function(result) {
            $scope.partenaireObj = result.data;
          });
        }

        $scope.canValidateFile = $scope.user.role !== 'user' && $scope.request.status === 'emise';
        $scope.canDelete = ($scope.request.status === 'en_cours' || $scope.request.status === 'en_attente_usager') && $scope.user.role === 'user';

        $scope.setInvalid = function(isInvalid) {
          if ($scope.file.isInvalid === isInvalid) {
            return;
          }

          $http.put('/api/requests/' + $scope.request.shortId + '/document/' + $scope.file._id, {isInvalid: isInvalid}).then(function(result) {
            $scope.file = result.data;
          });
        };

        $scope.setInvalidReason = function() {
          if ($scope.file.invalidReason.length === 0) {
            return;
          }

          $http.put('/api/requests/' + $scope.request.shortId + '/document/' + $scope.file._id, {isInvalid: true, invalidReason: $scope.file.invalidReason}).then(function(result) {
            $scope.file = result.data;
          });
        };

        $scope.openPreview = function(file) {
          $modal.open({
            templateUrl: 'components/display-file/display-file-modal.html',
            controllerAs: 'modalFileCtrl',
            size: 'lg',
            controller($modalInstance) {
              this.name = $scope.getFilename(file);
              this.fileUrl = `api/requests/${$scope.request.shortId}/document/${this.name}?access_token=${$scope.token}`;

              this.cancel = function() {
                $modalInstance.dismiss();
              };
            }
          });
        };

        // Retro-compat
        $scope.getFilename = function(file) {
          if (file.filename) {
            return file.filename;
          } else {
            return file.name;
          }
        };

        $scope.delete = function() {
          $modal.open({
            templateUrl: 'components/display-file/modal.html',
            controllerAs: 'mdf',
            size: 'md',
            controller($modalInstance, $state) {
              this.file = $scope.file;

              this.ok = function() {
                $http
                  .delete('/api/requests/' + $scope.request.shortId + '/document/' + $scope.file._id)
                  .success(function() {
                    $modalInstance.close();
                    $state.go($state.current, {}, {reload: true});
                  });
              };

              this.cancel = function() {
                $modalInstance.dismiss('cancel');
              };
            }
          });
        };
      }
    };
  });
