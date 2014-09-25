'use strict';

angular.module('impactApp')
  .factory('DroitService', function DroitService(getDroits, $filter, isAdult) {

    var getDescription = function(droit) {
      if (!droit.date) {
        return 'Etude du renouvellement de votre droit.';
      }
      return 'Etude du renouvellement de votre droit se terminant le ' + $filter('date')(droit.date, 'dd/MM/yyyy') + '.';
    };

    return {
      computePrestations: function(form) {
        var prestations = [];
        var defaultPrestations = getDroits(form, isAdult(form.contexte));
        var mesPrestations = form.vie.answers.situation.answers.mesPrestations;

        angular.forEach(defaultPrestations, function(category) {
          angular.forEach(category.prestations, function(prestation) {
            prestation.type = category.type;
            if (angular.isDefined(prestation.shouldHave) && prestation.shouldHave()) {
              prestations.push(prestation);
            } else {
              angular.forEach(mesPrestations, function(droit) {
                if (prestation.id === droit.id) {
                  prestation.description = getDescription(droit);
                  prestations.push(prestation);
                }
              });
            }
          });
        });

        angular.forEach(mesPrestations, function(droit) {
          if (droit.type === 'presta-autre') {
            var droitObj = { label: droit.label, description: getDescription(droit), type: 'presta-autre'};
            prestations.push(droitObj);
          }
        });

        return prestations;
      }
    };
  });
