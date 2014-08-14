'use strict';

/**
 * @ngdoc service
 * @name impactApp.getDroits
 * @description
 * # getDroits
 * Service in the impactApp.
 */
angular.module('impactApp')
  .factory('getDroits', function() {
    return function(data, isAdult) {

      if (data) {
        var besoins = data.vie.answers.besoins ? data.vie.answers.besoins.answers : undefined;
        var besoinsDeplacement = besoins ? besoins.deplacement.besoins : undefined;
        var besoinsQuotidien = besoins ? besoins.quotidien.besoins : undefined;
        var besoinsSocial = besoins ? besoins.social.besoins : undefined;

        var attentes = data.vie.answers.attentes && data.vie.answers.attentes.answers ? data.vie.answers.attentes.answers : undefined;
        var attentesType = attentes ? attentes.typeAide.attentes : undefined;
      }

      var carte = {
        type: 'presta-carte',
        prestations: [
          {
            id: 'carteStationnement',
            label: 'Carte stationnement',
            title: 'Carte de stationnement',
            description: 'La carte européenne de stationnement permet à son titulaire ou à la personne qui l\'accompagne de stationner sur les places réservées aux personnes handicapées.',
            link: 'http://vosdroits.service-public.fr/particuliers/F2891.xhtml',
            shouldHave: function() {
              return besoinsDeplacement && besoinsDeplacement.public ||
                attentesType && attentesType.mobilite;
            }
          },
          {
            id: 'carteInvalidite',
            label: 'Carte d\'invalidité',
            title: 'Carte d\'invalidité',
            description: 'La carte d\'invalidité civile a pour but d\'attester que son détenteur est handicapé et permet de bénéficier de certains droits spécifiques, notamment dans les transports.',
            link: 'http://vosdroits.service-public.fr/particuliers/F2446.xhtml',
            shouldHave: function() {
              return besoinsQuotidien && (besoinsQuotidien.hygiene || besoinsQuotidien.habits || besoinsQuotidien.repas) ||
                besoinsDeplacement && besoinsDeplacement.intraDomicile;
            }
          }
        ]
      };

      var aideFinanciere = {
        type: 'presta-finances',
        prestations: [
          {
            id: 'aeeh',
            label: 'AEEH',
            title: 'Allocation d\'éducation de l\'enfant handicapé',
            description: 'L\'allocation d\'éducation de l\'enfant handicapé (AEEH) est destinée à soutenir les personnes qui assurent la charge d\'un enfant en situation de handicap.',
            link: 'http://vosdroits.service-public.fr/particuliers/N14808.xhtml',
            shouldHave: function() {
              return !isAdult() && (attentesType && attentesType.financierHandicap) &&
                (besoinsQuotidien && (besoinsQuotidien.hygiene || besoinsQuotidien.habits || besoinsQuotidien.repas) ||
                besoinsDeplacement && besoinsDeplacement.intraDomicile ||
                besoinsSocial && besoinsSocial.securite);
            }
          },
          {
            id: 'aah',
            label: 'AAH',
            title: 'Allocation aux adultes handicapés',
            description: 'L\'allocation aux adultes handicapés (AAH) est versée, sous conditions de ressources, aux adultes déclarés handicapés afin de leur assurer un revenu minimum.',
            link: 'http://vosdroits.service-public.fr/particuliers/N12230.xhtml',
            shouldHave: function() {
              return  (attentesType && attentesType.financierHandicap) &&
                (besoinsQuotidien && (besoinsQuotidien.hygiene || besoinsQuotidien.habits || besoinsQuotidien.repas) ||
                  besoinsSocial && (besoinsSocial.proches  || besoinsSocial.securite) ||
                  besoinsDeplacement && besoinsDeplacement.intraDomicile ||
                  attentesType && attentesType.financierMinimum
                );
            }
          },
          {
            id: 'pch',
            label: 'PCH',
            title: 'Prestation de compensation du handicap',
            description: 'La prestation de compensation du handicap (PCH) est une aide personnalisée destinée à financer les besoins liés à la perte d\'autonomie des personnes handicapées.',
            link: 'http://vosdroits.service-public.fr/particuliers/N14201.xhtml',
            shouldHave: function() {
              return (
                besoinsDeplacement && besoinsDeplacement.conduite ||
                attentesType && (attentesType.amenagement || attentesType.financierHandicap || attentesType.materiel || attentesType.mobilite || attentesType.humain)
              ) &&
              (
                besoinsQuotidien && (besoinsQuotidien.hygiene || besoinsQuotidien.habits || besoinsQuotidien.repas) ||
                besoinsDeplacement && (besoinsDeplacement.accesDomicile || besoinsDeplacement.public || besoinsDeplacement.transports) ||
                besoinsSocial && (besoinsSocial.proches || besoinsSocial.securite || besoinsSocial.communication)
              );
            }
          }
        ]
      };

      var accompagnementMedical = {
        type: 'presta-accompagnement',
        prestations: [
          {
            id: 'ems',
            label: 'EMS',
            title: 'Accompagnement par un service ou établissement médico-social',
            description: 'Orientation vers un établissement médical de santé.',
            shouldHave: function() {
              return attentesType && attentesType.etablissement || (besoinsSocial && besoinsSocial.securite || besoinsQuotidien && besoinsQuotidien.logement);
            }
          },
          {
            id: 'savs',
            label: 'SAVS',
            title: 'Services d\'accompagnement à la vie sociale',
            description: 'Les services d\'accompagnement à la vie sociale ont pour vocation de contribuer à la réalisation du projet de vie de personnes adultes handicapées par un accompagnement adapté.',
            link: 'http://www.qualite-esms.coop/Medico-social/Ressources/Glossaire-et-Lexique-du-medico-social/Lexique-medico-social/SAVS-Service-d-Accompagnement-a-la-Vie-Sociale,i5629.html',
            shouldHave: function() {
              return isAdult() &&
                (besoinsQuotidien && besoinsQuotidien.logement) &&
                (besoinsSocial && (besoinsSocial.loisirs || besoinsSocial.citoyen || besoinsSocial.proches) ||
                  besoinsQuotidien && besoinsQuotidien.sante);
            }
          },
          {
            id: 'samsah',
            label: 'SAMSAH',
            title: 'Service d\'accompagnement médico-social pour adultes handicapés',
            description: 'Le service d\'accompagnement médico-social pour adultes handicapés (SAMSAH) a pour vocation la recherche des missions visées à l\'article D 3121553 du code de l\'action sociale et des familles.',
            link: 'http://www.qualite-esms.coop/Medico-social/Ressources/Glossaire-et-Lexique-du-medico-social/Lexique-medico-social/SAMSAH-Service-d-Accompagnement-Medico-Social-pour-Adultes-Handicapes,i5630.html',
            shouldHave: function() {
              return isAdult() &&
                (besoinsSocial && (besoinsSocial.loisirs || besoinsSocial.citoyen || besoinsSocial.proches) ||
                  besoinsQuotidien && besoinsQuotidien.sante);
            }
          }
        ]
      };

      var autre = {
        type: 'presta-autre',
        prestations: []
      };

      var all = [
        carte,
        aideFinanciere,
        accompagnementMedical,
        autre
      ];

      return all;
    };
});
