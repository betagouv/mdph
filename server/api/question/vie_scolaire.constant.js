'use strict';

/* jshint multistr: true */

module.exports = [
  {
    model: 'condition',
    titleDefault: 'Etes-vous actuellement scolarisé ?',
    titleRep: 'Est-<%= pronoun %> actuellement scolarisé<%= fem %> ?',
    type: 'radio',
    'answers': [
      {
        'label': 'Oui',
        model: true
      },
      {
        'label': 'Non',
        model: false
      }
    ]
  },
  {
    model: 'raisonNonScolaire',
    titleDefault: 'Pourquoi n\'êtes vous pas scolarisé ?',
    titleRep: 'Pourquoi n\'est-<%= pronoun %> pas scolarisé<%= fem %> ?',
    type: 'radio',
    answers: [
      {
        label: 'Vous êtes trop jeune',
        labelRep: '<%= pronoun %> est trop jeune',
        model: 'tropJeune',

        detailModel: 'raisonNonScolaireTropJeune',
        placeholderDefault: 'A partir de quand serez-vous scolarisé(e) ?',
        placeholder: 'A partir de quand sera-t-<%= pronoun %> scolarisé<%= fem %> ?',
        detailUrl: 'components/detail/precisez.html'
      },
      {
        label: 'Vous êtes sans solution d\'accueil en établissement scolaire, universitaire, ou médico-social',
        labelRep: '<%= pronoun %> est sans solution d\'accueil en établissement scolaire, universitaire, ou médico-social',
        model: 'etablissement',

        detailModel: 'raisonNonScolaireEtablissement',
        detailUrl: 'components/detail/precisez.html'
      },
      {
        label: 'Autre',
        model: 'autre',

        detailModel: 'raisonNonScolaireAutre',
        detailUrl: 'components/detail/precisez.html'
      }
    ]
  },
  {
    model: 'structures',
    type: 'structure',
    titleDefault: 'Avez-vous déjà identifié une ou plusieurs structures qui pourraient répondre à vos attentes ?',
    titleRep: 'A-t-<%= pronoun %> déjà identifié une ou plusieurs structures qui pourraient répondre à ses attentes ?'
  },
  {
    model: 'vieScolaireType',
    titleDefault: 'Vous êtes actuellement scolarisé',
    titleRep: '<%= pronoun %> est actuellement scolarisé<%= fem %>',
    type: 'radio',
    answers: [
      {
        label: 'En milieu ordinaire',
        model: 'ordinaire'
      },
      {
        label: 'A domicile',
        model: 'domicile'
      },
      {
        label: 'En internat',
        model: 'internat',

        detailUrl: 'components/detail/precisez_yes_no.html',
        detailModel: 'vieScolaireTypeInternat',
        detailLabel: 'Les frais de séjour sont-ils intégralement pris en charge par l\'assurance maladie, l\'Etat ou l\'aide sociale ?'
      },
      {
        label: 'Avec accompagnement par un service de soin ou un établissement médico-social',
        model: 'etablissement'
      },
      {
        label: 'En temps partagé entre l’établissement médico-social et le milieu ordinaire ou domicile',
        model: 'etablissementPartiel',
      },
      {
        label: 'En temps partagé entre le service de soin et le milieu ordinaire',
        model: 'serviceSoinPartiel',
      },
      {
        label: 'En formation supérieure',
        model: 'superieur',
      },
      {
        label: 'Autre',
        model: 'autre',
        detailUrl: 'components/detail/precisez.html',
        detailModel: 'vieScolaireAutre'
      }
    ]
  },
  {
    model: 'etablissement',
    titleDefault: 'Dans quel(s) établissement(s) ?',
    type:'text'
  },
  {
    model: 'typeEtudes',
    titleDefault: 'Quel type d\'études suivez-vous ?',
    titleRep: 'Quel type d\'études suit-<%= pronoun %> ?',
    type:'text'
  },
  {
    model: 'diplomePasse',
    titleDefault: 'Quel(s) diplôme(s) avez-vous obtenu(s) ?',
    titleRep: 'Quel(s) diplôme(s) a-t-<%= pronoun %> obtenu(s) ?',
    type:'text'
  },
  {
    model: 'diplomePresent',
    titleDefault: 'Quel(s) diplôme(s) préparez-vous ?',
    titleRep: 'Quel(s) diplôme(s) prépare-t-<%= pronoun %> ?',
    type:'text'
  },
  {
    model: 'diplomeEtablissement',
    titleDefault: 'Dans quel(s) établissement(s) ?',
    type:'text'
  },
  {
    model: 'parcoursEtudes',
    titleDefault: 'Décrivez votre parcours d\'étudiant ou d\'apprenti',
    titleRep: 'Décrivez son parcours d\'étudiant ou d\'apprenti',
    type:'text'
  },
  {
    model: 'accompagnement',
    titleDefault: 'Êtes-vous accompagné et recevez-vous des soins ? Si oui, lesquels ?',
    titleRep: 'Êtes-<%= pronoun %> accompagné<%= fem %> et reçoit-<%= pronoun %> des soins ? Si oui, lesquels ?',
    type:'checkbox',
    answers: [
      {
        label: 'Des soins hospitaliers',
        model: 'hopital',
      },
      {
        label: 'Des soins en libéral',
        model: 'liberal',
      },
      {
        label: 'Autre',
        model: 'autre',

        detailModel: 'accompagnementAutre',
        detailUrl: 'components/detail/precisez.html'
      }
    ]
  },
  {
    model: 'adaptation',
    titleDefault: 'Des adaptations ont-elles été effectuées au niveau de vos conditions matérielles ? Si oui, lesquelles ?',
    titleRep: 'Des adaptations ont-elles été effectuées au niveau de ses conditions matérielles ? Si oui, lesquelles ?',
    type:'checkbox',
    answers: [
      {
        label: 'Aménagement et adaptations pédagogiques',
        model: 'pedagogie',
      },
      {
        label: 'Outils de communication',
        model: 'communication',
      },
      {
        label: 'Matériel informatique et audiovisuel',
        model: 'informatique',
      },
      {
        label: 'Matériel déficience auditive',
        model: 'audition',
      },
      {
        label: 'Matériel déficience visuelle',
        model: 'vision',
      },
      {
        label: 'Mobilier et petits matériels',
        model: 'mobilier',
      },
      {
        label: 'Transport',
        model: 'transport',
      },
      {
        label: 'Autre',
        model: 'autre',

        detailModel: 'adaptationAutre',
        detailUrl: 'components/detail/precisez.html'
      }
    ]
  },
  {
    model: 'emploiDuTemps',
    titleDefault: 'Décrivez votre emploi du temps (accompagnement et soins, lieux...)',
    titleRep: 'Décrivez son emploi du temps (accompagnement et soins, lieux...)',
    type:'text'
  },
  {
    model: 'besoinsScolarite',
    neededForAdmin: true,
    titleDefault: 'Vous avez besoin d\'aide dans votre scolarité :',
    titleRep: '<%= pronoun %> a besoin d\'aide dans sa scolarité :',
    type: 'checkbox',
    answers: [
      {
        label: 'Pour lire',
        model: 'lire'
      },
      {
        label: 'Pour écrire, prendre des notes',
        model: 'ecrire'
      },
      {
        label: 'Pour calculer',
        model: 'calculer'
      },
      {
        label: 'Pour comprendre, suivre les consignes',
        model: 'comprendre'
      },
      {
        label: 'Pour organiser, contrôler son travail',
        model: 'organiser'
      },
      {
        label: 'Pour l\'utilisation du matériel',
        model: 'materiel'
      },
      {label: 'Autre besoin', model: 'autre', detailModel: 'besoinsScolariteAutre', detailUrl: 'components/detail/precisez.html'}
    ]
  },
  {
    model: 'besoinsCommunication',
    neededForAdmin: true,
    titleDefault: 'Vous avez besoin d\'aide dans votre scolarité :',
    titleRep: '<%= pronoun %> a besoin d\'aide dans sa scolarité :',
    type: 'checkbox',
    answers: [
      {
        label: 'Pour communiquer (s\'exprimer, se faire comprendre)',
        model: 'communiquer'
      },
      {
        label: 'Pour les relations avec les autres',
        model: 'relation'
      },
      {
        label: 'Pour assurer sa sécurité',
        model: 'securite'
      },
      {label: 'Autre besoin', model: 'autre', detailModel: 'besoinsCommunicationAutre', detailUrl: 'components/detail/precisez.html'}
    ]
  },
  {
    model: 'besoinsEntretien',
    neededForAdmin: true,
    titleDefault: 'Vous avez besoin d\'aide pour votre entretien personnel :',
    titleRep: '<%= pronoun %> a besoin d\'aide pour son entretien personnel :',
    type: 'checkbox',
    answers: [
      {
        label: 'Pour l\'hygiène corporelle (aller aux toilettes)',
        model: 'hygiene'
      },
      {
        label: 'Pour s\'habiller (mettre et ôter des vêtements)',
        model: 'habiller'
      },
      {
        label: 'Pour les repas (manger et boire)',
        model: 'repas'
      },
      {
        label: 'Pour prendre soin de sa santé',
        model: 'sante'
      },
      {label: 'Autre besoin', model: 'autre', detailModel: 'besoinsEntretienAutre', detailUrl: 'components/detail/precisez.html'}
    ]
  },
  {
    model: 'besoinsDeplacement',
    neededForAdmin: true,
    titleDefault: 'Vous avez besoin d\'aide pour les déplacements :',
    titleRep: '<%= pronoun %> a besoin d\'aide pour les déplacements :',
    type: 'checkbox',
    answers: [
      {
        label: 'Pour se déplacer à l\'intérieur des locaux',
        model: 'intraLocaux'
      },
      {
        label: 'Pour se déplacer à l\'extérieur des locaux',
        model: 'extraLocaux'
      },
      {
        label: 'Pour utiliser les transports en commun',
        model: 'transports'
      },
      {label: 'Autre besoin', model: 'autre', detailModel: 'besoinsEntretienAutre', detailUrl: 'components/detail/precisez.html'}
    ]
  },
  {
    model: 'attentesVieScolaire',
    neededForAdmin: true,
    titleDefault: 'Vous souhaitez :',
    titleRep: '<%= pronoun %> souhaite :',
    type: 'checkbox',
    answers: [
      {
        label: 'Une adaptation de la scolarité',
        model: 'adaptation'
      },
      {
        label: 'Une orientation scolaire différente',
        model: 'orientation'
      },
      {
        label: 'Une aide humaine',
        model: 'aideHumaine'
      },
      {
        label: 'Une aide matérielle',
        model: 'aideMateriel'
      },
      {
        label: 'Un accompagnement pour une réadaptation/une réeducation',
        model: 'readaptation'
      },
      {
        label: 'Une prise en charge par un établissement sans hébergement',
        model: 'etablissementSansHebergement'
      },
      {
        label: 'Une prise en charge par un établissement avec hébergement',
        model: 'etablissementAvecHebergement'
      },
      {
        label: 'Autre besoin',
        model: 'autre',
        detailModel: 'besoinsEntretienAutre',
        detailUrl: 'components/detail/precisez.html'
      }
    ]
  },
  {
    model: 'structure',
    type: 'structure',
    titleDefault: 'Avez-vous déjà identifié une ou plusieurs structures qui pourraient répondre à vos attentes ?',
    titleRep: 'A-t-<%= pronoun %> déjà identifié une ou plusieurs structures qui pourraient répondre à ses attentes ?'
  },
  {
    model: 'vieScolaireAutresRenseignements',
    titleDefault: 'Autres renseignements concernant la scolarité que vous souhaiteriez nous communiquer',
    type: 'text'
  },
];
