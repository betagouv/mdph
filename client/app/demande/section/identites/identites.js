'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    var index = 'departement.demande.identites';
    $stateProvider
      .state(index + '.modification_identite', {
        url: '/:type',
        template: '<identity-form type="type" section="section" identite="identite"/>',
        resolve: {
          type: function($stateParams) {
            return $stateParams.type;
          },
          identite: function(request, type){
            var currentIdentites = request.formAnswers.identites;
            if(!currentIdentites[type]){
              currentIdentites[type] = {};
            }
            return currentIdentites[type];
          }
        },
        controller: function($scope, type, identite){
          $scope.identite = identite;
          $scope.type = type;
        }
      });
  });
