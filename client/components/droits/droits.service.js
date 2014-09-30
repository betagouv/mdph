'use strict';

angular.module('impactApp')
  .factory('DroitService', function DroitService($filter, FormService, QuestionService, droits, isAdult) {

    // Retourne faux si et seulement on prend en compte le taux et qu'il est trop faible
    var getFiltreTaux = function(answers) {
      var contexte = answers.contexte;
      if (contexte) {
        var renouvellement = FormService.estRenouvellement(answers);
        var connaisTaux = contexte.connaisTaux;
        var taux = contexte.tauxIncapacite;
        var contestationTaux = contexte.contestationTaux;

        var filtreTaux;
        if (renouvellement && connaisTaux) {
          filtreTaux = (taux > 50 && contestationTaux === 'stable' || contestationTaux === 'aggrave');
        } else {
          filtreTaux = true;
        }
        return filtreTaux;
      } else {
        return true;
      }
    };

    var getCallbacks = function(answers) {
      var contexte = answers.contexte;
      var aidant = answers.aidant;
      var vieQuotidienne = answers.vieQuotidienne;

      if (!vieQuotidienne) {
        return {};  // optim
      }

      var renouvellements = _.indexBy(vieQuotidienne.mesPrestations, 'id');

      var besoinsDeplacement = vieQuotidienne.besoinsDeplacement;
      var besoinsVie = vieQuotidienne.besoinsVie;
      var besoinsSocial = vieQuotidienne.besoinsSocial;
      var attentesTypeAide = vieQuotidienne.attentesTypeAide;

      var filtreTaux = getFiltreTaux(answers);
      var estAdulte = isAdult(contexte);
      var estEnfant = !estAdulte;

      var listeEtBesoins = _.every([
        besoinsSocial && _.every([besoinsSocial.securite, besoinsSocial.loisirs, besoinsSocial.citoyen]),
        besoinsVie && _.every([besoinsVie.budget, besoinsVie.courses, besoinsVie.cuisine, besoinsVie.menage, besoinsVie.sante])
      ]);

      var estRenouvellement = function(presta) {
        var res = renouvellements && renouvellements[presta.id];
        if (res) {
          presta.renouvellement = true;
          presta.descRenouvellement = '* Etude du renouvellement de votre droit se terminant le ' + $filter('date')(renouvellements[presta.id].date, 'dd/MM/yyyy') + '.';
        }
        return res;
      };

      return {
        carteStationnement: function(droit) {
          return _.some([
            estRenouvellement(droit),
            besoinsDeplacement && besoinsDeplacement.public,
            attentesTypeAide && attentesTypeAide.mobilite
          ]);
        },
        carteInvalidite: function(droit) {
          return _.some([
            estRenouvellement(droit),
            besoinsVie && _.some([besoinsVie.hygiene, besoinsVie.habits, besoinsVie.repas]),
            besoinsDeplacement && besoinsDeplacement.intraDomicile
          ]);
        },
        aeeh: function(droit) {
          if (estRenouvellement(droit)) {
            return true;
          }

          var auMoinsUneAttente = function() {
            return attentesTypeAide && _.some([
              attentesTypeAide.financierHandicap,
              attentesTypeAide.humain,
              attentesTypeAide.materiel,
              attentesTypeAide.amenagement]);
          };

          var auMoinsUnBesoin = function() {
            return _.some([
              besoinsVie && _.some([besoinsVie.hygiene, besoinsVie.habits, besoinsVie.repas]),
              besoinsDeplacement && besoinsDeplacement.intraDomicile,
              listeEtBesoins
            ]);
          };

          return estEnfant && filtreTaux && auMoinsUneAttente() && auMoinsUnBesoin();
        },
        aah: function(droit) {
          if (estRenouvellement(droit)) {
            return true;
          }

          var auMoinsUnBesoinOuAttenteFinancier = function() {
            return _.some([
              besoinsVie && besoinsVie.courant,
              attentesTypeAide && attentesTypeAide.financierHandicap
            ]);
          };

          var auMoinsUnBesoin = function() {
            return _.some([
              besoinsVie && _.some([besoinsVie.hygiene, besoinsVie.habits, besoinsVie.repas]),
              besoinsDeplacement && besoinsDeplacement.intraDomicile,
              besoinsSocial && besoinsSocial.proches,
              listeEtBesoins
            ]);
          };

          return estAdulte && filtreTaux && auMoinsUnBesoinOuAttenteFinancier() && auMoinsUnBesoin();
        },
        ac: function(droit) {
          if (estRenouvellement(droit)) {
            return true;
          } else {
            return false;
          }
        },
        pps: function(droit) {
          if (estRenouvellement(droit)) {
            return true;
          }
          return contexte && contexte.ecole;
        },
        orp: function(droit) {
          if (estRenouvellement(droit)) {
            return true;
          }
          return contexte && _.some([contexte.travail, contexte.formation]);
        },
        pch: function(droit) {
          if (estRenouvellement(droit) || estRenouvellement({id: 'ac'})) {
            return true;
          }

          var auMoinsUneAttente = function() {
            return _.some([
              attentesTypeAide && _.some([
                attentesTypeAide.humain,
                attentesTypeAide.materiel,
                attentesTypeAide.amenagement,
                attentesTypeAide.financierHandicap]),
              besoinsDeplacement && besoinsDeplacement.vehicule,
              aidant && aidant.typeAttente && _.some([
                aidant.typeAttente.finance,
                aidant.typeAttente.imprevu,
                aidant.typeAttente.vacances,
                aidant.typeAttente.professionnel
              ])
            ]);
          };

          var auMoinsUnBesoin = function() {
            return _.some([
              besoinsVie && _.some([besoinsVie.hygiene, besoinsVie.habits, besoinsVie.repas]),
              besoinsDeplacement && _.some([besoinsDeplacement.intraDomicile, besoinsDeplacement.public, besoinsDeplacement.accesDomicile]),
              besoinsSocial && _.some([besoinsSocial.proches, besoinsSocial.securite, besoinsSocial.communication]),
            ]);
          };

          var pchEnfant = function() {
            return filtreTaux && auMoinsUneAttente() && auMoinsUnBesoin();
          };

          var pchAdulte = function() {
            return auMoinsUneAttente() && auMoinsUnBesoin();
          };

          return estEnfant && pchEnfant() || estAdulte && pchAdulte();
        },
        ems: function(droit) {
          if (estRenouvellement(droit)) {
            return true;
          }

          var besoinAidant = function() {
            return aidant && _.every([
              aidant.typeAttente && _.some([aidant.typeAttente.imprevu, aidant.typeAttente.vacances, aidant.typeAttente.professionnel]),
              aidant.natureAide && _.some([
                aidant.natureAide.surveillance,
                aidant.natureAide.deplacementInterieur,
                aidant.natureAide.deplacementExterieur,
                aidant.natureAide.loisirs,
                aidant.natureAide.hygiene,
                aidant.natureAide.social,
                aidant.natureAide.repasPrise
              ])
            ]);
          };

          var besoinsVieQuotidienne = function() {
            return _.every([
              besoinsSocial && _.every([besoinsSocial.loisirs, besoinsSocial.securite, besoinsSocial.proches]),
              _.some([
                besoinsVie && _.some(besoinsVie.hygiene, besoinsVie.habits, besoinsVie.repas),
                besoinsDeplacement && besoinsDeplacement.intraDomicile
              ])
            ]);
          };

          return _.every([
            estAdulte,
            _.some([
              attentesTypeAide && attentesTypeAide.etablissement,
              contexte && _.some([contexte.domicile, contexte.etablissement]),
              besoinAidant(),
              besoinsVieQuotidienne()
            ])
          ]);
        },
        sms: function(droit) {
          if (estRenouvellement(droit)) {
            return true;
          }

          var besoinAidant = function() {
            return aidant && _.every([
              aidant.typeAttente && _.some([aidant.typeAttente.repos, aidant.typeAttente.professionnel]),
              aidant.natureAide && _.some([
                aidant.natureAide.surveillance,
                aidant.natureAide.juridique,
                aidant.natureAide.deplacementExterieur,
                aidant.natureAide.finances,
                aidant.natureAide.logement,
                aidant.natureAide.loisirs,
                aidant.natureAide.social,
                aidant.natureAide.repasPreparation,
                aidant.natureAide.medical
              ])
            ]);
          };

          var besoinsVieQuotidienne = function() {
            return _.every([
              contexte && contexte.domicile,
              attentesTypeAide && _.every([attentesTypeAide.domicile, attentesTypeAide.humain]),
              _.some([
                besoinsSocial && _.some([besoinsSocial.loisirs, besoinsSocial.proches, besoinsSocial.citoyen]),
                besoinsVie && _.some([besoinsVie.sante, besoinsVie.budget])
              ])
            ]);
          };

          return _.every([
            estAdulte,
            _.some([
              besoinAidant(),
              besoinsVieQuotidienne()
            ])
          ]);
        },
        av: function(droit) {
          if (estRenouvellement(droit)) {
            return true;
          }
          return aidant && aidant.typeAttente && aidant.typeAttente.vieillesse;
        },
        rqth: function(droit) {
          if (estRenouvellement(droit)) {
            return true;
          }
          return contexte && _.some([contexte.travail, contexte.formation]);
        }
      };
    };

    return {
      // Commodité pour les tests
      getFiltreTaux: getFiltreTaux,

      compute: function(answers) {
        var callbacks = getCallbacks(answers);

        return _.filter(droits, function(droit) {
          var callback = callbacks[droit.id];
          return callback && callback(droit);
        });
      }
    };
  });
