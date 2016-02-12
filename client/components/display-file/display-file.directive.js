'use strict';

angular.module('impactApp')
  .directive('displayFile', function($state) {
    return {
      scope: {
        file: '=',
        request: '=',
        hideActions: '='
      },
      templateUrl: 'components/display-file/display-file.html',
      controller: function($scope, $http, $cookies) {
        $scope.token = $cookies.get('token');

        if ($scope.file.partenaire) {
          // TODO do this server-side
          $http.get('/api/partenaires/' + $scope.file.partenaire).then(function(result) {
            $scope.partenaireObj = result.data;
          });
        }

        if (typeof $scope.file.isInvalid !== 'undefined') {
          $scope.showValidationStatus = true;
        }

        $scope.setInvalid = function(isInvalid) {
          if ($scope.file.isInvalid === isInvalid) {
            return;
          }

          $http.post('/api/requests/' + $scope.request.shortId + '/document/' + $scope.file._id, {isInvalid: isInvalid}).then(function(result) {
            $scope.showValidationStatus = true;
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
          $http.delete('/api/requests/' + $scope.request.shortId + '/document/' + $scope.file._id).success(function() {
            $state.go($state.current, {}, {reload: true});
          });
        };
      }
    };
  });
