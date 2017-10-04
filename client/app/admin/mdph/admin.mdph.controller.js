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

    this.submit = function(form) {
      if (form.$invalid) {
        form.showError = true;
      } else {

        MdphResource.get({zipcode: $scope.mdphDetail.zipcode}).$promise.then(function(mdph) {

            mdph.name = $scope.mdphDetail.name;
            mdph.enabled = $scope.mdphDetail.enabled;
            mdph.opened = $scope.mdphDetail.opened;
            mdph.evaluate = $scope.mdphDetail.evaluate;
            MdphResource.update(mdph);

          }, function() {

            var mdph = {};
            mdph.zipcode = $scope.mdphDetail.zipcode;
            mdph.name = $scope.mdphDetail.name;
            mdph.enabled = $scope.mdphDetail.enabled;
            mdph.opened = $scope.mdphDetail.opened;
            mdph.evaluate = $scope.mdphDetail.evaluate;
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
