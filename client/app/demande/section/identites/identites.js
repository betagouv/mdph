'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    var index = 'departement.demande.identites';
    $stateProvider
      .state(index + '.nouvelle_identite', {
        url: '/nouvelle_identite/:type',
        template: '<identity-form title="\'Nouvelle identité\'" section="section"/>',
        resolve: {
          identite: function(request, $stateParams){
            return request.formAnswers.identites[$stateParams.type];
          }
        },
        controller: function($scope, identite){
          $scope.identite = identite;
        }
      });
  });
