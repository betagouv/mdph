'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:EnvoiCtrl
 * @description
 * # EnvoiCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('EnvoiCtrl', function($scope, isAdult) {
    $scope.typeEnvoi = 'numerique';

    $scope.justificatifStr = $scope.estRepresentant() ?
      'de votre justificatif d\'identité ainsi que celui de la personne handicapée' :
      'de votre justificatif d\'identité';

    $scope.showAdult = isAdult();

    $scope.computePrestations = function() {
      var prestations = [];

      if (shouldHaveCarteStationnement()) { prestations.push(carteStationnement); }
      if (shouldHaveCarteInvalidite()) { prestations.push(carteInvalidite); }
      if (shouldHaveAeeh()) { prestations.push(aeeh); }
      if (shouldHaveAah()) { prestations.push(aah); }
      if (shouldHavePch()) { prestations.push(pch); }
      if (shouldHaveEms()) { prestations.push(ems); }
      if (shouldHaveSms()) { prestations.push(savs); prestations.push(samsah); }

      return prestations;
    };

    var besoins = $scope.$storage.vie.answers.besoins.answers;
    var besoinsDeplacement = besoins.deplacement.besoins;
    var besoinsQuotidien = besoins.quotidien.besoins;
    var besoinsSecurite = besoins.securite.besoins;
    var besoinsSocial = besoins.social.besoins;
    var besoinsLieuDeVie = besoins.lieuDeVie.besoins;

    var attentes = $scope.$storage.vie.answers.attentes.answers;
    var attentesType = attentes.typeAide.attentes;

    var shouldHaveCarteStationnement = function() {
      return besoinsDeplacement.public || besoinsDeplacement.transports || besoinsDeplacement.accesDomicile;
    };

    var shouldHaveCarteInvalidite = function() {
      return besoinsQuotidien.hygiene || besoinsQuotidien.repas ||
        besoinsDeplacement.intraDomicile ||
        besoinsSecurite.interieur ||  besoinsSecurite.exterieur;
    };

    var shouldHaveAeeh = function() {
      return !isAdult() &&
        (besoinsQuotidien.hygiene || besoinsQuotidien.repas ||
        besoinsDeplacement.intraDomicile ||
        besoinsSecurite.interieur ||  besoinsSecurite.exterieur ||
        attentesType.financier);
    };

    var shouldHaveAah = function() {
      return (besoinsQuotidien.hygiene || besoinsQuotidien.repas ||
        besoinsDeplacement.intraDomicile ||
        besoinsSecurite.interieur ||  besoinsSecurite.exterieur ||
        attentesType.financier);
    };

    var shouldHavePch = function() {
      return besoinsDeplacement.conduite ||
        besoinsLieuDeVie.amenagement ||  besoinsLieuDeVie.materiel ||
        attentesType.financier || attentesType.materiel || attentesType.financier;
    };

    var shouldHaveEms = function() {
      return attentesType.etablissement;
    };

    var shouldHaveSms = function() {
      return isAdult() &&
      (besoinsSocial.loisirs || besoinsSocial.citoyen);
    };

    var carteStationnement = {
      label: 'Carte stationnement',
      description: 'La carte européenne de stationnement permet à son titulaire ou à la personne qui l\'accompagne de stationner sur les places réservées aux personnes handicapées.',
      link: 'http://vosdroits.service-public.fr/particuliers/F2891.xhtml'
    };

    var carteInvalidite = {
      label: 'Carte d\'invalidité',
      description: 'La carte d\'invalidité civile a pour but d\'attester que son détenteur est handicapé et permet de bénéficier de certains droits spécifiques, notamment dans les transports.',
      link: 'http://vosdroits.service-public.fr/particuliers/F2446.xhtml'
    };

    var aeeh = {
      label: 'AEEH',
      description: 'L\'allocation d\'éducation de l\'enfant handicapé (AEEH) est destinée à soutenir les personnes qui assurent la charge d\'un enfant en situation de handicap.',
      link: 'http://vosdroits.service-public.fr/particuliers/N14808.xhtml'
    };

    var aah = {
      label: 'AAH',
      description: 'L\'allocation aux adultes handicapés (AAH) est versée, sous conditions de ressources, aux adultes déclarés handicapés afin de leur assurer un revenu minimum.',
      link: 'http://vosdroits.service-public.fr/particuliers/N12230.xhtml'
    };

    var pch = {
      label: 'PCH',
      description: 'La prestation de compensation du handicap (PCH) est une aide personnalisée destinée à financer les besoins liés à la perte d\'autonomie des personnes handicapées.',
      link: 'http://vosdroits.service-public.fr/particuliers/N14201.xhtml'
    };

    var ems = {
      label: 'EMS',
      description: 'Orientation vers un établissement médical de santé.'
    };

    var savs = {
      label: 'SAVS',
      description: 'Les services d\'accompagnement à la vie sociale ont pour vocation de contribuer à la réalisation du projet de vie de personnes adultes handicapées par un accompagnement adapté.',
      link: 'http://www.qualite-esms.coop/Medico-social/Ressources/Glossaire-et-Lexique-du-medico-social/Lexique-medico-social/SAVS-Service-d-Accompagnement-a-la-Vie-Sociale,i5629.html'
    };

    var samsah = {
      label: 'SAMSAH',
      description: 'Le service d\'accompagnement médico-social pour adultes handicapés (SAMSAH) a pour vocation, dans le cadre d\'un accompagnement médicosocial adapté.',
      link: 'http://www.qualite-esms.coop/Medico-social/Ressources/Glossaire-et-Lexique-du-medico-social/Lexique-medico-social/SAMSAH-Service-d-Accompagnement-Medico-Social-pour-Adultes-Handicapes,i5630.html'
    };
  });
