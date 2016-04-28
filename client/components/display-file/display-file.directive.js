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

        $scope.setInvalid = function(isInvalid) {
          if ($scope.file.isInvalid === isInvalid) {
            return;
          }

          $http.put('/api/requests/' + $scope.request.shortId + '/document/' + $scope.file._id, {isInvalid: isInvalid}).then(function(result) {
            $scope.file = result.data;
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
