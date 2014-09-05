'use strict';

angular.module('impactApp')
  .controller('DemandeCtrl', function ($scope, currentForm, getDocuments) {
    if (angular.isDefined(currentForm)) {
      $scope.formAnswers = currentForm.data.formAnswers;

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
        var categories = getDocuments('TEST'); // TODO
        angular.forEach($scope.formAnswers, function(section) {
          computeDocumentsForAnswers(section.answers, categories);
        });
        return categories;
      };

      $scope.updatedAt = moment(currentForm.updatedAt).fromNow();
      $scope.documents = computeDocuments();
    }
  });
