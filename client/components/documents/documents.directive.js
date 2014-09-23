'use strict';

angular.module('impactApp')
  .directive('docsForm', function ($modal, getDocuments, documents) {
    return {
      scope: {
        form: '=',
        small: '=',
        type: '='
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
            data: {'document': document},
            file: file, // or list of files ($files) for html5 only
            //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
            // customize file formData name ('Content-Disposition'), server side file variable name.
            //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file'
            // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
            //formDataAppender: function(formData, key, val){}
          }).progress(function(evt) {
            console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
          }).success(function(data, status, headers, config) {
            // file is uploaded successfully
            console.log(data);
          });
          //.error(...)
          //.then(success, error, progress);
          // access or attach event listeners to the underlying XMLHttpRequest.
          //.xhr(function(xhr){xhr.upload.addEventListener(...)})
        };

        var computeDocumentsForAnswers = function(answers, categories) {
          angular.forEach(answers, function(answer) {
            if (answer.answers) { // C'est une sous-section
              computeDocumentsForAnswers(answer.answers, categories);
            }
            if (answer.documents) {
              angular.forEach(answer.documents, function(document) {
                categories[document.category].show = true;
                categories[document.category].documents[document.id].show = true;
              });
            }
          });
        };

        var computeDocuments = function() {
          var categories = getDocuments('TODO_RETRIEVE_USER_NAME'); // TODO
          angular.forEach($scope.form.formAnswers, function(section) {
            computeDocumentsForAnswers(section.answers, categories);
          });
          return categories;
        };

        if (angular.isDefined($scope.type)) {
          var documentsByType = _.groupBy(documents, 'type');
          $scope.documents = documentsByType.obligatoire;
        } else {
          $scope.documents = computeDocuments();
        }
      }
    };
  });
