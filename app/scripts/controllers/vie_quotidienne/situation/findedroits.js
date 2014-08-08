'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:FinDeDroitsCtrl
 * @description
 * # FinDeDroitsCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('FinDeDroitsCtrl', function($scope, $state, getDroits) {
    $scope.subtitle = 'De quelles prestations bénéficiez-vous actuellement ?';

    if (angular.isUndefined($scope.sectionModel.mesPrestations)) {
      $scope.sectionModel.mesPrestations = [];
    }

    var computePrestations = function() {
      var categories = getDroits();
      angular.forEach($scope.sectionModel.mesPrestations, function(prestation) {
        angular.forEach(categories, function(category) {
          if (category.type === prestation.type) {
            if (category.type === 'presta-autre') {
              category.prestations.push({selected: true, label: prestation.label});
            }
            angular.forEach(category.prestations, function(defaultPrestation) {
              if (prestation.id === defaultPrestation.id) {
                defaultPrestation.selected = true;
                defaultPrestation.date = prestation.date;
              }
            });
          }
        });
      });
      return categories;
    };

    $scope.prestationCategories = computePrestations();

    $scope.add = function() {
      $scope.prestationCategories[3].prestations.push({label: $scope.currentLabel, type: 'presta-autre', selected: true}); // TODO au secours prestationCategories[3]
      $scope.currentLabel = '';
    };

    $scope.remove = function(prestation) {
      var array = $scope.prestationCategories[3].prestations;
      var index = array.indexOf(prestation);
      array.splice(index, 1);
    };

    $scope.isSelected = function(prestation) {
      return prestation.selected;
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
      angular.forEach($scope.prestationCategories, function(category) {
        angular.forEach(category.prestations, function(prestation) {
          prestation.opened = false;
        });
      });
      currentPrestation.opened = true;
    };

    $scope.$on('$destroy', function() {
      var mesPrestations = [];
      angular.forEach($scope.prestationCategories, function(category) {
        angular.forEach(category.prestations, function(prestation) {
          if ($scope.isSelected(prestation)) {
            mesPrestations.push({id: prestation.id, label: prestation.label, date: prestation.date, type: category.type, description: prestation.description});
          }
        });
      });
      $scope.sectionModel.mesPrestations = mesPrestations;
    });

    $scope.nextStep = function() {
      $state.go('^.^.vos_besoins.quotidien');
    };
  });
