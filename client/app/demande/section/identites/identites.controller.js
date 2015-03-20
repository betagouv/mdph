'use strict';

angular.module('impactApp')
  .controller('IdentitesCtrl', function($scope, request, section, sectionModel, estMineur, saveSection) {
    $scope.request = request;
    $scope.section = section;
    $scope.estMineur = estMineur;
    $scope.sectionModel = sectionModel;
    $scope.error = {
      show: false,
      message: ''
    };

    $scope.checkIdentities = function(){
      var formIdentites = request.formAnswers.identites;
      if (!formIdentites.beneficiaire || !formIdentites.beneficiaire.nom){
        $scope.error.show = true;
        $scope.error.message = 'Veuillez renseigner un bénéficiaire.';
      }
      else {
        if (estMineur(formIdentites.beneficiaire.dateNaissance)){
          if (!formIdentites.autorite || !formIdentites.autorite.parent1 || !formIdentites.autorite.parent1 ||!formIdentites.autorite.parent1.nom|| !formIdentites.autorite.parent2 || !formIdentites.autorite.parent2.nom){
            $scope.error.show = true;
            $scope.error.message = 'Veuillez renseigner deux autorités parentales pour un bénéficiaire mineur.';
          }
        }
        else {
          saveSection();
        }
      }
    };
  });
