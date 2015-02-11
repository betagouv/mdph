'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.repartition_demandes.detail.evaluation.section', {
        url: '/?sectionId',
        templateUrl: 'app/dashboard/repartition_demandes/evaluation/section/section.html',
        controller: 'SectionCtrl'
      });
  });
