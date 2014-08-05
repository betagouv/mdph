'use strict';

/**
 * @ngdoc service
 * @name impactApp.getDroits
 * @description
 * # getDroits
 * Service in the impactApp.
 */
angular.module('impactApp')
  .factory('getDroits', function(isAdult) {
    return function(data) {

      if (data.vie) {
        var besoins = data.vie.answers.besoins ? data.vie.answers.besoins.answers : undefined;
        var besoinsDeplacement = besoins ? besoins.deplacement.besoins : undefined;
        var besoinsQuotidien = besoins ? besoins.quotidien.besoins : undefined;
        var besoinsSecurite = besoins ? besoins.securite.besoins : undefined;
        var besoinsSocial = besoins ? besoins.social.besoins : undefined;
        var besoinsLieuDeVie = besoins ? besoins.lieuDeVie.besoins : undefined;
        
        var attentes = data.vie.answers.attentes ? data.vie.answers.attentes.answers : undefined;
        var attentesType = attentes ? attentes.typeAide.attentes : undefined;
      }

      return [
        {
          label: 'Carte stationnement',
          description: 'La carte européenne de stationnement permet à son titulaire ou à la personne qui l\'accompagne de stationner sur les places réservées aux personnes handicapées.',
          link: 'http://vosdroits.service-public.fr/particuliers/F2891.xhtml',
          shouldHave: function() {
            return besoinsDeplacement && (besoinsDeplacement.public || besoinsDeplacement.transports || besoinsDeplacement.accesDomicile);
          }
        },
        {
          label: 'Carte d\'invalidité',
          description: 'La carte d\'invalidité civile a pour but d\'attester que son détenteur est handicapé et permet de bénéficier de certains droits spécifiques, notamment dans les transports.',
          link: 'http://vosdroits.service-public.fr/particuliers/F2446.xhtml',
          shouldHave: function() {
            return besoinsQuotidien && (besoinsQuotidien.hygiene || besoinsQuotidien.repas) ||
              besoinsDeplacement && besoinsDeplacement.intraDomicile ||
              besoinsSecurite && (besoinsSecurite.interieur ||  besoinsSecurite.exterieur);
          }
        },
        {
          label: 'AEEH',
          description: 'L\'allocation d\'éducation de l\'enfant handicapé (AEEH) est destinée à soutenir les personnes qui assurent la charge d\'un enfant en situation de handicap.',
          link: 'http://vosdroits.service-public.fr/particuliers/N14808.xhtml',
          shouldHave: function() {
            return !isAdult() &&
              (besoinsQuotidien && (besoinsQuotidien.hygiene || besoinsQuotidien.repas) ||
              besoinsDeplacement && besoinsDeplacement.intraDomicile ||
              besoinsSecurite && (besoinsSecurite.interieur ||  besoinsSecurite.exterieur) ||
              attentesType && attentesType.financier);
          }
        },
        {
          label: 'AAH',
          description: 'L\'allocation aux adultes handicapés (AAH) est versée, sous conditions de ressources, aux adultes déclarés handicapés afin de leur assurer un revenu minimum.',
          link: 'http://vosdroits.service-public.fr/particuliers/N12230.xhtml',
          shouldHave: function() {
            return (besoinsQuotidien && (besoinsQuotidien.hygiene || besoinsQuotidien.repas) ||
              besoinsDeplacement && besoinsDeplacement.intraDomicile ||
              besoinsSecurite && (besoinsSecurite.interieur ||  besoinsSecurite.exterieur) ||
              attentesType && attentesType.financier);
          }
        },
        {
          label: 'PCH',
          description: 'La prestation de compensation du handicap (PCH) est une aide personnalisée destinée à financer les besoins liés à la perte d\'autonomie des personnes handicapées.',
          link: 'http://vosdroits.service-public.fr/particuliers/N14201.xhtml',
          shouldHave: function() {
            return besoinsDeplacement && besoinsDeplacement.conduite ||
              besoinsLieuDeVie && (besoinsLieuDeVie.amenagement ||  besoinsLieuDeVie.materiel) ||
              attentesType && (attentesType.financier || attentesType.materiel);
          }
        },
        {
          label: 'EMS',
          description: 'Orientation vers un établissement médical de santé.',
          shouldHave: function() {
            return attentesType && attentesType.etablissement;
          }
        },
        {
          label: 'SAVS',
          description: 'Les services d\'accompagnement à la vie sociale ont pour vocation de contribuer à la réalisation du projet de vie de personnes adultes handicapées par un accompagnement adapté.',
          link: 'http://www.qualite-esms.coop/Medico-social/Ressources/Glossaire-et-Lexique-du-medico-social/Lexique-medico-social/SAVS-Service-d-Accompagnement-a-la-Vie-Sociale,i5629.html',
          shouldHave: function() {
            return isAdult() &&
              (besoinsSocial && (besoinsSocial.loisirs || besoinsSocial.citoyen));
          }
        },
        {
          label: 'SAMSAH',
          description: 'Le service d\'accompagnement médico-social pour adultes handicapés (SAMSAH) a pour vocation, dans le cadre d\'un accompagnement médicosocial adapté.',
          link: 'http://www.qualite-esms.coop/Medico-social/Ressources/Glossaire-et-Lexique-du-medico-social/Lexique-medico-social/SAMSAH-Service-d-Accompagnement-Medico-Social-pour-Adultes-Handicapes,i5630.html',
          shouldHave: function() {
            return isAdult() &&
              (besoinsSocial && (besoinsSocial.loisirs || besoinsSocial.citoyen));
          }
        }
      ];
    };
});
