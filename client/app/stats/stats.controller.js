'use strict';

angular.module('impactApp')
  .controller('StatsCtrl', function($scope, $http) {
    // Api calls
    function getSubmittedRequestCount(period) {
      return $http.get('/api/stats/submitted-request-count', {params: {period}}).then(result => $scope.submittedRequestCount = result.data);
    }

    function getCreatedRequestCount(period) {
      return $http.get('/api/stats/created-request-count', {params: {period}}).then(result => $scope.createdRequestCount = result.data);
    }

    function getRequestCountByMdph(period) {
      return $http.get('/api/stats/request-count-by-mdph', {params: {period}}).then(result => {
        $scope.mdphLabels = _.pluck(result.data, '_id');
        $scope.requestByMdphPieData = _.pluck(result.data, 'count');
      });
    }

    function getRequestAnalysis(period) {
      return $http.get('/api/stats/request-analysis', {params: {period}}).then(result => {
        const data = result.data;

        $scope.requestAnalysisLabels = _.pluck(data, 'date');
        $scope.requestAnalysisData[0] = _.pluck(data, 'median');
        $scope.requestAnalysisData[1] = _.pluck(data, 'average');
      });
    }

    function getRequestCountHistory(period) {
      return $http.get('/api/stats/request-count-history', {params: {period}}).then(result => {
        const data = result.data;

        $scope.requestCountHistoryLabels = _.pluck(data, 'date');
        $scope.requestCountHistoryData[0] = _.pluck(data, 'count');
      });
    }

    function getRequestCompletionMedian(period) {
      return $http.get('/api/stats/request-median-time', {params: {period}}).then(result => {
        $scope.median = result.data;
      });
    }

    // Setup watches
    $scope.$watch('conversionPeriod', getCreatedRequestCount);
    $scope.$watch('conversionPeriod', getSubmittedRequestCount);
    $scope.$watch('conversionPeriod', getRequestCompletionMedian);
    $scope.$watch('requestCountByMdphPeriod', getRequestCountByMdph);
    $scope.$watch('requestAnalysisPeriod', getRequestAnalysis);
    $scope.$watch('requestCountHistoryPeriod', getRequestCountHistory);

    // Init period
    $scope.requestAnalysisPeriod = 'year';
    $scope.conversionPeriod = 'month';
    $scope.requestCountByMdphPeriod = 'month';
    $scope.requestCountHistoryPeriod = 'year';

    // Init data
    $scope.unconfirmed = 0;
    $scope.usersTotal = 0;
    $scope.usersRatio = 0;

    $scope.requestAnalysisLabels = [];
    $scope.requestAnalysisData = [[], []];
    $scope.requestAnalysisSeries = ['Temps médian de completion (jours)', 'Temps moyen de completion (jours)'];

    $scope.requestCountHistoryLabels = [];
    $scope.requestCountHistoryData = [[]];
    $scope.requestCountHistorySeries = ['Nombre de demandes'];

    // Utils
    $scope.conversion = function() {
      if (!$scope.createdRequestCount || !$scope.submittedRequestCount) {
        return 0;
      }

      return $scope.submittedRequestCount / $scope.createdRequestCount * 100;
    };

    // Get data only once
    $http.get('/api/stats/mdphs').then((result) => $scope.enabledMdph = result.data);

    $http.get('/api/stats/users').then((result) => {
      const data = result.data;
      const unconfirmed = _.find(data, {_id: true}).count;
      const confirmed = _.find(data, {_id: false}).count;

      $scope.unconfirmed = unconfirmed;
      $scope.usersTotal = unconfirmed + confirmed;
      $scope.usersRatio = $scope.unconfirmed / $scope.usersTotal * 100;
    });

    $http.get('/api/stats/likes').then(function(result) {
      $scope.likes = result.data;
      $scope.likesLabels = _.pluck(result.data, 'mdph');
      $scope.likesData = [_.pluck(result.data, 'count')];
      $scope.likesSeries = ['Nombre de likes'];
    });
  });
