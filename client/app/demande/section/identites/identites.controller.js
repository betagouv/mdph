'use strict';

angular.module('impactApp')
  .controller('IdentitesCtrl', function($scope, request, section, sectionModel, estMineur) {
    $scope.request = request;
    $scope.section = section;

    $scope.estMineur = estMineur;
    $scope.sectionModel = sectionModel;

    /*
    $scope.beneficiaire = sectionModel.beneficiaire;
    $scope.aidantDemarche = sectionModel.aidantDemarche;
    $scope.autorite = sectionModel.autorite;*/
  });
