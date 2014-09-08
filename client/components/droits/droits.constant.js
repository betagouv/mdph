'use strict';

/* jshint multistr: true */

angular.module('impactApp').constant('droits', [
  {
    type: 'presta-carte',
    prestations: [
      {
        id: 'carteStationnement',
        label: 'Carte stationnement',
        title: 'Carte de stationnement',
        description: 'La carte européenne de stationnement permet à son titulaire ou à la personne qui l\'accompagne de stationner sur les places réservées aux personnes handicapées.',
        link: 'http://vosdroits.service-public.fr/particuliers/F2891.xhtml'
      },
      {
        id: 'carteInvalidite',
        label: 'Carte d\'invalidité',
        title: 'Carte d\'invalidité',
        description: 'La carte d\'invalidité civile a pour but d\'attester que son détenteur est handicapé et permet de bénéficier de certains droits spécifiques, notamment dans les transports.',
        link: 'http://vosdroits.service-public.fr/particuliers/F2446.xhtml'
      }
    ]
  },
  {
    type: 'presta-finances',
    prestations: [
      {
        id: 'aeeh',
        label: 'AEEH',
        title: 'Allocation d\'éducation de l\'enfant handicapé',
        description: 'L\'allocation d\'éducation de l\'enfant handicapé (AEEH) est destinée à soutenir les personnes qui assurent la charge d\'un enfant en situation de handicap.',
        link: 'http://vosdroits.service-public.fr/particuliers/N14808.xhtml'
      },
      {
        id: 'aah',
        label: 'AAH',
        title: 'Allocation aux adultes handicapés',
        description: 'L\'allocation aux adultes handicapés (AAH) est versée, sous conditions de ressources, aux adultes déclarés handicapés afin de leur assurer un revenu minimum.',
        link: 'http://vosdroits.service-public.fr/particuliers/N12230.xhtml'
      },
      {
        id: 'pch',
        label: 'PCH',
        title: 'Prestation de compensation du handicap',
        description: 'La prestation de compensation du handicap (PCH) est une aide personnalisée destinée à financer les besoins liés à la perte d\'autonomie des personnes handicapées.',
        link: 'http://vosdroits.service-public.fr/particuliers/N14201.xhtml'
      }
    ]
  },
  {
    type: 'presta-accompagnement',
    prestations: [
      {
        id: 'ems',
        label: 'EMS',
        title: 'Accompagnement par un service ou établissement médico-social',
        description: 'Orientation vers un établissement médical de santé.'
      },
      {
        id: 'savs',
        label: 'SAVS',
        title: 'Services d\'accompagnement à la vie sociale',
        description: 'Les services d\'accompagnement à la vie sociale ont pour vocation de contribuer à la réalisation du projet de vie de personnes adultes handicapées par un accompagnement adapté.',
        link: 'http://www.qualite-esms.coop/Medico-social/Ressources/Glossaire-et-Lexique-du-medico-social/Lexique-medico-social/SAVS-Service-d-Accompagnement-a-la-Vie-Sociale,i5629.html'
      },
      {
        id: 'samsah',
        label: 'SAMSAH',
        title: 'Service d\'accompagnement médico-social pour adultes handicapés',
        description: 'Le service d\'accompagnement médico-social pour adultes handicapés (SAMSAH) a pour vocation la recherche des missions visées à l\'article D 3121553 du code de l\'action sociale et des familles.',
        link: 'http://www.qualite-esms.coop/Medico-social/Ressources/Glossaire-et-Lexique-du-medico-social/Lexique-medico-social/SAMSAH-Service-d-Accompagnement-Medico-Social-pour-Adultes-Handicapes,i5630.html'
      }
    ]
  }
]);
