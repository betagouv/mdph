'use strict';

/* jshint multistr: true */

angular.module('impactApp').constant('documentTypes', [
  {
    id: 'certificatMedical',
    label: 'Certificat médical',
    canDelegate: true,
    mandatory: true,
    category: 'certificat',
    desc: 'Un certificat médical de moins de 3 mois'
  },

  {
    id: 'justificatifDomicile',
    label: 'Justificatif de domicile',
    category: 'justificatifs',
    mandatory: true
  },
  {
    id: 'carteIdentite',
    label: 'Carte d\'identité, passeport',
    category: 'justificatifs',
    mandatory: true
  },
  {
    id: 'acte_deces_mariage',
    label: 'Acte de décès / acte de mariage',
    category: 'justificatifs'
  },
  {
    id: 'carte_grise',
    label: 'Carte grise véhicule, permis de conduire',
    category: 'justificatifs'
  },
  {
    id: 'carte_sejour',
    label: 'Carte de séjour',
    category: 'justificatifs'
  },
  {
    id: 'avis_impot',
    label: 'Avis d\'impôt sur le revenu',
    category: 'justificatifs'
  },
  {
    id: 'rib_iban',
    label: 'Relevé d\'identité bancaire (RIB/IBAN)',
    category: 'justificatifs'
  },
  {
    id: 'attestation_paiement_indemnites_journ',
    label: 'Attestation de paiement des indemnités journ. (CAF, MSA, SS, Pôle Emploi....)',
    category: 'justificatifs'
  },
  {
    id: 'bulletin_salaire',
    label: 'Bulletin de salaire',
    category: 'justificatifs'
  },
  {
    id: 'devis_aide_technique',
    label: 'Devis / facture aide technique',
    category: 'justificatifs'
  },
  {
    id: 'facture_cantine',
    label: 'Facture cantine (restaurant scolaire)',
    category: 'justificatifs'
  },
  {
    id: 'frais_obseques',
    label: 'Facture frais d\'obsèques',
    category: 'justificatifs'
  },
  {
    id: 'reduction_temps_travail',
    label: 'Justificatif réduction du temps de travail',
    category: 'justificatifs'
  },
  {
    id: 'train_taxi',
    label: 'Billets de train / fiche taxi (frais de transport suite à placement)',
    category: 'justificatifs'
  },
  {
    id: 'tutelle',
    label: 'Jugement de tutelle, jugement rectificatif, curatelle',
    category: 'justificatifs'
  },
  {
    id: 'emancipation',
    label: 'Justificatif d\'émancipation',
    category: 'justificatifs'
  },
  {
    id: 'delegation_autorite',
    label: 'Jugement de délégation d\'autorité parentale',
    category: 'justificatifs'
  },
  {
    id: 'divorce',
    label: 'Jugement de divorce',
    category: 'justificatifs'
  },

  {
    id: 'ophtalmologique',
    label: 'Bilan ophtalmologique (MDPH)',
    category: 'autres_bilans_medicaux'
  },

  {
    id: 'evaluation_psychiatrique',
    label: 'Complément médical d\'aide à l\'évaluation psychiatrique',
    category: 'autres_bilans_medicaux'
  },
  {
    id: 'psychologique',
    label: 'Bilan psychologique, etc.',
    category: 'autres_bilans_medicaux'
  },
  {
    id: 'examen_psychiatrique',
    label: 'Compte rendu d\'examen psychiatrique, questionnaire psychiatrique,etc.',
    category: 'autres_bilans_medicaux'
  },
  {
    id: 'orthophonique',
    label: 'Bilan orthophonique, psychomoteur, kinésithérapeute, ostéopathe,etc.',
    category: 'autres_bilans_medicaux'
  },
  {
    id: 'camsp',
    label: 'Bilan CAMSP, CMP, CMPP',
    category: 'autres_bilans_medicaux'
  },
  {
    id: 'compte_rendu_evaluation_medicale',
    label: 'Compte rendu d\'évaluation médicale',
    category: 'autres_bilans_medicaux'
  },
  {
    id: 'attestation_medicale',
    label: 'Attestation médicale',
    category: 'autres_bilans_medicaux'
  },
  {
    id: 'fiche_liaison_medecine_travail',
    label: 'Fiche de liaison Médecine du travail',
    category: 'autres_bilans_medicaux'
  },
  {
    id: 'prescription_medicale',
    label: 'Prescription médicale pour aménagement d\'examens',
    category: 'autres_bilans_medicaux'
  },
  {
    id: 'bulletin_hospitalisation',
    label: 'Bulletin d\'hospitalisation',
    category: 'autres_bilans_medicaux'
  },
  {
    id: 'fiche_prescription_hors_medicamenteuse',
    label: 'Fiche de prescription hors médicamenteuse',
    category: 'autres_bilans_medicaux'
  },

  {
    id: 'gevasco',
    label: 'GEVASCO',
    category: 'scolarite',
    desc: 'Documents à remplir avec l\'enseignant référent et l\'équipe de suivi de la scolarisation de votre enfant. Vous pouvez demander au directeur de l\'école le contact de votre enseignant référent.'
  },
  {
    id: 'bilan_ess',
    label: 'Bilan de l\'Equipe de Suivi de Scolarisation (ESS)',
    category: 'scolarite'
  },
  {
    id: '',
    label: 'Fiche de laison Financement du matériel pédagogique adapté',
    category: 'scolarite'
  },
  {
    id: '',
    label: 'Fiche d\'évaluation de l\'autonomie de l\'élève (de l\'inspection académique)',
    category: 'scolarite'
  },
  {
    id: '',
    label: 'Protocoles d\'accompagnement d\'un élève handicapé par une AVSI',
    category: 'scolarite'
  },
  {
    id: '',
    label: 'Plan individualisé d\'accompagnement (PIA)',
    category: 'scolarite'
  },
  {
    id: '',
    label: 'Devoirs particuliers (dyslexie, orthophonie, etc.)',
    category: 'scolarite'
  },
  {
    id: '',
    label: 'Certificat de scolarité, relevé de notes, etc.',
    category: 'scolarite'
  },

  {
    id: 'cv',
    label: 'Curriculum Vitae (CV)',
    category: 'vie_pro'
  },
  {
    id: 'orientation_professionnel',
    label: 'Courriers Orientation Professionnel (UEROS, POPS, CAP EMPLOI...)',
    category: 'vie_pro'
  },
  {
    id: 'bilans_vie_pro',
    label: 'Bilans (AFPA, ESAT, Etc.), bilans Appui Projet, POPS, Préo, UEROS Etc.',
    category: 'vie_pro'
  },
  {
    id: 'rapport_de_stage',
    label: 'Rapport de stage',
    category: 'vie_pro'
  },

  {
    id: 'bilan_ems_sms',
    category: 'bilan_ems_sms',
    label: 'Synthèses Etablissements et services (EMS, SMS, SAVS, SAMSAH, etc.)'
  },

  {
    id: 'autre',
    category: 'autre',
    label: 'Autre document'
  }
]);
