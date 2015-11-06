'use strict';

angular.module('impactApp')
  .directive('displayFileList', function() {
    return {
      scope: {
        files: '=',
        request: '=',
        showValidationActions: '=',
        user: '='
      },
      templateUrl: 'components/display-file/display-file-list.html',
      controller: function($scope, $http, $state, DocumentsService) {
        $scope.filesVM = DocumentsService.groupByType($scope.files);
        $scope.documentTypesById = DocumentsService.documentTypesById;

        $scope.showSaveValidation = function() {
          return $scope.request.status === 'emise';
        };

        $scope.save = function() {
          var newStatus = $scope.isValid ? 'complet' : 'incomplet';

          $http.post('/api/requests/' + $scope.request.shortId, {status: newStatus}).then(function() {
            $state.go('dashboard.requests.user', {userId: $scope.user._id, banette: newStatus});
          });
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
