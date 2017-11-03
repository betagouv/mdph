'use strict';

angular.module('impactApp')
  .controller('AdminMdphListCtrl', function($state, mdphs) {
    this.mdphs = mdphs;
    this.totalItems = this.mdphs.length;
    this.itemsPerPage = 10;
    this.currentPage = 1;

    this.setPage = function(pageNo) {
      this.currentPage = pageNo;
    };

    this.setItemsPerPage = function(num) {
      this.itemsPerPage = num;
      this.currentPage = 1;
    };

    this.selectItem = function(item) {
      return $state.go('admin.mdph.detail', {zipcode: item.zipcode}, {reload: true});
    };

    this.newItem = function(item) {
      return $state.go('admin.mdph.detail', {}, {reload: true});
    };

  });
