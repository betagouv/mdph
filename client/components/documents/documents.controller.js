'use strict';

angular.module('impactApp')
  .directive('docsForm', function ($modal, getDocuments) {
    return {
      scope: {
        form: '=',
        small: '='
      },
      templateUrl: 'components/documents/documents.html',
      restrict: 'EA',
      controller: function($scope) {
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

        $scope.documents = computeDocuments();
      }
    };
  });
