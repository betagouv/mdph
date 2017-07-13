'use strict';

angular.module('impactApp')
  .controller('StatsCtrl', function($scope, $http) {
    $scope.unconfirmed = 0;
    $scope.usersTotal = 0;
    $scope.usersRatio = 0;

    $scope.sumRequests = function(mdphs) {
      var count = 0;
      if (mdphs) {
        mdphs.forEach(function(mdph) {
          count += mdph.requests.total;
        });
      }

      return count;
    };

    $scope.conversion = function() {
      if (!$scope.site || !$scope.mdphs) {
        return 0;
      }

      return $scope.sumRequests($scope.mdphs) / $scope.site.count * 100;
    };

    function sumByType(mdphs) {
      var series = [];
      var types = ['emise', 'enregistree', 'en_attente_usager', 'archive'];
      types.forEach(function(type) {
        var data = [];
        mdphs.forEach(function(mdph) {
          data.push(mdph.requests[type]);
        });

        series.push(data);
      });

      return series;
    }

    $http.get('/api/stats/users').then(function(result) {
      const data = result.data;
      const unconfirmed = _.find(data, {_id: true}).count;
      const confirmed = _.find(data, {_id: false}).count;

      $scope.unconfirmed = unconfirmed;
      $scope.usersTotal = unconfirmed + confirmed;
      $scope.usersRatio = $scope.unconfirmed / $scope.usersTotal * 100;
    });

    $http.get('/api/stats/mdph').then(function(result) {
      $scope.mdphs = result.data;
      $scope.labels = _.pluck(result.data, 'name');
      $scope.dataTotal = _.pluck(result.data, 'requests.total');

      $scope.series = ['Émise', 'Enregistrée', 'En attente usager', 'Archivée'];
      $scope.data = sumByType(result.data);
    });

    $http.get('/api/stats/site').then(function(result) {
      $scope.site = result.data;
    });

    $scope.historyLabels = [];
    $scope.historyData = [[]];
    $scope.historySeries = [[]];

    $scope.historyTimeLabels = [];
    $scope.historyTimeData = [[], [], []];
    $scope.historyTimeSeries = [[], [], []];
    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
    $scope.options = {
      scales: {
        yAxes: [
          {
            id: 'y-axis-1',
            type: 'linear',
            display: true,
            position: 'left'
          },
          {
            id: 'y-axis-2',
            type: 'linear',
            display: true,
            position: 'right'
          }
        ]
      }
    };

    $http.get('/api/stats/time').then(function(result) {
      const data = result.data;

      $scope.historyTimeLabels = _.pluck(data, 'date');

      $scope.historyTimeData[0] = _.pluck(data, 'median');
      $scope.historyTimeSeries[0] = 'Temps médian de completion (jours)';

      $scope.historyTimeData[1] = _.pluck(data, 'average');
      $scope.historyTimeSeries[1] = 'Temps moyen de completion (jours)';
    });

    $http.get('/api/stats/history').then(function(result) {
      const data = result.data;

      $scope.historyLabels = _.pluck(data, 'date');
      $scope.historyData[0] = _.pluck(data, 'count');
      $scope.historySeries[0] = 'Nombre de demandes';
    });

    $http.get('/api/stats/likes').then(function(result) {
      $scope.likes = result.data;
      $scope.likesLabels = _.pluck(result.data, 'mdph');
      $scope.likesData = [_.pluck(result.data, 'count')];
      $scope.likesSeries = ['Nombre de likes'];
    });
  });
