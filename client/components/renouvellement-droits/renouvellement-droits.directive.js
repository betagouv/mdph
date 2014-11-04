'use strict';

angular.module('impactApp')
  .directive('renouvellementDroits', function () {
    return {
      scope: {
        mesPrestations: '='
      },
      templateUrl: 'components/renouvellement-droits/renouvellement-droits.html',
      restrict: 'EA',
      controller: function ($scope, droits) {

        $scope.open = function($event) {
          $event.preventDefault();
          $event.stopPropagation();
          $scope.opened = true;
        };

        var computePrestations = function(droits) {
          var currentDroits = [];
          angular.forEach(droits, function(droit) {
            currentDroits.push(droit);
          });

          angular.forEach($scope.mesPrestations, function(prestation) {
            if (prestation.type === 'presta-autre') {
              prestation.selected = true;
              currentDroits.push(prestation);
            } else {
              angular.forEach(droits, function(droit) {
                if (prestation.id === droit.id) {
                  droit.selected = true;
                  droit.date = prestation.date;
                }
              });
            }
          });

          // TODO Sort by type then label
          var result = _.sortBy(currentDroits, 'label');
          return result;
        };

        $scope.prestations = computePrestations(droits);

        $scope.add = function() {
          $scope.prestations.push({label: $scope.currentLabel, type: 'presta-autre', selected: true});
          $scope.currentLabel = '';
        };

        $scope.remove = function(prestation) {
          var index = $scope.prestations.indexOf(prestation);
          $scope.prestations.splice(index, 1);
        };

        $scope.isSelected = function(prestation) {
          return prestation.selected;
        };

        $scope.toggle = function(prestation) {
          if ($scope.isSelected(prestation)) {
            $scope.deselect(prestation);
          } else {
            $scope.select(prestation);
          }
        };

        $scope.select = function(prestation) {
          prestation.selected = true;
        };

        $scope.deselect = function(prestation) {
          if (prestation.type === 'presta-autre') {
            $scope.remove(prestation);
          } else {
            prestation.selected = false;
          }
        };

        $scope.open = function($event, currentPrestation) {
          $event.preventDefault();
          $event.stopPropagation();
          angular.forEach($scope.prestations, function(prestation) {
            prestation.opened = false;
          });
          currentPrestation.opened = true;
        };

        $scope.$on('$destroy', function() {
          var mesPrestationsBuilder = [];
          angular.forEach($scope.prestations, function(prestation) {
            if ($scope.isSelected(prestation)) {
              mesPrestationsBuilder.push({id: prestation.id, label: prestation.label, date: prestation.date, type: prestation.type, description: prestation.description});
            }
          });
          $scope.mesPrestations = mesPrestationsBuilder;
        });
      }
    };
  });
