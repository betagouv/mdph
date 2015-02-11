'use strict';

angular.module('impactApp')
  .controller('PartenairesListCtrl', function ($scope, partenaires, title) {
    $scope.partenaires = partenaires;
    $scope.title = title;
  });
