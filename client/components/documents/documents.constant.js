'use strict';

/* jshint multistr: true */

angular.module('impactApp').constant('documentTypes', [
  {
    id: 'certificatMedical',
    label: 'Certificat médical',
    canDelegate: true,
    type: 'obligatoire',
    desc: 'Un certificat médical de moins de 3 mois'
  },
  {
    id: 'carteIdentite',
    label: 'Carte d\'identité',
    type: 'obligatoire',
    desc: 'Une photocopie recto/verso de la carte d\'identité du demandeur'
  },
  {
    id: 'gevasco',
    label: 'GEVAsco',
    type: 'scolarite',
    desc: 'Documents à remplir avec l\'enseignant référent et l\'équipe de suivi de la scolarisation de votre enfant. Vous pouvez demander au directeur de l\'école le contact de votre enseignant référent.'
  },
  {
    id: 'bilanAccompagnementEnfant',
    type: 'sante',
    label: 'Bilan d\'accompagnement EMS pour enfant',
    desc: 'Bilans d\'accompagnement des services et établissements médico-sociaux',
    tooltip: ' IME, ITEP, IEM, IPEAP, IRS, SESSAD, SAAD, CMPP, CAMSP'
  },
  {
    id: 'bilanAccompagnementAdulte',
    type: 'sante',
    label: 'Bilan d\'accompagnement EMS pour adulte',
    desc: 'Bilans d\'accompagnement des services et établissements médico-sociaux',
    tooltip: 'SAVS, SAMSAH, FH, FV, FAM, MAS'
  },
  {
    id: 'compteRenduAideDomicile',
    type: 'sante',
    label: 'Compte-rendu SSIAD, HAD, service d\'aide à domicile'
  },
  {
    id: 'compteRenduServiceSocial',
    type: 'sante',
    label: 'Compte-rendu service social, service de protection'
  },
  {
    id: 'compteRenduASE',
    type: 'sante',
    label: 'Compte-rendu ASE, PMI, PJJ'
  },

  {
    id: 'prescription',
    type: 'technique',
    label: 'Prescription médicale',
    desc: 'Prescription médicale (ORL, neurologue, médecin rééducateur…) si dispositif médical pris en charge par l\'assurance maladie'
  },
  {
    id: 'compteRenduValidation',
    type: 'technique',
    label: 'Compte-rendu de validation des essais de l\'aide technique',
    desc: 'Compte-rendu de validation des essais de l\'aide technique concernée pour les personnes ayant fréquenté un centre de rééducation'
  },
  {
    id: 'devis',
    type: 'technique',
    label: 'Devis de l\'aide technique indiquant le code ISO'
  },
  {
    id: 'autonomie',
    type: 'technique',
    label: 'Justificatif d\'attribution de l\'Allocation Personnalisée d\'Autonomie'
  },

  {
    id: 'permis',
    type: 'deplacements',
    label: 'Permis de conduire',
    desc: 'Copie recto-verso du permis de conduire modifié de la personne handicapée ou copie de l\'avis du médecin de la commission des permis de la Préfecture (service des permis de conduire) ainsi que celui du délégué à la prévention routière pour l\'aménagement du poste de conduite des personnes souhaitant faire la conduite accompagnée'
  },
  {
    id: 'devisVehicule',
    type: 'deplacements',
    label: 'Devis de l\'aménagement du véhicule '
  },


  {
    id: 'accordBailleur',
    type: 'lieuDeVie',
    label: 'Accord de votre bailleur pour la réalisation de travaux'
  },
  {
    id: 'planLogement',
    type: 'lieuDeVie',
    label: 'Plans ou photos du logement'
  },
  {
    id: 'devisLogement',
    type: 'lieuDeVie',
    label: 'Devis de l\'aménagement du logement'
  },
  {
    id: 'planAncienLogement',
    type: 'lieuDeVie',
    label: 'Plans de l\'ancien logement, l\'adresse et les plans du nouveau logement, plans et /ou descriptifs'
  },

  {
    id: 'ficheLiaison',
    type: 'travail',
    label: 'Fiche de liaison médecine du travail'
  },
  {
    id: 'bilansAccompagnementEmploi',
    type: 'travail',
    label: 'Bilans d\'accompagnement professionnel (ESAT, entreprise adaptée)'
  },
  {
    id: 'bilanAccompagnementSansEmploi',
    type: 'travail',
    label: 'Bilans d\'accompagnement professionnel (stages, bilans d\'orientation, ...)',
    desc: 'Bilans d\'accompagnement professionnel (stages, bilans d\'orientation, bilans de compétences, bilans de formation de tous opérateurs - GRETA, AFIPA, Pôle emploi, Cap Emploi, Mission locale, entreprise adaptée…)'
  }
]);
