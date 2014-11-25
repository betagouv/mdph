'use strict';

/* jshint multistr: true */

angular.module('impactApp').constant('documents', [
  {
    id: 'certificatMedical',
    label: 'Certificat médical',
    canDelegate: true,
    type: 'obligatoire',
    typeLabel: 'Documents obligatoires',
    desc: 'Un certificat médical de moins de 3 mois'
  },
  {
    id: 'carteIdentite',
    label: 'Carte d\'identité',
    type: 'obligatoire',
    typeLabel: 'Documents obligatoires',
    desc: 'Une photocopie recto/verso de la carte d\'identité du demandeur'
  },

  {
    id: 'bilanAccompagnementEnfant',
    type: 'sante',
    typeLabel: 'Documents de santé',
    label: 'Bilan d\'accompagnement EMS pour enfant',
    desc: 'Bilans d\'accompagnement des services et établissements médico-sociaux',
    tooltip: ' IME, ITEP, IEM, IPEAP, IRS, SESSAD, SAAD, CMPP, CAMSP'
  },
  {
    id: 'bilanAccompagnementAdulte',
    type: 'sante',
    typeLabel: 'Documents de santé',
    label: 'Bilan d\'accompagnement EMS pour adulte',
    desc: 'Bilans d\'accompagnement des services et établissements médico-sociaux',
    tooltip: 'SAVS, SAMSAH, FH, FV, FAM, MAS'
  },
  {
    id: 'compteRenduAideDomicile',
    type: 'sante',
    typeLabel: 'Documents de santé',
    label: 'Compte-rendu SSIAD, HAD, service d\'aide à domicile'
  },
  {
    id: 'compteRenduServiceSocial',
    type: 'sante',
    typeLabel: 'Documents de santé',
    label: 'Compte-rendu service social, service de protection'
  },
  {
    id: 'compteRenduASE',
    type: 'sante',
    typeLabel: 'Documents de santé',
    label: 'Compte-rendu ASE, PMI, PJJ'
  },

  {
    id: 'prescription',
    type: 'technique',
    typeLabel: 'Documents techniques',
    label: 'Prescription médicale',
    desc: 'Prescription médicale (ORL, neurologue, médecin rééducateur…) si dispositif médical pris en charge par l\'assurance maladie'
  },
  {
    id: 'compteRenduValidation',
    type: 'technique',
    typeLabel: 'Documents techniques',
    label: 'Compte-rendu de validation des essais de l\'aide technique',
    desc: 'Compte-rendu de validation des essais de l\'aide technique concernée pour les personnes ayant fréquenté un centre de rééducation'
  },
  {
    id: 'devis',
    type: 'technique',
    typeLabel: 'Documents techniques',
    label: 'Devis de l\'aide technique indiquant le code ISO'
  },
  {
    id: 'autonomie',
    type: 'technique',
    typeLabel: 'Documents techniques',
    label: 'Justificatif d\'attribution de l\'Allocation Personnalisée d\'Autonomie'
  },

  {
    id: 'permis',
    type: 'deplacements',
    typeLabel: 'Déplacement',
    label: 'Permis de conduire',
    desc: 'Copie recto-verso du permis de conduire modifié de la personne handicapée ou copie de l\'avis du médecin de la commission des permis de la Préfecture (service des permis de conduire) ainsi que celui du délégué à la prévention routière pour l\'aménagement du poste de conduite des personnes souhaitant faire la conduite accompagnée'
  },
  {
    id: 'devisVehicule',
    type: 'deplacements',
    typeLabel: 'Déplacement',
    label: 'Devis de l\'aménagement du véhicule '
  },


  {
    id: 'accordBailleur',
    type: 'lieuDeVie',
    typeLabel: 'Lieu de vie',
    label: 'Accord de votre bailleur pour la réalisation de travaux'
  },
  {
    id: 'planLogement',
    type: 'lieuDeVie',
    typeLabel: 'Lieu de vie',
    label: 'Plans ou photos du logement'
  },
  {
    id: 'devisLogement',
    type: 'lieuDeVie',
    typeLabel: 'Lieu de vie',
    label: 'Devis de l\'aménagement du logement'
  },
  {
    id: 'planAncienLogement',
    type: 'lieuDeVie',
    typeLabel: 'Lieu de vie',
    label: 'Plans de l\'ancien logement, l\'adresse et les plans du nouveau logement, plans et /ou descriptifs'
  },

  {
    id: 'ficheLiaison',
    type: 'travail',
    typeLabel: 'Travail',
    label: 'Fiche de liaison médecine du travail'
  },
  {
    id: 'bilansAccompagnementEmploi',
    type: 'travail',
    typeLabel: 'Travail',
    label: 'Bilans d\'accompagnement professionnel (ESAT, entreprise adaptée)'
  },
  {
    id: 'bilanAccompagnementSansEmploi',
    type: 'travail',
    typeLabel: 'Travail',
    label: 'Bilans d\'accompagnement professionnel (stages, bilans d\'orientation, ...)',
    desc: 'Bilans d\'accompagnement professionnel (stages, bilans d\'orientation, bilans de compétences, bilans de formation de tous opérateurs - GRETA, AFIPA, Pôle emploi, Cap Emploi, Mission locale, entreprise adaptée…)'
  }
]);
