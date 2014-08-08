'use strict';

/**
 * @ngdoc service
 * @name impactApp.getDocuments
 * @description
 * # getDocuments
 * Service in the impactApp.
 */
angular.module('impactApp')
  .factory('getDocuments', function() {
    return function(data, estRepresentant, isAdult, name) {

      var obligatoire = {
        open: true,
        label: 'A joindre obligatoirement',
        documents: [
          {
            id: 'certificatMedical',
            desc: 'Un certificat médical de moins de 3 mois',
            shouldHave: function() {
              return true;
            }
          },
          {
            id: 'justificatifDomicile',
            desc: 'Une photocopie d\'un justificatif de domicile',
            shouldHave: function() {
              return true;
            }
          },
          {
            id: 'carteIdentite',
            desc: 'Une photocopie recto/verso de votre carte d\'identité',
            shouldHave: function() {
              return true;
            }
          },
          {
            id: 'carteIdentiteRepresentant',
            desc: 'Une photocopie recto/verso de la carte d\'identité de ' + name,
            shouldHave: function() {
              return estRepresentant();
            }
          },
          {
            id: 'jugement',
            desc: 'Une attestation de jugement en protection juridique (le cas échéant)',
            shouldHave: function() {
              return true;
            }
          }
        ]
      };
      var sante = {
        label: 'Santé',
        documents: [
          {
            id: 'bilanAccompagnementEnfant',
            desc: 'Bilans d’accompagnement des services et établissements médico-sociaux enfants',
            tooltip: ' IME, ITEP, IEM, IPEAP, IRS, SESSAD, SAAD, CMPP, CAMSP',
            shouldHave: function() {
              return false === isAdult();
            }
          },
          {
            id: 'bilanAccompagnementAdulte',
            desc: 'Bilans d’accompagnement des services et établissements médico-sociaux adultes',
            tooltip: 'SAVS, SAMSAH, FH, FV, FAM, MAS'
          },
          {
            id: 'compteRenduAideDomicile',
            desc: 'Compte-rendu SSIAD, HAD, service d\'aide à domicile'
          },
          {
            id: 'compteRenduServiceSocial',
            desc: 'Compte-rendu service social, service de protection'
          },
          {
            id: 'compteRenduASE',
            desc: 'Compte-rendu ASE, PMI, PJJ'
          },
        ]
      };
      var technique = {
        label: 'Technique, materiel, équipement et finances',
        documents: [
          {
            id: 'prescription',
            desc: 'Prescription médicale (ORL, neurologue, médecin rééducateur…) si dispositif médical pris en charge par l\'assurance maladie'
          },
          {
            // TODO réfléchir comment gérer le doublon
            id: 'preconisation',
            desc: 'Préconisation écrite d’un ergothérapeute (centre de rééducation, service d’accompagnement, libéral…)'
          },
          {
            id: 'compteRenduValidation',
            desc: 'Compte-rendu de validation des essais de l’aide technique concernée pour les personnes ayant fréquenté un centre de rééducation'
          },
          {
            id: 'devis',
            desc: 'Devis de l\'aide technique indiquant le code ISO'
          },
          {
            id: 'autonomie',
            desc: 'Justificatif d\'attribution de l\'Allocation Personnalisée d\'Autonomie'
          }
        ]
      };
      var deplacements = {
        label: 'Déplacements',
        documents: [
          {
            id: 'permis',
            desc: 'Copie recto-verso du permis de conduire modifié de la personne handicapée ou copie de l’avis du médecin de la commission des permis de la Préfecture (service des permis de conduire) ainsi que celui du délégué à la prévention routière pour l’aménagement du poste de conduite des personnes souhaitant faire la conduite accompagnée'
          },
          {
            // TODO réfléchir comment gérer le doublon
            id: 'perconisation',
            desc: 'Préconisation écrite d’un ergothérapeute (centre de rééducation, service d’accompagnement, libéral…)'
          },
          {
            id: 'devisVehicule',
            desc: 'Deux devis de l\'aménagement du véhicule '
          }
        ]
      };
      var lieuDeVie = {
        label: 'Lieu de vie',
        documents: [
          {
            id: 'accordBailleur',
            desc: 'Accord de votre bailleur pour la réalisation de travaux'
          },
          {
            id: 'planLogement',
            desc: 'Plans ou photos du logement'
          },
          {
            // TODO réfléchir comment gérer le doublon
            id: 'perconisation',
            desc: 'Préconisation écrite d’un ergothérapeute (centre de rééducation, service d’accompagnement, libéral…)'
          },
          {
            id: 'devisLogement',
            desc: 'Deux devis de l\'aménagement du logement'
          },
          {
            id: 'planAncienLogement',
            desc: 'Plans de l’ancien logement, l’adresse et les plans du nouveau logement, plans et /ou descriptifs'
          }
        ]
      };
      var travail = {
        label: 'Travail',
        documents: [
          {
            id: 'ficheLiaison',
            desc: 'Fiche de liaison médecine du travail'
          },
          {
            id: 'bilansAccompagnementEmploi',
            desc: 'Bilans d’accompagnement professionnel (ESAT, entreprise adaptée)'
          },
          {
            id: 'bilanAccompagnementSansEmploi',
            desc: 'Bilans d’accompagnement professionnel (stages, bilans d’orientation, bilans de compétences, bilans de formation de tous opérateurs - GRETA, AFIPA, Pôle emploi, Cap Emploi, Mission locale, entreprise adaptée…)'
          }
        ]
      };

      var allDocuments = [
        obligatoire,
        sante,
        technique,
        deplacements,
        lieuDeVie,
        travail
      ];

      var documents = [];
      angular.forEach(allDocuments, function(fullCategory) {
        var found = false;
        var category = { label: fullCategory.label, documents: [], open: fullCategory.open };
        angular.forEach(fullCategory.documents, function(document) {
          if (document.shouldHave && document.shouldHave()) {
            found = true;
            category.documents.push(document);
          }
        });
        if (found) {
          documents.push(category);
        }
      });


      return documents;
    };
});
