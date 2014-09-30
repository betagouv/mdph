'use strict';

/* jshint multistr: true */

angular.module('impactApp').constant('droits', [
  {
    id: 'carteStationnement',
    type: 'presta-carte',
    label: 'Carte stationnement',
    title: 'Carte de stationnement',
    description: 'La carte européenne de stationnement permet à son titulaire ou à la personne qui l\'accompagne de stationner sur les places réservées aux personnes handicapées.',
    link: 'http://vosdroits.service-public.fr/particuliers/F2891.xhtml'
  },
  {
    id: 'carteInvalidite',
    type: 'presta-carte',
    label: 'Carte d\'invalidité',
    title: 'Carte d\'invalidité',
    description: 'La carte d\'invalidité civile a pour but d\'attester que son détenteur est handicapé et permet de bénéficier de certains droits spécifiques, notamment dans les transports.',
    link: 'http://vosdroits.service-public.fr/particuliers/F2446.xhtml'
  },
  {
    id: 'aeeh',
    type: 'presta-finances',
    label: 'AEEH',
    title: 'Allocation d\'éducation de l\'enfant handicapé',
    description: 'L\'allocation d\'éducation de l\'enfant handicapé (AEEH) est destinée à soutenir les personnes qui assurent la charge d\'un enfant en situation de handicap.',
    link: 'http://vosdroits.service-public.fr/particuliers/N14808.xhtml'
  },
  {
    id: 'aah',
    type: 'presta-finances',
    label: 'AAH',
    title: 'Allocation aux adultes handicapés',
    description: 'L\'allocation aux adultes handicapés (AAH) est versée, sous conditions de ressources, aux adultes déclarés handicapés afin de leur assurer un revenu minimum.',
    link: 'http://vosdroits.service-public.fr/particuliers/N12230.xhtml'
  },
  {
    id: 'pch',
    type: 'presta-finances',
    label: 'PCH',
    title: 'Prestation de compensation du handicap',
    description: 'La prestation de compensation du handicap (PCH) est une aide personnalisée destinée à financer les besoins liés à la perte d\'autonomie des personnes handicapées.',
    link: 'http://vosdroits.service-public.fr/particuliers/N14201.xhtml'
  },
  {
    id: 'av',
    type: 'presta-finances',
    label: 'AV',
    title: 'Affiliation gratuite à l\'assurance vieillesse',
    description: 'L\'affiliation à l\'assurance vieillesse permet à l\'aidant familial de valider des trimestres pour sa retraite sans qu\'il ait besoin de verser des cotisations auprès de sa caisse de retraite.',
    link: 'http://vosdroits.service-public.fr/particuliers/F2574.xhtml'
  },
  {
    id: 'ems',
    type: 'presta-accompagnement',
    label: 'EMS',
    title: 'Accompagnement par un service ou établissement médico-social',
    description: 'Orientation vers un établissement médical de santé.'
  },
  {
    id: 'pps',
    type: 'presta-accompagnement',
    label: 'PPS',
    title: 'Plan personnalisé de scolarisation',
    description: 'Le PPS fait partie du Plan de compensation du handicap (PCH). Il définit les modalités de déroulement de la scolarité et les actions pédagogiques, psychologiques, éducatives,sociales, médicales et paramédicales répondant aux besoins particuliers des élèves présentant un handicap.'
  },
  {
    id: 'orp',
    type: 'presta-accompagnement',
    label: 'ORP',
    title: 'Orientation professionnelle',
    description: 'La demande d\'Orientation professionnelle vise à définir le milieu de travail dans lequel la personne handicapée pourra exercer une activité adaptée à sa situation.'
  },
  {
    id: 'ac',
    type: 'presta-finances',
    label: 'AC',
    title: 'Allocation compensatrice',
    link: 'http://vosdroits.service-public.fr/particuliers/F2475.xhtml',
    description: 'Cette allocation a été remplacée le 1er janvier 2006 par la prestation de compensation du handicap (PCH). Elle ne concerne plus que les personnes qui la percevaient déjà et qui ont choisi de la conserver.'
  }
]);
