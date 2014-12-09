'use strict';

angular.module('impactApp')
  .controller('PartenairesCtrl', function ($scope, Partenaire) {
    $scope.partenaires = Partenaire.query();

    $scope.certifier = function(partenaire) {
      partenaire.certified = 'Certifié';
      Partenaire.$update({id: partenaire._id}, partenaire);
    };

    $scope.refuser = function(partenaire) {
      partenaire.certified = 'Refusé';
      Partenaire.$update({id: partenaire._id}, partenaire);
    };
  });
