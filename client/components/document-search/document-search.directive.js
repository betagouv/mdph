'use strict';

angular.module('impactApp')
  .directive('documentSearch', function ($modal, documents) {
    return {
      scope: {
        form: '=',
        callback: '='
      },
      templateUrl: 'components/document-search/document-search.html',
      restrict: 'EA',
      controller: function($scope) {
        $scope.documents = _.where(documents, function(doc) {
          return doc.type !== 'obligatoire';
        });
      }
    };
  });
