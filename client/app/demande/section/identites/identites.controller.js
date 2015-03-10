'use strict';

angular.module('impactApp')
  .controller('IdentitesCtrl', function($scope, request, section, sectionModel, estMineur, saveSection) {
    $scope.request = request;
    $scope.section = section;
    $scope.estMineur = estMineur;
    $scope.sectionModel = sectionModel;
    $scope.saveSection = saveSection;
  });
