'use strict';

angular.module('impactApp')
  .directive('docsForm', function (documents) {
    var documentsById = _.indexBy(documents, 'id');

    return {
      scope: {
        request: '=',
        currentStep: '=',
        onFileSelect: '=',
        file: '='
      },
      templateUrl: 'components/documents/documents.html',
      restrict: 'EA',
      controller: function($scope, $upload, $http) {
        $scope.file.document = documentsById[$scope.file.name];
        $scope.transmitFile = function(file) {
          $http.put('api/requests/' + $scope.request.shortId + '/document', {
            'state': 'delegate',
            'stepName': $scope.currentStep.id,
            'fileName': file.name
          })
          .success(function(state) {
            file.state = state;
          });
        };

          /**
          $scope.upload = $upload.upload({
            url: 'api/requests/' + $scope.request.shortId + '/document',
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
          //.then(success, error, progress);
          // access or attach event listeners to the underlying XMLHttpRequest.
          //.xhr(function(xhr){xhr.upload.addEventListener(...)})
        };
        **/
      }
    };
  });
