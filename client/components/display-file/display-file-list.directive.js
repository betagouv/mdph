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
      controller: function($scope, DocumentsService) {
        $scope.filesVM = DocumentsService.groupByType($scope.files);
        $scope.documentTypesById = DocumentsService.documentTypesById;

        $scope.showSaveValidation = function() {
          return $scope.request.status === 'emise';
        };

        $scope.computeStatus = function() {
          $scope.isSaveValidationDisabled = $scope.files.some(function(current) {
            return _.isUndefined(current.validationTemp);
          });

          $scope.canSave = _.every($scope.files, {validationTemp: true});
        };

        $scope.computeStatus();
      }
    };
  });
