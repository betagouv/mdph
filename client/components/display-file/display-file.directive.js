'use strict';

angular.module('impactApp')
  .directive('displayFile', function($state) {
    return {
      scope: {
        file: '=',
        request: '=',
        showValidationActions: '=',
        onChange: '='
      },
      templateUrl: 'components/display-file/display-file.html',
      controller: function($scope, $http, $cookies) {
        $scope.token = $cookies.get('token');

        if ($scope.file.partenaire) {
          $http.get('/api/partenaires/' + $scope.file.partenaire).then(function(result) {
            $scope.partenaireObj = result.data;
          });
        }

        if (typeof $scope.file.validation !== 'undefined') {
          $scope.showValidationStatus = true;
        }

        $scope.setValid = function(status) {
          $scope.file.validation = status;
          $scope.showValidationActions = false;
          $scope.showValidationStatus = true;
          $scope.onChange();
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
