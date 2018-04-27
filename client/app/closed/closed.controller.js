'use strict';

angular.module('impactApp')
  .controller('ClosedCtrl', function($http, $timeout, currentMdph) {
    this.currentMdph = currentMdph;

  });
