'use strict';

angular.module('impactApp')
  .controller('AdminMdphDetailCtrl', function($scope, $state, mdph, Upload, MdphResource) {
    $scope.mdphDetail = mdph;
    $scope.logoChanged = false;
    $scope.photoChanged = false;

    this.setLogoChanged = function() {
      $scope.logoChanged = true;
    };

    this.setPhotoChanged = function() {
      $scope.photoChanged = true;
    };

    this.removeLocation = function(index) {
      $scope.mdphDetail.locations.splice(index, 1);
    };

    this.addLocation = function() {
      if ($scope.mdphDetail.locations === undefined) {
        $scope.mdphDetail.locations = [];
      }

      $scope.mdphDetail.locations.push({});
    };

    this.submit = function(form) {
      if (form.$invalid) {
        form.showError = true;
      } else {

        MdphResource.get({zipcode: $scope.mdphDetail.zipcode}).$promise.then(function(mdph) {

            mdph.name = $scope.mdphDetail.name;
            mdph.enabled = $scope.mdphDetail.enabled;
            mdph.opened = $scope.mdphDetail.opened;
            mdph.evaluate = $scope.mdphDetail.evaluate;
            mdph.locations = [];
            angular.forEach($scope.mdphDetail.locations, function(value) {

              var location = {};
              location.name = value.name;
              location.address = value.address;
              location.coordinates = {};
              location.coordinates.coordx = value.coordinates.coordx;
              location.coordinates.coordy = value.coordinates.coordy;
              location.phone = value.phone;
              location.email = value.email;
              location.schedule = value.schedule;
              location.headquarters = value.headquarters;

              mdph.locations.push(location);

            });

            MdphResource.update(mdph);

          }, function() {

            var mdph = {};
            mdph.zipcode = $scope.mdphDetail.zipcode;
            mdph.name = $scope.mdphDetail.name;
            mdph.enabled = $scope.mdphDetail.enabled;
            mdph.opened = $scope.mdphDetail.opened;
            mdph.evaluate = $scope.mdphDetail.evaluate;
            mdph.locations = [];
            angular.forEach($scope.mdphDetail.locations, function(value) {

              var location = {};
              location.name = value.name;
              location.address = value.address;
              location.coordinates = {};
              location.coordinates.coordx = value.coordinates.coordx;
              location.coordinates.coordy = value.coordinates.coordy;
              location.phone = value.phone;
              location.email = value.email;
              location.schedule = value.schedule;
              location.headquarters = value.headquarters;

              mdph.locations.push(location);

            });

            MdphResource.save(mdph);

          }).then(function() {

            if ($scope.logoChanged) {

              Upload.upload({
                  url: '/api/mdphs/' + $scope.mdphDetail.zipcode + '/logo',
                  data: {file: $scope.mdphDetail.logo}
                });
            }

            if ($scope.photoChanged) {

              Upload.upload({
                  url: '/api/mdphs/' + $scope.mdphDetail.zipcode + '/photo',
                  data: {file: $scope.mdphDetail.photo}
                });
            }

            return $state.go('admin.mdph', {}, {reload: true});
          });
      }
    };

    this.cancel = function() {
      return $state.go('admin.mdph', {}, {reload: true});
    };

  });
