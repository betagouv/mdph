'use strict';

angular.module('impactApp')
  .controller('FinDeDroitsCtrl', function($scope, $state, droits, datepickerConfig, QuestionService) {

    $scope.question = QuestionService.get('vieQuotidienne', 'finDroits', $scope.formAnswers);

    datepickerConfig.datepickerMode = 'day';
    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };
    if (angular.isUndefined($scope.sectionModel.mesPrestations)) {
      $scope.sectionModel.mesPrestations = [];
    }

    var computePrestations = function(droits) {
      var currentDroits = [];
      angular.forEach(droits, function(droit) {
        currentDroits.push(droit);
      });

      angular.forEach($scope.sectionModel.mesPrestations, function(prestation) {
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
      var mesPrestations = [];
      angular.forEach($scope.prestations, function(prestation) {
        if ($scope.isSelected(prestation)) {
          mesPrestations.push({id: prestation.id, label: prestation.label, date: prestation.date, type: prestation.type, description: prestation.description});
        }
      });
      $scope.sectionModel.mesPrestations = mesPrestations;
    });

    $scope.nextStep = function() {
      $scope.sections[1].isEnabled = true;
      $state.go('^.^.vos_besoins.quotidien');
    };
  });
