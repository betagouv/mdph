'use strict';

angular.module('impactApp')
  .factory('DroitService', function DroitService($filter, FormService, QuestionService, isAdult, isLessThan62) {

    var getSection = function(isAdmin, answers, sectionModel) {
      if (isAdmin) {
        return answers;
      }

      var result = _.result(answers, sectionModel);
      return result ? result : {};
    };

    var getValue = function(question, answerModel) {
      var answer = _.result(question, answerModel);
      return answer ? answer : false;
    };

    var getValueList = function(question, answerModelList) {
      var resultList = [];
      _.forEach(answerModelList, function(model) {
        var answer = _.result(question, model);
        if (answer) {
          resultList.push(answer);
        } else {
          resultList.push(false);
        }
      });
      return resultList;
    };

    var getCallbacks = function(answers, isAdmin) {
      var contexte = getSection(isAdmin, answers, 'contexte');
      var aidant = getSection(isAdmin, answers, 'aidant');
      var vieQuotidienne = getSection(isAdmin, answers, 'vieQuotidienne');
      var renouvellements = getSection(isAdmin, answers, 'prestations');
      var travail = getSection(isAdmin, answers, 'travail');

      var besoinsDeplacement = _.result(vieQuotidienne, 'besoinsDeplacement');
      var besoinsVie = _.result(vieQuotidienne, 'besoinsVie');
      var besoinsLieuDeVie = _.result(vieQuotidienne, 'besoinsLieuDeVie');
      var besoinsSocial = _.result(vieQuotidienne, 'besoinsSocial');
      var attentesTypeAide = _.result(vieQuotidienne, 'attentesTypeAide');

      var estAdulte = isAdult(contexte);
      var estEnfant = !estAdulte;
      var aMoinsDe62Ans = isLessThan62(contexte);

      var listeEtBesoins = _.every([
        _.every(
          getValueList(besoinsSocial, ['securite', 'loisirs', 'citoyen'])
        ),
        _.every(
          getValueList(besoinsVie, ['budget', 'courses', 'cuisine', 'menage', 'sante'])
        )
      ]);

      var estRenouvellement = function(presta) {
        var res = renouvellements && renouvellements[presta.id];
        if (res) {
          presta.renouvellement = true;
          var date = renouvellements[presta.id].date;
          presta.descRenouvellement = '* Etude du renouvellement de votre droit se terminant le ' + moment(date).format('DD/MM/YYYY') + '.';
        }
        return res;
      };

      var ou = _.some;
      var et = _.every;

      var estNonActif = et([
        aMoinsDe62Ans,
        ou([
          false === getValue(travail, 'conditionTravail'),
          et([
            false === getValue(travail, 'temps'),
            false === getValue(travail, 'adapte')
          ])
        ])
      ]);

      return {
        aah: function(droit) {
          if (estRenouvellement(droit)) {
            return true;
          }

          return et([
            estAdulte,
            ou([
              getValue(besoinsVie, 'courant'),
              getValue(attentesTypeAide, 'financierMinimum'),
            ]),
            ou([
              // MTP ??
              // PCRTP ??
              et([
                getValue(attentesTypeAide, 'humain'),
                ou([
                  ou( getValueList(besoinsVie, ['hygiene', 'habits', 'repas']) ),
                  getValue(besoinsDeplacement, 'intraDomicile')
                ]),
              ]),
              et([
                getValue(besoinsSocial, 'securite'),
                et([
                  et( getValueList(besoinsSocial, ['proches', 'loisirs', 'citoyen']) ),
                  et( getValueList(besoinsVie, ['budget', 'courses', 'cuisine', 'menage', 'sante']) ),
                  estNonActif
                ])
              ]),
              et([
                getValue(besoinsLieuDeVie, 'materiel'),
                et([
                  et( getValueList(besoinsVie, ['hygiene', 'habits', 'repas']) ),
                  getValue(besoinsDeplacement, 'public'),
                  estNonActif
                ])
              ])
            ])
          ]);
        },
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

          return estEnfant && auMoinsUneAttente() && auMoinsUnBesoin();
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
            return auMoinsUneAttente() && auMoinsUnBesoin();
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
      compute: function(answers, prestations, isAdmin) {
        var callbacks = getCallbacks(answers, isAdmin);

        return _.filter(prestations, function(prestation) {
          var callback = callbacks[prestation.id];
          return callback && callback(prestation);
        });
      }
    };
  });
