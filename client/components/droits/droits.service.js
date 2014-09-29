'use strict';

angular.module('impactApp')
  .factory('DroitService', function DroitService(getDroits, $filter, FormService, QuestionService, droits, isAdult) {

    var getDescription = function(droit) {
      if (!droit.date) {
        return 'Etude du renouvellement de votre droit.';
      }
      return 'Etude du renouvellement de votre droit se terminant le ' + $filter('date')(droit.date, 'dd/MM/yyyy') + '.';
    };

    var getCallbacks = function(answers) {

      var vieQuotidienne = answers.vieQuotidienne;
      if (vieQuotidienne) {
        var besoinsDeplacement = vieQuotidienne.besoinsDeplacement;
        var besoinsVie = vieQuotidienne.besoinsVie;
        var besoinsSocial = vieQuotidienne.besoinsSocial;

        var attentesTypeAide = vieQuotidienne.attentesTypeAide;
      } else {
        return {};
      }

      var contexte = answers.contexte;
      if (contexte) {
        var renouvellement = !contexte.nouveauDossier;
        var connaisTaux = contexte.connaisTaux;
        var taux = contexte.tauxIncapacite;
        var contestationTaux = contexte.contestationTaux;
      } else {
        return {};
      }

      return {
        carteStationnement: function() {
          return besoinsDeplacement && besoinsDeplacement.public ||
            attentesTypeAide && attentesTypeAide.mobilite;
        },
        carteInvalidite: function() {
          return besoinsVie && (besoinsVie.hygiene || besoinsVie.habits || besoinsVie.repas) ||
            besoinsDeplacement && besoinsDeplacement.intraDomicile;
        },
        aeeh: function() {
          var filtreTaux;
          if (renouvellement && connaisTaux) {
            filtreTaux = false === (taux > 50 && contestationTaux === 'stable' || contestationTaux === 'aggrave');
          } else {
            filtreTaux = false;
          }

          if (!attentesTypeAide) {
            return false;
          }

          return !isAdult(contexte) &&
            !filtreTaux &&
            (
              attentesTypeAide.financierHandicap ||
              attentesTypeAide.materiel ||
              attentesTypeAide.financierHandicap ||
              attentesTypeAide.amenagement
            ) &&
            (
              besoinsVie && besoinsVie.hygiene ||
              besoinsVie && besoinsVie.habits ||
              besoinsVie && besoinsVie.repas ||
              besoinsDeplacement && besoinsDeplacement.intraDomicile ||
              (
                besoinsSocial && besoinsSocial.securite &&
                besoinsSocial && besoinsSocial.loisirs &&
                besoinsSocial && besoinsSocial.citoyen &&
                besoinsVie && besoinsVie.budget &&
                besoinsVie && besoinsVie.courses &&
                besoinsVie && besoinsVie.repas &&
                besoinsVie && besoinsVie.menage &&
                besoinsVie && besoinsVie.sante
              )
            );
        }
      };
    };

    return {
      compute: function(answers) {
        var quitus = [];
        var callbacks = getCallbacks(answers);

        angular.forEach(droits, function(droit) {
          if (callbacks[droit.id] && callbacks[droit.id]()) {
            quitus.push(droit);
          } /*else {
            angular.forEach(mesPrestations, function(droit) {
              if (prestation.id === droit.id) {
                prestation.description = getDescription(droit);
                prestations.push(prestation);
              }
            });
          } */
        });

        return quitus;
      },

      computePrestations: function(form) {
        this.compute(form);

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
