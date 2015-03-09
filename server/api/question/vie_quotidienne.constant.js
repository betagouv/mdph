'use strict';

/* jshint multistr: true */

exports.all = [
  {
    model: 'famille',
    neededForAdmin: true,
    titleDefault: 'Vous vivez',
    titleRep: '<%= pronoun %> vit',
    type: 'radio',
    answers: [
      {
        label: 'Avec vos parents',
        labelRecap: 'Avec ses parents',
        labelRep: 'Avec ses parents',
        model: 'parents'
      },
      {
        label: 'Seul(e)',
        labelRepMasc: 'Seul',
        labelRepFem: 'Seule',
        model: 'seul',
        onlyAdult: true
      },
      {
        label: 'En couple',
        model: 'couple',
        onlyAdult: true
      },
      {
        label: 'Avec vos enfants (ou l\'un d\'entre eux)',
        labelRep: 'Avec ses enfants (ou l\'un d\'entre eux)',
        model: 'enfants',
        onlyAdult: true
      },
      {
        label: 'Dans un établissement médico-social ou ordinaire',
        labelRecap: 'En établissement médico-social ou ordinaire',
        model: 'etablissement',
        detailUrl: 'components/detail/precisez_big.html',
        detailModel: 'logement_etablissement',
        placeholder: 'Nom de l\'établissement, type et lieu',
        documents: [{category: 'sante', id: 'bilanAccompagnementEnfant'}]
      },
      {
        label: 'Autre',
        model: 'autre',
        detailModel: 'famille_autre',
        detailUrl: 'components/detail/precisez.html'
      }
    ]
  },
  {
    model: 'logement',
    neededForAdmin: true,
    titleDefault: 'Où vivez-vous ?',
    titleRep: 'Où vit-<%= pronoun %> ?',
    type: 'radio',
    answers: [
      {
        label: 'Vous avez un logement indépendant',
        labelRep: '<%= pronoun %> a un logement indépendant',
        model: 'independant', // TODO a verifier onlyAdult: true,
        detailUrl: 'components/detail/independant.html',
        detailModel: 'logement_independant',
        labelRecap: 'Un logement indépendant',
        onlyAdult: true
      },
      {
        label: 'Vous vivez dans un établissement médico-social ou ordinaire',
        labelRep: '<%= pronoun %> vit dans un établissement médico-social ou ordinaire',
        model: 'etablissement',
        labelRecap: 'Un établissement médico-social ou ordinaire',
        detailUrl: 'components/detail/precisez.html',
        detailModel: 'logement_etablissement'
      },
      {
        label: 'Vous êtes hébergé(e) au domicile',
        labelRep: '<%= pronoun %> est hébergé<%= fem %> au domicile',
        model: 'domicile',
        labelRecap: 'Le domicile d\'une autre personne',
        detailUrl: 'components/detail/domicile.html',
        detailModel: 'logement_domicile'
      },
      {
        label: 'Autre',
        model: 'autre',
        detailUrl: 'components/detail/precisez.html',
        detailModel: 'logement_autre'
      }
    ]
  },
  {
    model: 'aideActuelle',
    titleDefault: 'Vous recevez :',
    titleRep: '<%= pronoun %> reçoit :',
    type: 'checkbox',
    answers: [
      {
        label: 'Une aide financière et des ressources',
        model: 'financiere'
      },
      {
        label: 'Une aide technique, matérielle ou de l\'équipement',
        model: 'technique',
        detailUrl: 'components/detail/aide_technique.html',
        detailModel: 'techniqueDetail'
      },
      {
        label: 'Une aide à la personne, avec quelqu\'un qui vous aide',
        model: 'personne',
        detailUrl: 'components/detail/aide_personne.html',
        detailModel: 'personneDetail'
      }
    ]
  },
  {
    model: 'aideFinancierePresent',
    titleDefault: 'Vous recevez les aides, ressources et/ou prestations suivantes :',
    titleRep: '<%= pronoun %> reçoit les aides, ressources et/ou prestations suivantes :',
    type: 'checkbox',
    answers: [
      {
        label: 'Allocation Adulte Handicapé (AAH)',
        model: 'aah'
      },
      {
        label: 'Revenu de Solidarité Active (RSA)',
        model: 'rsa'
      },
      {
        label: 'Allocation chômage versée par Pôle Emploi',
        model: 'chomage'
      },
      {
        label: 'Allocation de Solidarité Spécifique (ASS)',
        model: 'ass'
      },
      {
        label: 'Retraite pour inaptitude dans la fonction publique ou anticipée',
        model: 'retraite'
      }
    ]
  },
  {
    model: 'aideFinancierePasse',
    titleDefault: 'Dans les 12 mois précédant votre demande, vous avez perçu :',
    titleRep: 'Dans les 12 mois précédant votre demande, <%= pronoun %> a perçu :',
    type: 'checkbox',
    answers: [
      {
        label: 'Un revenu d\'activité',
        model: 'revenu'
      },
      {
        label: 'Des indemnités journalières',
        model: 'indemnites',
        detailUrl: 'components/detail/precisez_duree.html',
        detailModel: 'duree',
        type: 'date'
      },
      {
        label: 'Un revenu issu d\'une activité en ESAT',
        model: 'esat',
      }
    ]
  },
  {
    model: 'pensionInvalidite',
    titleDefault: 'Vous percevez une ou plusieurs des aides suivantes :',
    titleRep: '<%= pronoun %> perçoit une ou plusieurs des aides suivantes :',
    type: 'checkbox',
    answers: [
      {
        label: 'Une pension d\'invalidité',
        model: 'invalidite',
        detailUrl: 'components/detail/pension_invalidite.html',
        detailModel: 'categorie',
      },
      {
        label: 'Un autre pension de ce type',
        model: 'autre',
        detailUrl: 'components/detail/precisez.html',
        detailModel: 'amenagementDetail',
        placeholder : 'Pension des deux tiers, d\'incapacité, ...'
      },
      {
        label: 'Une Majoration Tierce Personne',
        model: 'mtp'
      },
      {
        label: 'Une Allocation Supplémentaire d\'Invalidité',
        model: 'asi'
      },
      {
        label: 'Une rente d\'accident ou de maladie professionnelle',
        model: 'renteAccident'
      },
      {
        label: 'Une Prestation Complémentaire de Recours à Tierce Personne',
        model: 'pcrtp'
      },
    ]
  },
  {
    model: 'retraite',
    titleDefault: 'Vous êtes à la retraite :',
    titleRep: '<%= pronoun %> est à la retraite :',
    type: 'radio',
    answers: [
      {
        label: 'Oui',
        model: true,
        detailUrl: 'components/detail/precisez_date.html',
        detailModel: 'retraiteDetail',
        detailLabel: 'Depuis quand ?',
        type: 'date'
      },
      {
        label: 'Non',
        model: false
      }
    ]
  },
  {
    model: 'aidesRetraite',
    titleDefault: 'Vous percevez une ou plusieurs des aides suivantes :',
    titleRep: '<%= pronoun %> perçoit une ou plusieurs des aides suivantes :',
    type: 'checkbox',
    answers: [
      {
        label: 'L\'ASPA (Allocation de Solidarité pour les Personnes Agées)',
        model: 'aspa',
      },
      {
        label: 'L\'APA (Allocation Personnalisée d\'Autonomie)',
        model: 'apa'
      },
      {
        label: 'Vous avez demandé une pension de retraite',
        model: 'pensionRetraite'
      }
    ]
  },
  {
    model: 'fraisHandicap',
    titleDefault: 'Frais liés au handicap et restant à charge',
    placeholder: 'Indiquez les frais non remboursés ou, le cas échéant, remboursés partiellement par votre assurance maladie ou mutuelle complémentaire. Précisez notamment si vous recourez à l\'emploi rémunéré d\'une tierce personne, motivé par votre situation de handicap.'
  },
  {
    model: 'besoinsVie',
    neededForAdmin: true,
    titleDefault: 'Vous avez besoin d\'aide dans votre vie quotidienne :',
    titleRep: '<%= pronoun %> a besoin d\'aide dans sa vie quotidienne :',
    type: 'checkbox',
    answers: [
      {
        label: 'Pour faire face aux dépenses courantes (loyer, énergie, habillement, alimentation, ...)',
        model: 'courant',
        onlyAdult: true
      },
      {
        label: 'Pour gérer votre budget et répondre à vos obligations (assurances, impôts... )',
        model: 'budget',
        onlyAdult: true
      },
      {
        label: 'Pour l\'hygiène corporelle (se laver, aller aux toilette)',
        model: 'hygiene'
      },
      {
        label: 'Pour vous habiller (mettre et ôter vos vêtements, les choisir ...)',
        labelRep: 'Pour s\'habiller (mettre et ôter ses vêtements, les choisir ...)',
        model: 'habits'
      },
      {
        label: 'Pour faire les courses',
        model: 'courses',
        onlyAdult: true
      },
      {
        label: 'Pour préparer les repas',
        model: 'cuisine',
        onlyAdult: true
      },
      {
        label: 'Pour prendre les repas',
        model: 'repas'
      },
      {
        label: 'Pour faire le ménage et l\'entretien des vêtements',
        model: 'menage',
        onlyAdult: true
      },
      {
        label: 'Pour prendre soin de votre santé (suivre un traitement, aller en consultation... )',
        labelRep: 'Pour prendre soin de sa santé (suivre un traitement, aller en consultation... )',
        model: 'sante'
      },
      {label: 'Autre besoin', model: 'autre', detailModel: 'besoinsVie_autre', detailUrl: 'components/detail/precisez.html'}
    ]
  },
  {
    model: 'besoinsDeplacement',
    neededForAdmin: true,
    titleDefault: 'Vous avez besoin d\'aide pour vous déplacer :',
    titleRep: '<%= pronoun %> a besoin d\'aide pour se déplacer :',
    type: 'checkbox',
    answers:[
      {label: 'Pour se déplacer dans le domicile', model: 'intraDomicile'},
      {label: 'Pour sortir du domicile ou y entrer', model: 'accesDomicile'},
      {label: 'Pour se déplacer à l\'extérieur du domicile', model: 'public'},
      {label: 'Pour utiliser un véhicule', model: 'conduite'},
      {label: 'Pour utiliser les transports en commun', model: 'transports'},
      {label: 'Pour partir en vacances', model: 'vacances'},
      {label: 'Autre besoin', model: 'autre', detailModel: 'besoinsDeplacement_autre', detailUrl: 'components/detail/precisez.html'}
    ]
  },
  {
    model: 'besoinsTransports',
    neededForAdmin: true,
    titleDefault: 'Utilisez-vous les transports adaptés proposés localement pour vous déplacer ?',
    titleRep: 'Utilise-t-<%= pronoun %> les transports adaptés proposés localement pour se déplacer ?',
    type: 'radio',
    answers: [
      {
        label: 'Oui',
        model: true,
      },
      {
        label: 'Non',
        model: false
      }
    ]
  },
  {
    model: 'besoinsSocial',
    neededForAdmin: true,
    type: 'checkbox',
    titleDefault: 'Vous avez besoin d\'aide pour votre vie sociale :',
    titleRep: '<%= pronoun %> a besoin d\'aide pour sa vie sociale :',
    answers: [
      { label: 'Pour communiquer (s\'exprimer, se faire comprendre)', model: 'communication' },
      { label: 'Pour avoir des activités sportives et de loisirs', model: 'loisirs' },
      {
        label: 'Pour les relations avec les autres',
        model: 'proches'
      },
      {
        label: 'Pour vous occuper de votre famille',
        labelRep: 'Pour s\'occuper de sa famille',
        model: 'famille',
        onlyAdult: true
      },
      {
        label: 'Pour vous accompagner dans votre vie citoyenne (ex: aller voter, vie associative ...)',
        labelRep: 'Pour se faire accompagner dans sa vie citoyenne (ex: aller voter, vie associative ...)',
        model: 'citoyen',
        onlyAdult: true
      },
      {
        label: 'Pour assurer votre sécurité',
        labelRep: 'Pour assurer sa sécurité',
        model: 'securite'
      },
      { label: 'Autre besoin', model: 'autre', detailModel: 'besoinsSocial_autre', detailUrl: 'components/detail/precisez.html' }
    ]
  },
  {
    model: 'attentesTypeAide',
    neededForAdmin: true,
    type: 'checkbox',
    titleDefault: 'Quelles sont vos attentes pour compenser votre handicap ?',
    titleRep: 'Quelles sont ses attentes pour compenser son handicap ?',
    answers:
    [
      {label: 'Vivre à domicile', model: 'domicile'},
      {
        label: 'Un aménagement de votre lieu de vie',
        labelRep: 'Un aménagement de son lieu de vie',
        model: 'amenagement'
      },
      {label: 'Réaliser un bilan des capacités dans la vie quotidienne', model: 'bilan'},
      {
        label: 'une aide financière afin d\'assurer un revenu minimum',
        model: 'financierMinimum',
        onlyAdult: true
      },
      {label: 'Une aide pour se déplacer', model: 'mobilite'},
      {label: 'Un accompagnement pour l\'adptation / réadaptation à la vie quotidienne', model: 'accompagement'},
      {
        label: 'Une aide humaine : quelqu\'un qui vous aide',
        labelRep: 'Une aide humaine : quelqu\'un qui l\'aide',
        model: 'humain'
      },
      {label: 'Vivre en établissement', model: 'etablissement'},
      {label: 'Du matériel ou équipement', model: 'materiel'},
      {
        label: 'Une aide financière pour des dépenses liées à votre handicap',
        labelRep: 'Une aide financière pour des dépenses liées à son handicap',
        model: 'financierHandicap'
      },
      {label: 'Un accueil temporaire', model: 'accueil'},
      {label: 'Une carte de stationnement', model: 'stationnement'},
      {label: 'Une carte d\'invalidité ou de priorité', model: 'invalidite'},
      {label: 'Autre attente', model: 'autre', detailModel: 'attentesTypeAide_autre', detailUrl: 'components/detail/precisez.html'}
    ]
  },
  {
    model: 'structures',
    titleDefault: 'Avez-vous déjà identifié une ou plusieurs structures qui pourraient répondre à vos attentes ?',
    type: 'checkbox'
  },
  {
    model: 'autresRenseignements',
    titleDefault: 'Autres renseignements que vous souhaiteriez nous communiquer',
    type: 'text'
  }
];
