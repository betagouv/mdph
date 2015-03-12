'use strict';

/* jshint multistr: true */

exports.all = [
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
        detailUrl: 'components/detail/precisez_big.html'
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
    model: 'structure',
    titleDefault: 'Avez-vous déjà identifié une ou plusieurs structures qui pourraient répondre à vos attentes ?',
    titleRep: 'A-t-<%= pronoun %> déjà identifié une ou plusieurs structures qui pourraient répondre à ses attentes ?'
  },
  {
    model: 'vieScolaireAutresRenseignements',
    titleDefault: 'Autres renseignements concernant la scolarité que vous souhaiteriez nous communiquer',
    type: 'text'
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
  }
];
