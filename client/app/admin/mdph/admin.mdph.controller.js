'use strict';

angular.module('impactApp')
  .controller('AdminMdphCtrl', function($scope, $state, mdphs) {
    this.mdphs = mdphs;
    this.totalItems = this.mdphs.length;
    this.itemsPerPage = 10;
    this.currentPage = 1;

    this.setPage = function (pageNo) {
      this.currentPage = pageNo;
    };

    this.pageChanged = function() {
      console.log('Page changed to: ' + this.currentPage);
    };

    this.setItemsPerPage = function(num) {
      this.itemsPerPage = num;
      this.currentPage = 1;
    }

    this.selectItem = function(item) {
      $scope.mdphDetail = item;
    }

    this.submit = function(form) {
      if (form.$invalid) {
        form.showError = true;
      } else {
        console.log("enregistrement : " + JSON.stringify($scope.mdphDetail));
      }
    };

  });
