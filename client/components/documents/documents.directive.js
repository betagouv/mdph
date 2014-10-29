'use strict';

angular.module('impactApp')
  .directive('docsForm', function ($modal, documents) {
    var documentsById = _.indexBy(documents, 'id');

    return {
      scope: {
        request: '=',
        currentStep: '='
      },
      templateUrl: 'components/documents/documents.html',
      restrict: 'EA',
      controller: function($scope, $upload, $http) {
        $scope.transmitFile = function(file) {
          $http.put('api/requests/' + $scope.request._id + '/document', {
            'state': 'delegate',
            'stepName': $scope.currentStep.id,
            'fileName': file.name
          })
          .success(function(state) {
            file.state = state;
          });
        };

        $scope.onFileSelect = function($files, currentFile) {
          //$files: an array of files selected, each file has name, size, and type.
          var file = $files[0];
          $scope.upload = $upload.upload({
            url: 'api/requests/' + $scope.request._id + '/document',
            withCredentials: true,
            data: {
              'stepName': $scope.currentStep.id,
              'documentName': currentFile.name
            },
            file: file, // or list of files ($files) for html5 only
            //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
            // customize file formData name ('Content-Disposition'), server side file variable name.
            //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file'
            // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
            //formDataAppender: function(formData, key, val){}
          }).success(function(data) {
            // file is uploaded successfully
            currentFile.path = data;
            broadcastIfComplete();
          });
          //.error(...)
          //.then(success, error, progress);
          // access or attach event listeners to the underlying XMLHttpRequest.
          //.xhr(function(xhr){xhr.upload.addEventListener(...)})
        };

        $scope.files = _.find($scope.request.steps, { name: $scope.currentStep.id }).files;
        angular.forEach($scope.files, function(file) {
          file.document = documentsById[file.name];
        });

        var broadcastIfComplete = function() {
          if (_.every($scope.files, 'path')) {
            $scope.$parent.$broadcast('documentStepComplete');
          }
        };

        broadcastIfComplete();
      }
    };
  });
