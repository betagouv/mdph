'use strict';

angular.module('impactApp')
  .directive('displayFileList', function() {
    return {
      scope: {
        files: '=',
        request: '=',
        showValidationActions: '='
      },
      templateUrl: 'components/display-file/display-file-list.html',
      controller: function($scope, $http, DocumentsService) {
        $scope.filesVM = DocumentsService.groupByType($scope.files);
        $scope.documentTypesById = DocumentsService.documentTypesById;

        $scope.showSaveValidation = function() {
          return $scope.request.status === 'emise';
        };

        $scope.save = function(isValid) {
          if (isValid) {
            $http.post('/api/requests/' + $scope.request.shortId, {status: 'complet'}).then(function(data) {
              debugger;
            });
          } else {
            $http.post('/api/requests/' + $scope.request.shortId, {status: 'incomplet'}).then(function(data) {
              debugger;
            });
          }
        };

        $scope.computeStatus = function() {
          $scope.isSaveValidationDisabled = $scope.files.some(function(current) {
            return _.isUndefined(current.validation);
          });

          $scope.isValid = _.every($scope.files, {validation: true});
        };

        $scope.computeStatus();
      }
    };
  });
