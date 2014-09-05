'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:NatureAideBisCtrl
 * @description
 * # NatureAideBisCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('NatureAideBisCtrl', function($scope, $state) {

    $scope.subtitle = 'Quelle est la nature de l\'aide apportée ? (2/2)';

    if (angular.isUndefined($scope.sectionModel.natureAide)) {
      $scope.sectionModel.natureAide = {
        'natures': {
          'surveillance': false,
          'deplacement_interieur': false,
          'deplacement_exterieur': false,
          'logement': false,
          'hygiene': false,
          'repas_preparation': false,
          'repas_prise': false,

          'professionnels': false,
          'juridique': false,
          'finances': false,
          'loisirs': false,
          'social': false,
          'medical': false,
          'autre': false
        },
        detail: ''
      };
    }

    $scope.model= $scope.sectionModel.natureAide;
    $scope.question = {
      'model': 'natures',
      'answers':[
        {label: 'Coordination des intervenants professionnels à l’extérieur', model: 'professionnels'},
        {label: 'Gestion administrative et juridique', model: 'juridique'},
        {label: 'Gestion financière', model: 'finances'},
        {label: 'Stimulation par des activités (loisirs, sorties, etc.)', model: 'loisirs'},
        {label: 'Aide à la communication et aux relations sociales', model: 'social'},
        {label: 'Aide au suivi médical', model: 'medical'},
        {label: 'Autres', model: 'autre', detail: true}
      ]
    };

    $scope.nextStep = function() {
      $state.go('^.dedommagement');
    };
  });
