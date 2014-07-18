'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:ObjetCtrl
 * @description
 * # ObjetCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('ObjetCtrl', function($scope, $state) {

    $scope.title = 'Objets concernés par votre demande';

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
          'label': 'Votre projet professionel',
          'labelRep': 'Sont projet professionel',
          'model': 'travail'
        },
        {
          'label': 'Une carte de stationnement',
          'model': 'carteStationnement'
        },
        {
          'label': 'Une carte d\'invalidité',
          'model': 'carteInvalidite'
        },
        {
          'label': 'Vous êtes accompagné d\'un aidant familial et souhaitez informer la MDPH de ses attentes et besoins',
          'model': 'aidant'
        }
      ]
    };

    $scope.nextStep = function() {
      $state.go('form.vie_quotidienne.vie_famille');
      $scope.broadcastFormTemplate();
    };
  });
