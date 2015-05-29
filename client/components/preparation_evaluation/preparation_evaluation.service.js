'use strict';

angular.module('impactApp')
  .factory('PreparationEvaluationService', function PreparationEvaluationService(DocumentsPreparationEvalConstants, ageFilter) {
    var flattenAnswers = function(answers){
      var flattened = [];
      _.forEach(answers, function(answer){
        if (typeof answer === 'object') {
          _.forEach(answer, function(n, key){
            if (n) {
              flattened.push(key);
            }
          });
        }
        else {
          flattened.push(answer);
        }
      });
      return flattened;
    };

    var compareAnswersAndDocs = function (answers) {
      var docsList = [];
      _.forEach(DocumentsPreparationEvalConstants, function(document){
        _.forEach(document.situations, function(situation){
          if (_.intersection(answers, situation).length === situation.length && _.last(docsList) !== document){
            docsList.push(document);
          }
        });
      });
      return docsList;
    };

    function computeVieQuotidienne (answers, filteredAnswers) {
      filteredAnswers.push(answers.vie_quotidienne.logement);

      if (answers.vie_quotidienne.aideActuelle && answers.vie_quotidienne.aideActuelle.technique) {
        filteredAnswers.push('technique');
      }

      if (answers.vie_quotidienne.aidesRetraite && answers.vie_quotidienne.aidesRetraite.apa) {
        filteredAnswers.push('apa');
      }

      if (answers.vie_quotidienne.aideActuelle && answers.vie_quotidienne.aideActuelle.technique) {
        filteredAnswers.push('technique');
      }

      if (answers.vie_quotidienne.aideTechnique && answers.vie_quotidienne.aideTechnique.aideTechnique_logement){
        filteredAnswers.push('accompagnement');
      }

      if (answers.vie_quotidienne.aidePersonne) {
        if (answers.vie_quotidienne.aidePersonne.aidePersonne_professionnel) {
          filteredAnswers.push('domicile');
          if (answers.vie_quotidienne.aidePersonne_famille) {
            filteredAnswers.push('accompagnementAidant');
          }
        }
      }

      if (answers.attentesTypeAide && answers.attentesTypeAide.amenagement) {
        filteredAnswers.push('vie');
      }

      if (answers.besoinsDeplacement && answers.besoinsDeplacement.conduite) {
        filteredAnswers.push('conduite');
        filteredAnswers.push('vehicule');
      }
    }

    function computeVieAuTravail (answers, filteredAnswers) {
      if (answers.vie_au_travail.conditionTravail) {
        if (answers.vie_au_travail.arretDeTravail) {
          filteredAnswers.push('arret');
        }
        else {
          filteredAnswers.push('emploi');
        }
      }
      else {
        filteredAnswers.push('sansEmploi');
      }
      if (answers.vie_au_travail.milieuTravail === 'adaptee' || answers.vie_au_travail.milieuTravail === 'etablissement' ) {
        filteredAnswers.push('adapte');
      }
      if (answers.vie_au_travail.adapte === false || answers.vie_au_travail.amenagement) {
        filteredAnswers.push('inadapte');
        }
      if (answers.vie_au_travail.medecinTravail){
        filteredAnswers.push('medecin');
      }
      if (_.keys(answers.vie_au_travail.situationAccompagnement).length >= 0){
        filteredAnswers.push('accompagnement');
      }

    }

    function computeIdentites (answers, filteredAnswers) {
      if (answers.identites.beneficiaire && ageFilter(answers.identites.beneficiaire.dateNaissance) < 20) {
        filteredAnswers.push('moins20');
      }
      if (answers.identites.beneficiaire && ageFilter(answers.identites.beneficiaire.dateNaissance) >= 20) {
        filteredAnswers.push('plus20');
      }
      if (answers.identites.autorite) {
        if (answers.identites.autorite.autre && (answers.identites.autorite.autre.type === 'curateur' || answers.identites.autorite.autre.type === 'tuteur') || (answers.identites.autorite.parent1 && answers.identites.autorite.parent1.nom) || (answers.identites.autorite.parent2 && answers.identites.autorite.parent2.nom)){
          filteredAnswers.push('tutelle');
        }
      }
    }

    var getFilteredAnswers =  function (answers) {
      var filteredAnswers = [];
      if (answers) {
        if (answers.identites) {
          computeIdentites(answers, filteredAnswers);
        }

        if (answers.vie_quotidienne) {
          computeVieQuotidienne(answers, filteredAnswers);
        }


        if (answers.vie_scolaire) {
          if (answers.vie_scolaire.vieScolaireType === 'etablissement' ){
            filteredAnswers.push('medicosocial');
          }
        }

        if (answers.vie_au_travail) {
          computeVieAuTravail(answers, filteredAnswers);
        }

        if (answers.aidant) {
          if (answers.aidant.natureAide && answers.aidant.natureAide.professionnels) {
            filteredAnswers.push('accompagnementAidant');
          }
        }
      }
      return filteredAnswers;
    };



    return {
      getDocsList: function(answers){
        var flattenedAnswers = flattenAnswers(answers);
        return compareAnswersAndDocs(flattenedAnswers);
      },

      getSuggestedDocsList: function(answers){
        var filteredAnswers = getFilteredAnswers(answers);
        return compareAnswersAndDocs(filteredAnswers);
      }
    };
  });
