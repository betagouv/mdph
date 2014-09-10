'use strict';

angular.module('impactApp')
  .controller('ObjetCtrl', function($scope, $sessionStorage, FormService) {

    $scope.subtitle = FormService.estRepresentant($scope.formAnswers) ? 'Quels autres projets sont concernés par sa demande ?' : 'Quels autres projets sont concernés par votre demande ?';

    if (angular.isUndefined($scope.sectionModel.objet)) {
      $scope.sectionModel.objet = {
        'scolarite': false,
        'travail': false,
        'aidant': false,
        'carteStationnement': false,
        'carteInvalidite': false
      };
    }

    $scope.model = $scope.sectionModel;
    $scope.question = {
      'model': 'objet',
      'answers': [
        {
          'label': 'Votre scolarité ou vie étudiante',
          'labelRep': 'Sa scolarité ou vie étudiante',
          'model': 'scolarite'
        },
        {
          'label': 'Votre vie professionnelle',
          'labelRep': 'Sa vie professionnelle',
          'model': 'travail'
        }
      ]
    };

    $scope.nextStep = function() {
      $scope.goToNextSection($scope.currentSectionId);
    };
  });
