'use strict';

/* jshint multistr: true */

angular.module('impactApp').constant('DocumentsPreparationEvalConstants', [
  {
    label: 'Bilans d’accompagnement des services et établissements médico-sociaux enfants : IME, ITEP, IEM, IPEAP, IRS, SESSAD, SAAD, CMPP, CAMSP',
    situations: [
      ['moins20', 'etablissement'],
      ['moins20', 'medicosocial'],
      ['moins20', 'cmpp']
    ]
  },
  {
    label: 'Bilans d’accompagnement des services et établissements médico-sociaux adultes : SAVS, SAMSAH, FH, FV, FAM, MAS',
    situations: [
      ['plus20', 'etablissement'],
      ['plus20', 'medicosocial']
    ]
  },
  {
    label: 'Tout compte-rendu récent de médecin, d’hospitalisation, de CMP, d\'HDJ, de CATTP, de suivis médicaux ou paramédicaux (orthophonie, psychomotricité, orthoptie, kinésithérapie, ergothérapie,…)',
    situations: [['suivi']]
  },
  {
    label: 'Compte-rendu SSIAD, HAD, service d\'aide à domicile',
    situations: [['domicile'], ['accompagnementAidant']]
  },
  {
    label: 'Compte-rendu service social, service de protection ',
    situations: [['tutelle', 'demarche']]
  },
  {
    label: 'Compte-rendu ASE, PMI, PJJ',
    situations: [['ase', 'demarche']]
  },
  {
    label: 'Document équipe sociale et sanitaire',
    situations: [['psy']]
  },
  {
    label: 'Justificatif d\'attribution de l\'Allocation Personnalisée d\'Autonomie',
    situations: [['apa']]
  },
  {
    label: 'Fiche de liaison médecine du travail',
    situations: [
      ['emploi', 'inadapte'],
      ['arret', 'medecin']
    ]
  },
  {
    label: 'Compte-rendu UEROS',
    situations: [['ueros']]
  },
  {
    label: 'Justificatif de fonction élective',
    situations: [['elective']]
  },
  {
    label: 'Prescription médicale (ORL, neurologue, médecin rééducateur…) si dispositif médical pris en charge par l\'assurance maladie',
    situations: [['technique']]
  },
  {
    label: 'Préconisation écrite d’un ergothérapeute (centre de rééducation, service d’accompagnement, libéral…)',
    situations: [['technique']]
  },
  {
    label: 'Compte-rendu de validation des essais de l’aide technique concernée pour les personnes ayant fréquenté un centre de rééducation',
    situations: [['technique']]
  },
  {
    label: 'Devis de l\'aide technique indiquant le code ISO',
    situations: [['technique']]
  },
  {
    label: 'Copie recto-verso du permis de conduire modifié de la personne handicapée ou copie de l’avis du médecin de la commission des permis de la Préfecture (service des permis de conduire) ainsi que celui du délégué à la prévention routière pour l’aménagement du poste de conduite des personnes souhaitant faire la conduite accompagnée',
    situations: [
      ['conduite'],
      ['conduite', 'vehicule']
    ]
  },
  {
    label: 'Préconisation écrite d’un ergothérapeute (centre de rééducation, service d’accompagnement, libéral…)',
    situations: [['vehicule']]
  },
  {
    label: '2 devis de l\'aménagement du véhicule',
    situations: [['vehicule']]
  },
  {
    label: 'Accord de votre bailleur pour la réalisation de travaux',
    situations: [['locataire', 'vie']]
  },
  {
    label: 'Plans ou photos du logement',
    situations: [['vie']]
  },
  {
    label: 'Préconisation écrite d’un ergothérapeute (centre de rééducation, service d’accompagnement, libéral…)',
    situations: [['vie']]
  },
  {
    label: 'Bilans d’accompagnement professionnel (ESAT, entreprise adaptée)',
    situations: [['emploi', 'adapte']]
  },
  {
    label: 'Bilans d’accompagnement professionnel (stages, bilans d’orientation, bilans de compétences, bilans de formation de tous opérateurs - GRETA, AFIPA, Pôle emploi, Cap Emploi, Mission locale, entreprise adaptée…)',
    situations: [['accompagnement', 'sansEmploi']]
  }
]);
