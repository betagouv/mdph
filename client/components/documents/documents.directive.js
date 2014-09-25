'use strict';

angular.module('impactApp')
  .directive('docsForm', function ($modal, DocumentService) {
    return {
      scope: {
        form: '=',
        small: '=',
        type: '=',
        complete: '='
      },
      templateUrl: 'components/documents/documents.html',
      restrict: 'EA',
      controller: function($scope, $upload) {
        $scope.onFileSelect = function($files, document) {
          //$files: an array of files selected, each file has name, size, and type.
          var file = $files[0];
          $scope.upload = $upload.upload({
            url: 'api/forms/' + $scope.form._id + '/document', //upload.php script, node.js route, or servlet url
            //method: 'POST' or 'PUT',
            //headers: {'header-key': 'header-value'},
            withCredentials: true,
            data: {'documentType': document.id},
            file: file, // or list of files ($files) for html5 only
            //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
            // customize file formData name ('Content-Disposition'), server side file variable name.
            //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file'
            // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
            //formDataAppender: function(formData, key, val){}
          }).success(function(data) {
            // file is uploaded successfully
            $scope.form.files.push(data);
            $scope.refresh(true);
          });
          //.error(...)
          //.then(success, error, progress);
          // access or attach event listeners to the underlying XMLHttpRequest.
          //.xhr(function(xhr){xhr.upload.addEventListener(...)})
        };

        $scope.refresh = function(broadcast) {
          DocumentService.getDocumentTypeForForm($scope.form, $scope.type, function(documents, complete) {
            $scope.documents = documents;
            if (complete && broadcast) {
              $scope.$parent.$broadcast('documentStepComplete');
            }
          });
        };

        $scope.refresh(false);
      }
    };
  });
