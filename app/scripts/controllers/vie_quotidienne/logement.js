'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:LogementCtrl
 * @description
 * # LogementCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('LogementCtrl', function($scope, $state) {

    var detailValues = {
      'independant': '',
      'etablissement': '',
      'domicile': '',
      'autre': ''
    };
    var initialRadioModel = '';

    if ($scope.sectionModel.logement) {
      initialRadioModel = $scope.sectionModel.logement.value;
      detailValues[$scope.sectionModel.logement.value] =  $scope.sectionModel.logement.detail;
    }

    $scope.subtitle = 'Votre logement';
    $scope.question = {
      answers: [
        {label: 'Vous disposez d\'un logement indépendant', value: 'independant', onlyAdult: true, showDetail: true, detail: detailValues.independant},
        {label: 'Vous logez en établissement', value: 'etablissement', showDetail: true, detail: detailValues.etablissement, placeholder: 'Nom de l\'établissement'},
        {label: 'Vous êtes hébergé(e) au domicile', value: 'domicile', showDetail: true, detail: detailValues.domicile},
        {label: 'Autre', value: 'autre', showDetail: true, detail: detailValues.autre}
      ],
      radioModel: initialRadioModel,
      setAnswer: function(answer) {
        $scope.sectionModel.logement = answer;
        $scope.showDetail(answer.value);
      }
    };

    $scope.isNextStepDisabled = function() {
      var model = $scope.sectionModel.logement;
      if (angular.isUndefined(model)) {
        return true;
      }

      if (model.value === 'autre' && model.detail === '') {
        return true;
      }
      
      return false;
    };

    $scope.showDetail = function(value) {
      if (angular.isDefined(value) && value !== '' && !$state.includes('**.' + value)) {
        $state.go('form.vie_quotidienne.logement.' + value);
      }
    };

    if (angular.isDefined($scope.sectionModel.logement)) {
      $scope.question.setAnswer($scope.sectionModel.logement);
    }

    $scope.nextStep = function() {
      $state.go('^.^.vos_besoins.quotidien');
    };
  });
