'use strict';

angular.module('impactApp')
  .controller('StatsCtrl', function($scope, $http) {
    $scope.sumRequests = function(mdphs) {
      var count = 0;
      if (mdphs) {
        mdphs.forEach(function(mdph) {
          count += mdph.requests.total;
        });
      }

      return count;
    };

    function sumByType(mdphs) {
      var series = [];
      var types = ['en_cours', 'emise', 'evaluation'];
      types.forEach(function(type) {
        var data = [];
        mdphs.forEach(function(mdph) {
           data.push(mdph.requests[type]);
         });

        series.push(data);
      });

      return series;
    }

    function sumCertificatsByType(mdphs) {
      var series = [];
      var types = ['partenaire', 'direct'];

      types.forEach(function(type) {
        var data = [];
        mdphs.forEach(function(mdph) {
           data.push(mdph.certificats[type]);
         });

        series.push(data);
      });

      return series;
    }

    $http.get('/api/stats/mdph').then(function(result) {
      $scope.mdphs = result.data;
      $scope.labels = _.pluck(result.data, 'name');
      $scope.dataTotal = _.pluck(result.data, 'requests.total');

      $scope.series = ['En cours', 'Émises', 'En évaluation'];
      $scope.data = sumByType(result.data);

      $scope.seriesCertificats = ['Partenaire', 'Direct'];
      $scope.dataCertificats = sumCertificatsByType(result.data);
    });

    $http.get('/api/stats/site').then(function(result) {
      $scope.site = result.data;
    });

    $http.get('/api/stats/certificats').then(function(result) {
      $scope.certificats = result.data;
    });

    $http.get('/api/stats/history').then(function(result) {
      $scope.history = result.data;
      $scope.historyLabels = _.pluck(result.data, 'date');
      $scope.historyData = [_.pluck(result.data, 'count')];
      $scope.historySeries = ['Nombre de demandes'];
    });
  });
