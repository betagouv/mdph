'use strict';

angular.module('impactApp')
  .controller('CmFormController', function ($scope, $location, $anchorScroll) {
    $scope.scrollTo = function(id) {
      $location.hash(id);
      $anchorScroll();
    };

    $scope.sections = [
      {
        id: 'pathologie',
        name: 'Pathologie motivant la demande',
        template: 'app/cm/form/pathologie/pathologie.html'
      },
      {
        id: 'histoire',
        name: 'Histoire de la pathologie',
        template: 'app/cm/form/histoire/histoire.html'
      },
      {
        id: 'clinique_actuelle',
        name: 'Description clinique actuelle',
        template: 'app/cm/form/clinique_actuelle/clinique_actuelle.html'
      }
    ];
  });
