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
    return function(name) {
      return {
        obligatoire: {
          show: true,
          open: true,
          label: 'A joindre obligatoirement',
          documents: {
            certificatMedical: {
              desc: 'Un certificat médical de moins de 3 mois',
              show: true
            },
            justificatifDomicile: {
              desc: 'Une photocopie d\'un justificatif de domicile',
              show: true
            },
            carteIdentite: {
              desc: 'Une photocopie recto/verso de votre carte d\'identité',
              show: true
            },
            carteIdentiteRepresentant: {
              desc: 'Une photocopie recto/verso de la carte d\'identité de ' + name
            },
            jugement: {
              desc: 'Une attestation de jugement en protection juridique (le cas échéant)',
              show: true
            }
          }
        },
        sante: {
          label: 'Santé',
          documents: {
            bilanAccompagnementEnfant: {
              desc: 'Bilans d’accompagnement des services et établissements médico-sociaux',
              tooltip: ' IME, ITEP, IEM, IPEAP, IRS, SESSAD, SAAD, CMPP, CAMSP'
            },
            bilanAccompagnementAdulte: {
              desc: 'Bilans d’accompagnement des services et établissements médico-sociaux',
              tooltip: 'SAVS, SAMSAH, FH, FV, FAM, MAS'
            },
            compteRenduAideDomicile: {
              desc: 'Compte-rendu SSIAD, HAD, service d\'aide à domicile'
            },
            compteRenduServiceSocial: {
              desc: 'Compte-rendu service social, service de protection'
            },
            compteRenduASE: {
              desc: 'Compte-rendu ASE, PMI, PJJ'
            }
          }
        },
        technique: {
          label: 'Technique, materiel, équipement et finances',
          documents: {
            prescription: {
              desc: 'Prescription médicale (ORL, neurologue, médecin rééducateur…) si dispositif médical pris en charge par l\'assurance maladie'
            },
            preconisation: {
              desc: 'Préconisation écrite d’un ergothérapeute (centre de rééducation, service d’accompagnement, libéral…)'
            },
            compteRenduValidation: {
              desc: 'Compte-rendu de validation des essais de l’aide technique concernée pour les personnes ayant fréquenté un centre de rééducation'
            },
            devis: {
              desc: 'Devis de l\'aide technique indiquant le code ISO'
            },
            autonomie: {
              desc: 'Justificatif d\'attribution de l\'Allocation Personnalisée d\'Autonomie'
            }
          }
        },
        deplacements: {
          label: 'Déplacements',
          documents: {
            permis: {
              desc: 'Copie recto-verso du permis de conduire modifié de la personne handicapée ou copie de l’avis du médecin de la commission des permis de la Préfecture (service des permis de conduire) ainsi que celui du délégué à la prévention routière pour l’aménagement du poste de conduite des personnes souhaitant faire la conduite accompagnée'
            },
            preconisation: {
              desc: 'Préconisation écrite d’un ergothérapeute (centre de rééducation, service d’accompagnement, libéral…)'
            },
            devisVehicule: {
              desc: 'Deux devis de l\'aménagement du véhicule '
            }
          }
        },
        lieuDeVie: {
          label: 'Lieu de vie',
          documents: {
            accordBailleur: {
              desc: 'Accord de votre bailleur pour la réalisation de travaux'
            },
            planLogement: {
              desc: 'Plans ou photos du logement'
            },
            preconisation: {
              desc: 'Préconisation écrite d’un ergothérapeute (centre de rééducation, service d’accompagnement, libéral…)'
            },
            devisLogement: {
              desc: 'Deux devis de l\'aménagement du logement'
            },
            planAncienLogement: {
              desc: 'Plans de l’ancien logement, l’adresse et les plans du nouveau logement, plans et /ou descriptifs'
            }
          }
        },
        travail: {
          label: 'Travail',
          documents: {
            ficheLiaison: {
              desc: 'Fiche de liaison médecine du travail'
            },
            bilansAccompagnementEmploi: {
              desc: 'Bilans d’accompagnement professionnel (ESAT, entreprise adaptée)'
            },
            bilanAccompagnementSansEmploi: {
              desc: 'Bilans d’accompagnement professionnel (stages, bilans d’orientation, bilans de compétences, bilans de formation de tous opérateurs - GRETA, AFIPA, Pôle emploi, Cap Emploi, Mission locale, entreprise adaptée…)'
            }
          }
        }
      };
    };
  });
