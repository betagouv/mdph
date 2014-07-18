'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:RaisonNonScolaireCtrl
 * @description
 * # RaisonNonScolaireCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('RaisonNonScolaireCtrl', function($scope, $state) {

    $scope.subtitle = ($scope.estRepresentant()) ? 'Pourquoi n\'est il pas scolarisé' : 'Pourquoi n\'êtes vous pas scolarisé';

    var detailValues = {
      'tropJeune': '',
      'handicap': '',
      'etablissement': '',
      'autre': ''
    };
    var initialRadioModel = '';

    if ($scope.sectionModel.raison) {
      initialRadioModel = $scope.sectionModel.raison.value;
      detailValues[$scope.sectionModel.raison.value] =  $scope.sectionModel.raison.detail;
    }

    $scope.question = {
      answers: [
        {
          label: 'Vous êtes trop jeune',
          labelRep: 'Il est trop jeune',
          value: 'tropJeune',
          showDetail: true,
          detail: detailValues.tropJeune,
          placeholder: ($scope.estRepresentant()) ? 'A partir de quand sera-t-il scolarisé ?' : 'A partir de quand serez vous scolarisé ?'
        },
        {
          label: 'Votre handicap vous en empêche',
          labelRep: 'Son handicap l\'en empêche',
          value: 'handicap',
          showDetail: true,
          detail: detailValues.handicap,
          placeholder: ($scope.estRepresentant()) ? 'Quelles sont ses difficultées ?' : 'Quelles sont vos difficultées ?'
        },
        {
          label: 'Sans solution d\'acceuil en établissement',
          value: 'etablissement'
        },
        {
          label: 'Autre',
          value: 'autre',
          showDetail: true,
          detail: detailValues.autre
        }
      ],
      radioModel: initialRadioModel,
      setAnswer: function(answer) {
        $scope.sectionModel.raison = answer;
        $scope.showDetail(answer);
      }
    };

    $scope.showDetail = function(answer) {
      if (answer.showDetail && !$state.includes('**.autre')) {
        $state.go('.autre');
      }
    };

    if (angular.isDefined($scope.sectionModel.raison)) {
      $scope.question.setAnswer($scope.sectionModel.raison);
    }
    
    $scope.isNextStepDisabled = function() {
      if (angular.isUndefined($scope.sectionModel.raison)) {
        return true;
      }
      if ($scope.sectionModel.raison.value !== 'etablissement' && !$scope.sectionModel.raison.detail) {
        return true;
      }
      return false;
    };
    
    $scope.nextStep = function() {
      if ($state.includes('**.autre')) {
        $state.go('^.^.vos_attentes.structure');
      } else {
        $state.go('^.vos_attentes.structure');
      }
    };
  });
