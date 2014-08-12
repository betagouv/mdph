
'use strict';

/**
 * @ngdoc service
 * @name impactApp.openModal
 * @description
 * # openModal
 * Service in the impactApp.
 */
angular.module('impactApp')
  .factory('openModal', function($modal) {
    return function(items) {
      $modal.open({
        templateUrl: 'views/partials/modal.html',
        controller: function($scope, $modalInstance, items) {
          $scope.items = items;
          $scope.ok = function() {
            $modalInstance.close();
          };
        },
        resolve: {
          items: function () {
            return items;
          }
        }
      });
    };
});
