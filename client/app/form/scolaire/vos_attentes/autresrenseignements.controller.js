'use strict';

angular.module('impactApp')
  .controller('AutresRenseignementsScolaireCtrl', function ($scope) {

    $scope.subtitle = 'Autres renseignements concernant la scolarité que vous souhaiteriez nous communiquer';

    $scope.placeholder = 'Autres renseignements';

    if (angular.isUndefined($scope.sectionModel.autresRenseignements)) {
      $scope.sectionModel.autresRenseignements = '';
    }

    $scope.nextStep = function() {
      $scope.goToNextSection($scope.currentSection);
    };
  });
