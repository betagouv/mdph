'use strict';

angular.module('impactApp')
  .controller('AdminMdphCtrl', function($scope, $state, $location, $anchorScroll, Upload, mdphs, MdphResource) {
    this.mdphs = mdphs;
    this.totalItems = this.mdphs.length;
    this.itemsPerPage = 10;
    this.currentPage = 1;
    $scope.logoChanged = false;
    $scope.photoChanged = false;

    this.setPage = function(pageNo) {
      this.currentPage = pageNo;
    };

    this.setItemsPerPage = function(num) {
      this.itemsPerPage = num;
      this.currentPage = 1;
    };

    this.selectItem = function(item) {
      $scope.logoChanged = false;
      $scope.photoChanged = false;
      $scope.mdphDetail = item;
      $location.hash('detail-mdph');
      $anchorScroll();
    };

    this.setLogoChanged = function() {
      $scope.logoChanged = true;
    };

    this.setPhotoChanged = function() {
      $scope.photoChanged = true;
    };

    this.removeLocation = function(index){
      $scope.mdphDetail.locations.splice(index, 1);
    };

    this.addLocation = function(){
      $scope.mdphDetail.locations.push({});
    };

    this.submit = function(form) {
      if (form.$invalid) {
        form.showError = true;
      } else {

        console.log('mdphDetail :', JSON.stringify($scope.mdphDetail));

        MdphResource.get({zipcode: $scope.mdphDetail.zipcode}).$promise.then(function(mdph) {

            mdph.name = $scope.mdphDetail.name;
            mdph.enabled = $scope.mdphDetail.enabled;
            mdph.opened = $scope.mdphDetail.opened;
            mdph.evaluate = $scope.mdphDetail.evaluate;
            mdph.locations=[];
            angular.forEach($scope.mdphDetail.locations, function(value) {

              console.log('location  :', JSON.stringify(value));

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

            console.log('update mdph  :', JSON.stringify(mdph));

            MdphResource.update(mdph);

          }, function() {

            var mdph = {};
            mdph.zipcode = $scope.mdphDetail.zipcode;
            mdph.name = $scope.mdphDetail.name;
            mdph.enabled = $scope.mdphDetail.enabled;
            mdph.opened = $scope.mdphDetail.opened;
            mdph.evaluate = $scope.mdphDetail.evaluate;
            mdph.locations=[];
            angular.forEach($scope.mdphDetail.locations, function(value) {

              console.log('location  :', JSON.stringify(value));

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

            console.log('save mdph  :', JSON.stringify(mdph));

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

  });
