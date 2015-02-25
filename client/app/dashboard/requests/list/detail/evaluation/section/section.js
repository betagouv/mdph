'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.requests.list.user.detail.evaluation.section', {
        url: '/?sectionId',
        templateUrl: 'app/dashboard/requests/list/detail/evaluation/section/section.html',
        controller: 'SectionCtrl'
      });
  });
